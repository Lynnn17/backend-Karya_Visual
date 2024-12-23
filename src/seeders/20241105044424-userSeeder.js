"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     *
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "John Doe",
          email: "johndoe@example.com",
          nohp: 1234567890,
          alamat: "123 Main St",
          password:
            "$2a$12$bujVnCONAGUUR1PWRLeR7u5HsPWAupAFjwyNGQli7Hg0mPPvguX/6",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jane Smith",
          email: "lyn@gmail.com",
          nohp: 9876543210,
          alamat: "456 Elm St",
          password:
            "A665A45920422F9D417E4867EFDC4FB8A04A1F3FFF1FA07E998E86F7F7A27AE3", // Gantilah dengan password yang sudah di-hash
          role: "admin",
          refresh_token: "sdadsadsadsa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
