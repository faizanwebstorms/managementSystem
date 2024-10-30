const express = require("express");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/api/user.controller");
const auth = require("../../middlewares/auth");

const router = express.Router();

router
  .route("/:userId")
  .patch(
    auth(),
    validate(userValidation.updateUser),
    userController.updateUser
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users Management
 */

/**
 * @swagger
 * /users/{id}:
 *
 *   patch:
 *     summary: Update user personal information
 *     description: Logged in users can only update their own information. Only admins can update other users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               age:
 *                  type: integer
 *               height:
 *                  type: string
 *               weight:
 *                  type: float
 *               city:
 *                  type: string
 *               postalCode:
 *                  type: string
 *               gender:
 *                  type: integer
 *               religion:
 *                  type: integer
 *               relationshipIntention:
 *                  type: integer
 *               location:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   lat:
 *                     type: number
 *                   lng:
 *                     type: number
 *             example:
 *               firstName: update name
 *               lastName: update last name
 *               age: 22
 *               height: 6'8"
 *               weight: 54.6
 *               city: Lahore
 *               postalCode: "20456"
 *               gender: 0
 *               religion: 2
 *               relationshipIntention: 2
 *               location:
 *                 name: Florida Gulf Coast University FGCU FGCU Boulevard Fort Myers FL USA
 *                 latitude: 26.4626967
 *                 longitude: -81.7800748
 *                 latitudeDelta: 0.0922
 *                 longitudeDelta: 0.0421
 *     responses:
 *       "200":
 *         $ref: '#/components/responses/UserResponse'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
