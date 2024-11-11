const express = require("express");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/api/user.controller");
const auth = require("../../middlewares/auth");
const role = require("../../middlewares/role");

const router = express.Router();
router
  .route("/dealer/add")
  .post(auth(), role("ADMIN"), userController.addDealer);
router.post("/dealer/add", auth(), role("ADMIN"), userController.addDealer);
router.get("/dealers/all", auth(), role("ADMIN"), userController.getAllDealers);
router.get("/dealer/:id", auth(), role("ADMIN"), userController.getADealer);
router.delete("/dealer/:id", auth(), role("ADMIN"), userController.deleteADealer);
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
 * /users/dealer/add:
 *   post:
 *     summary: Add a dealer
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               firsName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               paymentRangeMin:
 *                  type: integer
 *               paymentRangeMax:
 *                  type: integer
 *             example:
 *               firsName: Faizan Ibrahim
 *               email: fake@example.com
 *               password: Password1@
 *               paymentRangeMin: 0
 *               paymentRangeMax: 220
 *
 *
 *     responses:
 *       "200":
 *         $ref: '#components/responses/UserRegistered'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */
/**
 * @swagger
 * /users/dealers/all:
 *   get:
 *     summary: Get all dealers
 *     description: Get all dealers
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of records
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         $ref: '#/components/responses/UserResponse'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
/**
 * @swagger
 * /users/dealer/{id}:
 *   get:
 *     summary: Get A Dealer
 *     description: Get A Dealer
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Enter dealer id to get dealer
 *     responses:
 *       "200":
 *         $ref: '#/components/responses/UserResponse'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
/**
 * @swagger
 * /users/dealer/{id}:
 *   delete:
 *     summary: Delete A Dealer
 *     description: Delete A Dealer
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Enter dealer id to delete dealer
 *     responses:
 *       "200":
 *         $ref: '#/components/responses/UserResponse'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
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
