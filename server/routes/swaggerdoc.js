// all collections
/**
 * @swagger
 * components:
 *      schemas:
 *          User:
 *              type: object
 *              properties:
 *                      id:
 *                          type: string
 *                          description: the auto-generated id of user
 *                      username:
 *                          type: string
 *                          description: the user name
 *                      email:
 *                          type: string
 *                          description: the user email
 *                      password:
 *                          type: string
 *                          description: the user password(password should contain minimum 8 letters, mix of alphabet , special character, and numbers)
 *          blacklist:
 *              type: object
 *              properties:
 *                      id:
 *                          type: string
 *                          description: the auto-generated id of user
 *                      access_token:
 *                          type: string
 *                          description: access_token of current user
 *                      refesh_token:
 *                          type: string
 *                          description: refresh_token of current user
 */



// authentication
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */



// registration api document
/**
 * @swagger
 * /users/registerUser:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint allows a new user to register by providing a username, email, and password. The password must meet the following criteria, minimum 8 characters in length, containing a mix of alphabets, special characters, numbers, and at least one capital letter. Upon successful registration, the user's account is created and stored in the database, and a confirmation message is returned in the response. If the provided data does not meet the specified criteria or if the email is already associated with an existing account, an appropriate error message is returned.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully registered user
 *       '400':
 *         description: Bad request. Invalid input or user already exists
 */





// login api document
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: login for registered user
 *     description: This endpoint allows a registered user to log in by providing their email and password. The provided email is used to retrieve the user's account from the database, and then the password provided in the request is compared with the hashed password stored in the database. If the credentials are valid, the user is issued a JWT token for authentication, which is included in the response along with a confirmation message. If the provided credentials are invalid, an appropriate error message is returned.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email
 *               password:
 *                 type: string
 *                 description: User password
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 *                 name:
 *                   type: string
 *                   description: User's name
 *                 access_token:
 *                   type: string
 *                   description: JWT Access Token
 *                 refresh_token:
 *                   type: string
 *                   description: JWT Refresh Token
 *       201:
 *         description: password is wrong!!!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *       400:
 *         description: user Does not exists!!! check email and password correctly!!!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 */



// reset password
/**
 * @swagger
 * /users/{id}/reset:
 *   post:
 *     summary: Reset user password
 *     description: This endpoint allows a user to reset their password by providing their current password along with the new password. The user's identity is verified using their user ID, and the current password provided in the request body is compared with the password stored in the database. If the current password matches, it is replaced with the new password. The response includes a confirmation message along with the updated user object containing the user ID, username, and email.
 *     tags: 
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currPassword:
 *                   type: string
 *                   description: Current password
 *                 newPassword:
 *                   type: string
 *                   description: New password
 *     responses:
 *       '200':
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Confirmation message
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: User ID
 *                     username:
 *                       type: string
 *                       description: Username
 *                     email:
 *                       type: string
 *                       description: User email
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *       '401':
 *         description: Invalid current password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 */



// get all users\
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: This endpoint retrieves a list of all registered users. It allows administrators or authorized users to view the details of all users registered in the system. Upon successful retrieval, the response includes an array containing information about each user, such as their username, email, and other relevant details. If there are no users registered in the system, an empty array is returned. Access to this endpoint is restricted based on user permissions.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request. Failed to retrieve user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */



// gtting filtered and limited data from online api
/**
 * @swagger
 * /data:
 *   get:
 *     summary: Fetch data with filtering and pagination
 *     description: This endpoint retrieves data from a source, such as an external API, with the option to apply filtering and pagination. Users can specify filtering criteria, such as category, to narrow down the results. Additionally, pagination parameters can be provided to control the number of entries per page and navigate through the dataset efficiently. The response includes a paginated subset of the filtered data along with pagination metadata, such as the current page, total pages, total entries, and indicators for navigating to the next or previous pages
 *     tags:
 *       - Data
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter data by category
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: >
 *           Page number for pagination (default: 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: >
 *           Number of entries per page (default: 10)
 *     responses:
 *       '200':
 *         description: Successfully retrieved filtered and paginated data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalEntries:
 *                       type: integer
 *                     hasNextPage:
 *                       type: boolean
 *                     hasPreviousPage:
 *                       type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       API:
 *                         type: string
 *                       Description:
 *                         type: string
 *                       Auth:
 *                         type: string
 *                       HTTPS:
 *                         type: boolean
 *                       Cors:
 *                         type: string
 *                       Link:
 *                         type: string
 *                       Category:
 *                         type: string
 *       '401':
 *         description: Unauthorized. Missing or invalid authentication token
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */



// logout api document
/**
 * @swagger
 * /users/logout:
 *   get:
 *     summary: Logout user
 *     description: This endpoint logs out the authenticated user by invalidating their session tokens. When a user logs out, their access and refresh tokens are invalidated, making them unusable for further authentication. This helps to enhance the security of the user's account by preventing unauthorized access. Upon successful logout, the user is effectively logged out of the system and will need to reauthenticate to access protected resources again.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User has been logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Confirmation message
 *       400:
 *         description: Bad request. Check the request payload.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

