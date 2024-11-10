const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware.js");
const verifyToken = require("../middleware/authMiddleware.js");
const UsersController = require("../controllers/userControllers.js");

router.get("/", verifyToken, UsersController.getAllUsers);

router.post("/add", upload.single("foto"), UsersController.createNewUser);

router.patch("/:id", verifyToken, UsersController.updataUser);

router.delete("/:id", verifyToken, UsersController.deleteUser);

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: API untuk mengelola pengguna
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Mendapatkan semua pengguna
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer yourAccessToken"
 *         description: Bearer token to authorize the request
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan daftar pengguna
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Get All Users"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "user@example.com"
 *                       foto:
 *                         type: string
 *                         example: "profile.jpg"
 *                       nohp:
 *                         type: string
 *                         example: "08123456789"
 *                       alamat:
 *                         type: string
 *                         example: "Jl. Contoh No. 1"
 *                       role:
 *                         type: string
 *                         example: "admin"
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Membuat pengguna baru
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nama pengguna
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 description: Alamat email pengguna
 *                 example: "jane.doe@example.com"
 *               password:
 *                 type: string
 *                 description: Kata sandi pengguna
 *                 example: "password123"
 *               confPassword:
 *                 type: string
 *                 description: Konfirmasi kata sandi pengguna
 *                 example: "password123"
 *               nohp:
 *                 type: string
 *                 description: Nomor telepon pengguna
 *                 example: "08123456789"
 *               alamat:
 *                 type: string
 *                 description: Alamat pengguna
 *                 example: "Jl. Contoh No. 1"
 *               role:
 *                 type: string
 *                 description: Role pengguna
 *                 example: "user"
 *               foto:
 *                 type: string
 *                 format: binary
 *                 description: Foto profil pengguna
 *     responses:
 *       201:
 *         description: Pengguna berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Create New User Success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Jane Doe"
 *                     email:
 *                       type: string
 *                       example: "jane.doe@example.com"
 *                     foto:
 *                       type: string
 *                       example: "profile.jpg"
 *                     nohp:
 *                       type: string
 *                       example: "08123456789"
 *                     alamat:
 *                       type: string
 *                       example: "Jl. Contoh No. 1"
 *                     role:
 *                       type: string
 *                       example: "user"
 *       400:
 *         description: Password dan Confirm Password tidak cocok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Password dan Confirm Password tidak cocok"
 *       500:
 *         description: Terjadi kesalahan saat membuat pengguna
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while creating the user."
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Memperbarui data pengguna
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID pengguna yang ingin diperbarui
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe Updated"
 *               email:
 *                 type: string
 *                 example: "jane.doe.updated@example.com"
 *               nohp:
 *                 type: string
 *                 example: "08123456780"
 *               alamat:
 *                 type: string
 *                 example: "Jl. Contoh Baru No. 2"
 *               role:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: Pengguna berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Update User"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Jane Doe Updated"
 *                     email:
 *                       type: string
 *                       example: "jane.doe.updated@example.com"
 *       400:
 *         description: Data tidak valid untuk memperbarui pengguna
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Invalid user data"
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Menghapus pengguna
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID pengguna yang ingin dihapus
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Pengguna berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Delete User"
 *       404:
 *         description: Pengguna tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "User not found"
 */

module.exports = router;
