const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let db;

const init = async () => {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(
      path.join(__dirname, '../../database.sqlite'),
      (err) => {
        if (err) {
          reject(err);
        } else {
          // Create Users table
          db.run(`
            CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              email TEXT UNIQUE NOT NULL,
              password TEXT NOT NULL,
              role TEXT NOT NULL DEFAULT 'student',
              isVerified BOOLEAN DEFAULT 0,
              verificationToken TEXT,
              resetPasswordToken TEXT,
              resetPasswordExpires DATETIME,
              createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
          `);
          
          // Create Students table
          db.run(`
            CREATE TABLE IF NOT EXISTS students (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              userId INTEGER UNIQUE,
              name TEXT NOT NULL,
              email TEXT UNIQUE NOT NULL,
              course TEXT,
              enrollmentDate DATETIME DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
            )
          `);
          
          resolve(db);
        }
      }
    );
  });
};

// Helper function to run queries
const runQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

// Helper function to get all results
const allQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Helper function to get one result
const getQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

module.exports = {
  init,
  run: runQuery,
  all: allQuery,
  get: getQuery
};