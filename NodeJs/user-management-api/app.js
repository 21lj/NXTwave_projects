const express = require('express')
const app = express()
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const { v4: uuidv4 } = require('uuid')
app.use(express.json())
const dbPath = path.join(__dirname, 'userManagement.db')
let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    
    await db.exec(`
      CREATE TABLE IF NOT EXISTS managers (
        manager_id TEXT PRIMARY KEY,
        is_active BOOLEAN DEFAULT true
      );
      
      CREATE TABLE IF NOT EXISTS users (
        user_id TEXT PRIMARY KEY,
        full_name TEXT NOT NULL,
        mob_num TEXT NOT NULL,
        pan_num TEXT NOT NULL,
        manager_id TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_active BOOLEAN DEFAULT true,
        FOREIGN KEY (manager_id) REFERENCES managers(manager_id)
      );
    `)
    
    // Insert some sample managers if none exist
    const managersCount = await db.get('select count(*) as count from managers')
    if (managersCount.count === 0) {
      await db.exec(`
        INSERT into managers (manager_id) values 
          ('11111111-1111-1111-1111-111111111111'),
          ('22222222-2222-2222-2222-222222222222'),
          ('33333333-3333-3333-3333-333333333333');
      `)
    }
    
    app.listen(3000)
    console.log('Server running at http://localhost:3000/')
  } catch (e) {
    console.log('DB Error:', e)
    process.exit(1)
  }
}

initializeDBAndServer()

// Utility functions for validation
function isValidMobileNumber(mob_num) {
  // Remove any prefixes and non-digit characters
  const cleaned = mob_num.replace(/^\+91|^0|\D/g, '')
  return cleaned.length === 10
}

function cleanMobileNumber(mob_num) {
  return mob_num.replace(/^\+91|^0|\D/g, '').slice(-10)
}

function isValidPAN(pan_num) {
  return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan_num.toUpperCase())
}

// Middleware for error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({ error: 'Something went wrong!' })
})

app.post('/create_user', async (req, res) => {
  try {
    const { full_name, mob_num, pan_num, manager_id } = req.body
    
    if (!full_name || !mob_num || !pan_num) {
      return res.status(400).send({ error: 'full_name, mob_num, and pan_num are required' })
    }
    
    if (!isValidMobileNumber(mob_num)) {
      return res.status(400).send({ error: 'Invalid mobile number' })
    }

    if (!isValidPAN(pan_num)) {
      return res.status(400).send({ error: 'Invalid PAN number' })
    }
    
    const cleanedMobNum = cleanMobileNumber(mob_num)
    
    const cleanedPAN = pan_num.toUpperCase()
    
    // Validate manager if provided
    if (manager_id) {
      const manager = await db.get(
        'SELECT * FROM managers WHERE manager_id = ? AND is_active = true',
        [manager_id]
      )
      if (!manager) {
        return res.status(400).send({ error: 'Invalid or inactive manager' })
      }
    }
    
    const user_id = uuidv4()
    
    await db.run(
      `insert into users 
       (user_id, full_name, mob_num, pan_num, manager_id) 
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, full_name, cleanedMobNum, cleanedPAN, manager_id]
    )
    
    res.send({ message: 'User created successfully', user_id })
  } catch (error) {
    console.error('Error creating user:', error)
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).send({ error: 'Mobile number or PAN already exists' })
    }
    res.status(500).send({ error: 'Internal server error' })
  }
})

app.post('/get_users', async (req, res) => {
  try {
    const { user_id, mob_num, manager_id } = req.body
    
    let query = 'select * from users where is_active = true'
    const params = []
    
    if (user_id) {
      query += ' AND user_id = ?'
      params.push(user_id)
    } else if (mob_num) {
      const cleanedMobNum = cleanMobileNumber(mob_num)
      query += ' and mob_num = ?'
      params.push(cleanedMobNum)
    } else if (manager_id) {
      query += ' and manager_id = ?'
      params.push(manager_id)
    }
    
    const users = await db.all(query, params)
    
    res.send({ users })
  } catch (error) {
    console.error('Error getting users:', error)
    res.status(500).send({ error: 'Internal server error' })
  }
})

app.post('/delete_user', async (req, res) => {
  try {
    const { user_id, mob_num } = req.body
    
    if (!user_id && !mob_num) {
      return res.status(400).send({ error: 'Either user_id or mob_num is required' })
    }
    
    let query = 'UPDATE users SET is_active = false where is_active = true'
    const params = []
    
    if (user_id) {
      query += ' AND user_id = ?'
      params.push(user_id)
    } else if (mob_num) {
      const cleanedMobNum = cleanMobileNumber(mob_num)
      query += ' AND mob_num = ?'
      params.push(cleanedMobNum)
    }
    
    const result = await db.run(query, params)
    
    if (result.changes === 0) {
      return res.status(404).send({ error: 'User not found or already inactive' })
    }
    
    res.send({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    res.status(500).send({ error: 'Internal server error' })
  }
})

app.post('/update_user', async (req, res) => {
  try {
    const { user_ids, update_data } = req.body
    
    if (!user_ids || !Array.isArray(user_ids) || user_ids.length === 0) {
      return res.status(400).send({ error: 'user_ids array is required' })
    }
    
    if (!update_data || typeof update_data !== 'object' || Object.keys(update_data).length === 0) {
      return res.status(400).send({ error: 'update_data object is required' })
    }
    
    const { full_name, mob_num, pan_num, manager_id } = update_data
    
    // Validate fields if they're being updated
    if (full_name && !full_name.trim()) {
      return res.status(400).send({ error: 'full_name cannot be empty' })
    }
    
    if (mob_num && !isValidMobileNumber(mob_num)) {
      return res.status(400).send({ error: 'Invalid mobile number' })
    }
    
    if (pan_num && !isValidPAN(pan_num)) {
      return res.status(400).send({ error: 'Invalid PAN number' })
    }
    
    if (manager_id) {
      const manager = await db.get(
        'SELECT * from managers WHERE manager_id = ? AND is_active = true',
        [manager_id]
      )
      if (!manager) {
        return res.status(400).send({ error: 'Invalid or inactive manager' })
      }
    }
    
    // Prepare the update query
    let updateFields = []
    let updateParams = []
    
    if (full_name) {
      updateFields.push('full_name = ?')
      updateParams.push(full_name)
    }
    
    if (mob_num) {
      updateFields.push('mob_num = ?')
      updateParams.push(cleanMobileNumber(mob_num))
    }
    
    if (pan_num) {
      updateFields.push('pan_num = ?')
      updateParams.push(pan_num.toUpperCase())
    }
    
    if (manager_id) {
      updateFields.push('manager_id = ?')
      updateParams.push(manager_id)
    }
    
    updateFields.push('updated_at = CURRENT_TIMESTAMP')
    
    const updateQuery = `
      update users 
      SET ${updateFields.join(', ')} 
      WHERE user_id IN (${user_ids.map(() => '?').join(',')}) 
      and is_active = true
    `
    
    const allParams = [...updateParams, ...user_ids]
    
    const result = await db.run(updateQuery, allParams)
    
    if (result.changes === 0) {
      return res.status(404).send({ error: 'No active users found with the provided IDs' })
    }
    
    res.send({ message: 'Users updated successfully', updated_count: result.changes })
  } catch (error) {
    console.error('Error updating users:', error)
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).send({ error: 'Mobile number or PAN already exists' })
    }
    res.status(500).send({ error: 'Internal server error' })
  }
})

module.exports = app