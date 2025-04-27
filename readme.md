# Incident Management API

Hi, I am **Ujjwal Aggarwal** (University ID: 12001083). This is my Incident Management API project built with **typescript** ,**Node.js**, **Express**, and **MySQL**. 

## How to Run the Project

### Prerequisites
- **Node.js** (make sure it's installed on your system).
- **MySQL** (running on your local machine).

### Step-by-Step Setup
     ```

1. **Install dependencies**:
   - Install the required packages using npm:
     ```bash
     npm install
     ```

3. **Set up MySQL Database**:
   - Open MySQL and create a database called `aicall`:
     ```sql
     CREATE DATABASE aicall;
     USE aicall;
     
     CREATE TABLE incidents (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       description TEXT NOT NULL,
       stautus  VARCHAR(50) NOT NULL,
       reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```

4. **Configure Database Connection**:
   - Open `app.ts` and set your MySQL connection details:
     ```javascript
     const db = mysql.createConnection({
       host: 'localhost',
       user: 'root',
       password: 'ujjwal',  // Replace with your MySQL password
       database: 'aicall'
     });
     ```

5. **Run the Application**:
   - Start the server:
     ```bash
     npm run dev
     ```

   - The server will be running at `http://localhost:3800`. // i have set it to 3800

## API Endpoints

### 1. **GET /**

   - **Description**: Returns a welcome message(default).
    - **url**: http://localhost:3800/
   - **Example**:
     ```json
     {"message": "welcome from Ujjwal aggarwal 12001083"}
     ```
### 2. **GET /incidents**

   - **Description**: Fetch all incidents from the database.
    **url**: http://localhost:3800/incidents 
   - **Example**:
     ```json
     [
       {
         "id": 1,
         "title": "Incident Title",
         "description": "Incident description",
         "severity": "High",
         "reported_at": "2025-04-27T10:00:00.000Z"
       }
     ]
     ```

### 3. **GET /incidents/:id**

   - **Description**: Fetch a specific incident by its ID.
    **url**: http://localhost:3800/incidents/1
   - **Example (200)**:
     ```json
     {
       "id": 1,
       "title": "Incident Title",
       "description": "Incident description",
       "severity": "High",
       "reported_at": "2025-04-27T10:00:00.000Z"
     }
     ```
   - **Example (404)**:
     ```json
     {
       "error": "Incident not found"
     }
     ```

### 4. **POST /incidents**

   - **Description**: Add a new incident to the database.
    **url**: http://localhost:3800/incidents
    **method** : POST
   - **Request Body**:
     ```json
     {
       "title": "New Incident",
       "description": "This is a new incident.",
       "severity": "Medium"
     }
     ```
   - **Response (201)**:
     ```json
     {
       "id": 2,
       "title": "New Incident",
       "description": "This is a new incident.",
       "severity": "Medium",
       "reported_at": "2025-04-27T10:05:00.000Z"
     }
     ```

### 5. **DELETE /incidents/:id**

   - **Description**: Delete an incident by its ID.
    **url**: http://localhost:3800/incidents/5
    **method** : DELETE
   - **Response (200)**:
     ```json
     {
       "message": "Incident deleted successfully"
     }
     ```
   - **Response (404)**:
     ```json
     {
       "error": "Incident not found"
     }
     ```

## Design Decisions

- I chose **Node.js** and **Express** for simplicity and fast development.
- **MySQL** was selected as the database for its reliability and ease of integration with Node.js.
- I kept the API simple with basic CRUD operations, making it easy to add or modify features later.


## Contact

- **Created by Ujjwal Aggarwal**  
- **University ID**: 12001083  

