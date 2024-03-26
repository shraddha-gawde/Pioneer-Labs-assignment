# Pioneer-Labs-assignment

Welcome to the Pioneer Labs assignment repository! This repository contains the implementation of the Backend Developer Intern Assessment, consisting of multiple tasks aimed at developing various features for a Node.js application.

## Deployed Links
- Backend: [https://pioneer-labs-assignment-u346.onrender.com]
- swagger document for detailed expanation of apis - [link](https://pioneer-labs-assignment-u346.onrender.com/apidocs/)

## Tasks Implemented

### Task 1: Implement User Authentication with JWT
- Implemented user authentication using JSON Web Tokens (JWT).
- Created endpoints for user registration, login, and logout.
- Secured sensitive routes by requiring authentication.

### Task 2: Create API Endpoints for Data Retrieval
- Developed API endpoints to fetch data from a public API with filtering options.
- Utilized Node.js and Express.js to create API routes.
- Fetched data from the provided public API (https://api.publicapis.org/entries).
- Implemented filtering options for data retrieval based on categories and result limits.

### Task 3: Implement Swagger Documentation
- Documented the API endpoints using Swagger for better understanding and usability.
- Integrated Swagger JS with the Node.js application.
- Documented all API endpoints, including request parameters and responses.
- Generated Swagger UI for interactive API documentation.

### Task 4: Secure API Endpoint for Authenticated Users Only
- Restricted access to an API endpoint to authenticated users only.
- Implemented middleware to verify JWT authentication before allowing access.
- Returned an error message for unauthenticated requests.

## Technologies Used
- Node.js
- Express.js
- MongoDB

## NPM Packages Used
- axios
- bcrypt
- cors
- dotenv
- express
- jsonwebtoken
- mongoose
- swagger-jsdoc
- swagger-ui-express

### API endpoints
## 1. Register User : GET /users/registerUser
This endpoint is used to register a new user.

- Request Body
username (string): The username of the user.
email (string): The email address of the user.
password (string): The password for the user.
Response
Upon successful registration, the server will respond with a status code of 200 and a JSON object containing a message and details of the registered user.

- Example Response
```
{
    "msg": "The new user has been registered",
    "registeredUser": {
        "username": "example_user",
        "email": "example@example.com",
        "password": "hashed_password",
        "_id": "user_id"
    }
}
```

## 2. Login User : POST /users/login
- This endpoint is used to authenticate a user and obtain access and refresh tokens for further API calls.
- Request Body
- username (string) - The username of the user.
- email (string) - The email address of the user.
- password (string) - The password of the user.

Response
- msg (string) - A message related to the authentication process.
- name (string) - The name of the authenticated user.
- access_token (string) - The access token for accessing protected resources.
- refresh_token (string) - The refresh token for obtaining a new access token.

The response status code is 200, and the content type is application/json.


Get Users
This endpoint is used to retrieve user data.

Request
Endpoint
## 3. get all users: GET /users

Authentication
This endpoint is protected and requires authentication. Provide the access code for authentication.

Response
Upon successful retrieval of user data, the server will respond with a status code of 200 and a JSON object containing an array of user data.

Example Response
```
{
    "user_data": [
        {
            "_id": "user_id",
            "username": "example_user",
            "email": "example@example.com",
           "password": "hashed_password"
        }
    ]
}
```
## 4. Reset User Password: POST /user/{id}/reset
This endpoint allows the user to reset their password by providing the current password and the new password.
Request Body
currPassword (string): The current password of the user.
newPassword (string): The new password that the user wants to set.

Response
Status: 200 OK
Content-Type: application/json
```
{
    "msg": "",
    "user": {
        "_id": "",
        "username": "",
        "email": "",
        "password": ""
    }
}
```
## 5.Get Data:  get /data
This endpoint retrieves data based on the specified category and page number.
Request
Query Parameters
category (string, required): Specifies the category of data to retrieve.
page (integer, required): Specifies the page number of the data to retrieve.

Response
Status: 200 OK
Content-Type: application/json

Response Body
The response contains a JSON object with the following properties:
pagination (object): Contains pagination information including current page, total pages, total entries, and page navigation details.
currentPage (integer): The current page number.
totalPages (integer): The total number of pages.
totalEntries (integer): The total number of entries.
hasNextPage (boolean): Indicates if there is a next page.
hasPreviousPage (boolean): Indicates if there is a previous page.

data (array): Contains the retrieved data based on the specified category and page.

Example
```
{
  "pagination": {
    "currentPage": 0,
    "totalPages": 0,
    "totalEntries": 0,
    "hasNextPage": true,
    "hasPreviousPage": true
  },
  "data": [
    {
      "API": "",
      "Description": "",
      "Auth": "",
      "HTTPS": true,
      "Cors": "",
      "Link": "",
      "Category": ""
    }
  ]
}
```
## 6. logout user: GET /users/logout
This endpoint is used to log out a user from the system.
Headers: 
Content-Type: application/json

Body (raw, JSON):
```
{
  "currPassword": "******",
  "newPassword": "******"
}
```

Note: The request does not require a username and email, only the current and new password are needed for the logout process.


Response
Status: 200
Headers:
Content-Type: application/json

Body:
```
{
  "msg": ""
}
```








