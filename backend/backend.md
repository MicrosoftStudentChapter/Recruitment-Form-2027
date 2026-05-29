# MLSC Recruitment Portal Backend

This document outlines the backend architecture, requirements for the frontend to integrate with it, and the deployment guide using Cloudflare Workers and D1 (SQLite).

## Tech Stack
- **Compute**: Cloudflare Workers
- **Database**: Cloudflare D1 (Serverless SQLite)
- **Deployment**: Wrangler CLI

## Frontend Integration Requirements

The frontend must interact with the backend API to submit recruitment applications.

### API Endpoint
- **URL**: `https://api.yourdomain.com/submit` (or the `.workers.dev` URL provided after deployment)
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`

### Payload Schema
The frontend should send a JSON payload matching this structure:
```json
{
  "personalInfo": {
    "fullName": "String",
    "email": "String",
    "rollNumber": "String",
    "phone": "String"
  },
  "previousSocieties": [
    {
      "society": "String",
      "role": "String"
    }
  ],
  "writtenResponses": {
    "whyJoin": "String",
    "difference": "String"
  },
  "primaryDepartment": {
    "department": "String",
    "links": [
      { "type": "String", "url": "String" }
    ]
  },
  "secondaryDepartment": {
    "department": "String | null",
    "links": [
      { "type": "String", "url": "String" }
    ],
    "managementPlan": "String | null"
  }
}
```

### Response Schema
- **Success (200 OK)**:
  ```json
  { "success": true, "message": "Application submitted successfully.", "id": "..." }
  ```
- **Error (4xx/5xx)**:
  ```json
  { "success": false, "message": "Error details..." }
  ```

---

## Backend Deployment Guide (Cloudflare Workers + D1)

### 1. Prerequisites
Ensure you have Node.js installed, then install the Wrangler CLI globally:
```bash
npm install -g wrangler
```
Login to your Cloudflare account:
```bash
wrangler login
```

### 2. Initialize the Worker
Inside the `backend` directory, initialize a new worker (if not already done):
```bash
npm create cloudflare@latest .
# Choose "Hello World" Worker, TypeScript, and no deploy.
```

### 3. Setup D1 Database
Create a new D1 database via Wrangler:
```bash
wrangler d1 create mlsc-recruitment-db
```
This command will output a `database_name` and `database_id`.

### 4. Configure `wrangler.toml`
Update your `wrangler.toml` file in the `backend` folder to bind the D1 database:

```toml
name = "mlsc-recruitment-backend"
main = "src/index.ts"
compatibility_date = "2024-05-29"

[[d1_databases]]
binding = "DB" # How you will access the DB in your worker: env.DB
database_name = "mlsc-recruitment-db"
database_id = "<YOUR_DATABASE_ID_FROM_PREVIOUS_STEP>"
```

### 5. Create the Database Schema
Create a file named `schema.sql` in the `backend` folder:
```sql
CREATE TABLE IF NOT EXISTS applications (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    roll_number TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    primary_department TEXT NOT NULL,
    secondary_department TEXT,
    payload JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Execute the schema against your D1 database:

**Local (for testing):**
```bash
wrangler d1 execute mlsc-recruitment-db --local --file=./schema.sql
```
**Remote (production):**
```bash
wrangler d1 execute mlsc-recruitment-db --remote --file=./schema.sql
```

### 6. Local Development
Run the worker locally to test the API:
```bash
wrangler dev
```
Update the frontend `src/lib/api.js` (or `.env.local`) to point to `http://localhost:8787` for local testing.

### 7. Deployment
Once everything is tested locally, deploy your worker to Cloudflare's global network:
```bash
wrangler deploy
```
Copy the generated deployment URL and update your frontend environment variables (e.g. `NEXT_PUBLIC_API_URL`) to point to the live backend.
