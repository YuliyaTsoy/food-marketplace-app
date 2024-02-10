const db = require("./connection");
const { User, Category } = require("../models");
const dropDB = require("./dropDB");

db.once("open", async () => {
  await dropDB("User", "users");
  await dropDB("Category", "categories");

  const categories = await Category.insertMany([
    { name: "Produce" },
    { name: "Prepared Foods" },
    { name: "Canned Gooods" },
    { name: "Meat" },
    { name: "Dairy" },
  ]);
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
