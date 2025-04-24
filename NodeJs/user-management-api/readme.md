Here's a **modified README.md** file for your User Management API with clear setup instructions, endpoint documentation, and testing examples:

```markdown
# User Management API

A simple Node.js REST API for managing users with SQLite database.

## Features
- Create users with validation
- Retrieve users with filters
- Update single or multiple users
- Soft-delete users
- Manager-user relationships

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/user-management-api.git
   cd user-management-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   node app.js
   ```
   *For development with auto-restart:*
   ```bash
   npm run dev
   ```

## API Endpoints

### 1. Create User
`POST /create_user`

**Request:**
```json
{
  "full_name": "John Doe",
  "mob_num": "+911234567890",
  "pan_num": "ABCDE1234F",
  "manager_id": "11111111-1111-1111-1111-111111111111"
}
```

**Response (Success):**
```json
{
  "message": "User created successfully",
  "user_id": "generated-uuid-here"
}
```

### 2. Get Users
`POST /get_users`

**Request (All Users):**
```json
{}
```

**Request (Filtered):**
```json
{
  "user_id": "uuid-here",
  "mob_num": "1234567890",
  "manager_id": "manager-uuid-here"
}
```

**Response:**
```json
{
  "users": [
    {
      "user_id": "uuid-here",
      "full_name": "John Doe",
      "mob_num": "1234567890",
      "pan_num": "ABCDE1234F",
      "manager_id": "manager-uuid-here",
      "created_at": "timestamp",
      "is_active": true
    }
  ]
}
```

### 3. Update User
`POST /update_user`

**Request:**
```json
{
  "user_ids": ["uuid1", "uuid2"],
  "update_data": {
    "full_name": "Updated Name",
    "mob_num": "9876543210",
    "pan_num": "NEWPAN1234X",
    "manager_id": "new-manager-uuid"
  }
}
```

**Response:**
```json
{
  "message": "Users updated successfully",
  "updated_count": 2
}
```

### 4. Delete User
`POST /delete_user`

**Request:**
```json
{
  "user_id": "uuid-to-delete"
}
```
*OR*
```json
{
  "mob_num": "1234567890"
}
```

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

## Testing

1. **Using VS Code REST Client**:
   - Use the provided `app.http` file
   - Click "Send Request" above each endpoint

2. **Using cURL**:
   ```bash
   # Create user example
   curl -X POST http://localhost:3000/create_user \
   -H "Content-Type: application/json" \
   -d '{"full_name":"Test User","mob_num":"9876543210","pan_num":"ABCDE1234F"}'
   ```

## Database Schema
- **users** table:
  ```sql
  CREATE TABLE users (
    user_id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    mob_num TEXT NOT NULL,
    pan_num TEXT NOT NULL,
    manager_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
  );
  ```

- **managers** table:
  ```sql
  CREATE TABLE managers (
    manager_id TEXT PRIMARY KEY,
    is_active BOOLEAN DEFAULT true
  );
  ```

## Error Handling
Common error responses:
- `400 Bad Request` - Invalid input data
- `404 Not Found` - User/manager not found
- `500 Internal Server Error` - Server-side issues

Example error response:
```json
{
  "error": "Invalid mobile number"
}
```

## Dependencies
- Express.js
- SQLite3
- UUID (for ID generation)

---
*Note: All create/update operations validate mobile numbers (10 digits) and PAN numbers (AAAAA1234A format).*
```

**Key Improvements:**
1. Added clear **setup instructions**
2. Organized endpoints with **request/response examples**
3. Included **testing methods** (VS Code + cURL)
4. Added **database schema** documentation
5. Improved **error handling** documentation
6. Added **dependencies** section
7. Included **notes** about validation rules

This README provides everything needed to understand, set up, and use your API. You can copy this directly into your `README.md` file.