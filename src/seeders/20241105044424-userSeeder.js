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
          id: "user-9b26face-079a-4ec0-b67b-b309beb9c230",
          name: "John Doe",
          email: "johndoe@example.com",
          contact: 1234567890,
          address: "123 Main St",
          password:
            "$2a$12$PaOvRyLiGJDuCyfWrgM2g.JsUqK/r6JF70s6o0ePWaaJlmZ5VOrMG",
          role: "user",
        },
        {
          id: "user-77ce49ca-33fb-484e-a563-f50008b22301",
          name: "Jane Smith",
          email: "lyn@gmail.com",
          contact: 9876543210,
          address: "456 Elm St",
          password:
            "$2a$12$PaOvRyLiGJDuCyfWrgM2g.JsUqK/r6JF70s6o0ePWaaJlmZ5VOrMG", // Gantilah dengan password yang sudah di-hash
          role: "admin",
          refresh_token: "sdadsadsadsa",
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
    await queryInterface.bulkDelete("users", null, {});
  },
};
