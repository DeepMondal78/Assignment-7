
---
# FRONTEND 
## Project Overview
This is the frontend of a To-Do List application built using **React.js**.
It is fully integrated with the backend APIs to perform CRUD operations, status updates, and task searching.
## Tech Stack
* React.js
* Axios
* CSS / Tailwind
* Netlify (Deployment)


## Features
* Add new task
* Update task
* Delete task
* Mark task as complete / pending
* Search tasks
* Real-time UI updates

## Environment Variables
Create a `.env` file:
```
VITE_API_URL=https://YOUR-BACKEND-URL.onrender.com
```
## How to Run Locally
```
npm install
npm run dev
```
## API Integration
* Axios used for all API requests
* State managed using React `useState`
* UI updates dynamically based on API responses

## Error Handling
* Handled API errors using try-catch
* Displayed error messages to users
## Challenges Faced
* Connecting frontend with live backend
* Managing component state after API updates
* Handling API errors gracefully

## Solutions
* Used environment variables for API URLs
* Proper state updates after CRUD operations
* Centralized API calls using Axios
---
# Submission Notes
Ensure that:
* Repositories are **public**
* `.env` and `node_modules` are **not pushed**
* Live links are working properly


## Live Demo
## frontend 
```
https://mongobdcrudapplication.vercel.app/
```
## Backend API URL
```
https://mongobdcrudapplication.onrender.com/task
```