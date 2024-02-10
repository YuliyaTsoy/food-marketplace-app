const db = require("./connection");
const { User } = require("../models");
const dropDB = require("./dropDB");

db.once("open", async () => {
  await dropDB("User", "users");

  await User.create({
    username: "jimmythetester",
    email: "jimmy@test.com",
    password: "password123",
  });

  await User.create({
    username: "leonlemartin",
    email: "leon@lemartin.com",
    password: "supersecretpassword",
  });

  console.log("seed complete!");
  process.exit();
});
