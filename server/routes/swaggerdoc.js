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


// registration api document
/**
 * @swagger
 * /users/registerUser:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with username, email, and password (minimum 8 letters, mix of alphabet , special character, and numbers, capita letter)
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
 *     description: login user using email and password
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


// logout api document
/**
 * @swagger
 * /users/logout:
 *   get:
 *     summary: Logout user
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

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /users/{id}/reset:
 *   post:
 *     summary: Reset user password
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




/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
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


/**
 * @swagger
 * /data:
 *   get:
 *     summary: Fetch data with filtering and pagination
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
