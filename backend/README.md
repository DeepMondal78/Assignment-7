## Project Overview
This is the backend of a To-Do List application built using **Node.js**, **Express.js**, and **MongoDB**.
It provides RESTful APIs for managing tasks including creation, retrieval, updating, deletion, status updates, and searching tasks.

## Tech Stack
* Node.js
* Express.js
* MongoDB
* Mongoose
* dotenv
* CORS
## Folder Structure
```
src/
 ├─ controllers/
 ├─ routes/
 ├─ models/
 ├─ db/
 │   └─ db.js
 ├─ server.js
 └
```
## API Endpoints
| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| GET    | /tasks              | Get all tasks      |
| GET    | /tasks/:id          | Get task by ID     |
| POST   | /tasks              | Create new task    |
| PUT    | /tasks/:id          | Update task        |
| PATCH  | /tasks/:id/status   | Update task status |
| DELETE | /tasks/:id          | Delete task        |
| GET    | /tasks?search=value | Search tasks       |

## Environment Variables
Create a `.env` file:
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
```
## How to Run Locally
```
npm install
npm run dev
```
## Error Handling
* Used try-catch blocks in controllers
* Proper HTTP status codes
* Meaningful error responses

## Challenges Faced
* MongoDB connection issues
* Handling async API errors
* CORS issues during frontend integration

## Solutions
* Used dotenv for environment variables
* Implemented structured try-catch blocks
* Enabled CORS middleware
