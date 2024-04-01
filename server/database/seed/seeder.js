const { database } = require("../");
const PostModel = require("../models/Post"); // Adjust the path as needed
const UserModel = require("../models/User.js");
const dummyData = require("./dummy.js");

module.exports = async () => {
  await PostModel.deleteMany({});
  console.log("Deleted posts");

  await UserModel.deleteMany({});
  console.log("Deleted users");

  await PostModel.insertMany(dummyData.posts);
  console.log("Seeded posts");
};
