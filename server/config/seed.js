const db = require("./connection");
const { User, Category, Product } = require("../models");
const dropDB = require("./dropDB");

db.once("open", async () => {
  await dropDB("User", "users");
  await dropDB("Category", "categories");
  await dropDB("Product", "products");

  const categories = await Category.insertMany([
    { name: "Produce" },
    { name: "Prepared Foods" },
    { name: "Canned Gooods" },
    { name: "Meat" },
    { name: "Dairy" },
  ]);

  const products = await Product.insertMany([
    {
      name: "Carrots",
      price: 2.99,
      category: categories[0]._id,
    },
    {
      name: "Potatoes",
      price: 3.99,
      category: categories[0]._id,
    },
    {
      name: "Brussel Sprouts",
      price: 1.99,
      category: categories[0]._id,
    },
    {
      name: "Samosas",
      price: 6.99,
      category: categories[1]._id,
    },
    {
      name: "Empanadas",
      price: 7.99,
      category: categories[1]._id,
    },
    {
      name: "Fish Tacos",
      price: 17.52,
      category: categories[1]._id,
    },
    {
      name: "Canned Peas",
      price: 3.99,
      category: categories[2]._id,
    },
    {
      name: "Brisket",
      price: 13.99,
      category: categories[3]._id,
    },
    {
      name: "Homemade Mozzarella Cheese",
      price: 5.99,
      category: categories[4]._id,
    },
    {
      name: "Gouda",
      price: 4.99,
      category: categories[4]._id,
    },
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
