const express = require("express");
const { login, logout } = require("../controllers/authController");
const { refreshToken } = require("../controllers/refreshToken");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: API untuk autentikasi pengguna
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login pengguna
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Alamat email pengguna
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: Kata sandi pengguna
 *                 example: 123
 *     responses:
 *       200:
 *         description: Login berhasil, mengembalikan access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Token akses untuk otentikasi pengguna
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Password salah
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Wrong Password"
 *       404:
 *         description: Email tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Email tidak ditemukan"
 */

router.post("/login", login);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout pengguna
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         required: true
 *         schema:
 *           type: string
 *         description: Refresh token from the user's cookies
 *     responses:
 *       200:
 *         description: Logout berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Logout Success"
 *       204:
 *         description: Tidak ada refresh token atau refresh token tidak ditemukan untuk pengguna
 */

router.get("/logout", logout);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Mengambil access token baru menggunakan refresh token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh token yang dikirim melalui cookies
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan access token baru
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Access token baru yang diberikan setelah validasi refresh token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Refresh token tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No refresh token found"
 *       403:
 *         description: Refresh token tidak valid atau tidak cocok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid or expired refresh token"
 *       500:
 *         description: Terjadi kesalahan server saat memverifikasi refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred during token verification"
 */

router.post("/refresh-token", refreshToken);

module.exports = router;
