const express = require('express');
const app = require("../services/service.js");
const { loginController } = require('../controllers/controller');

const router = express.Router();

const multer  = require('multer')

const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage: storage });

router.post('/login', loginController);

// Route to crete a new user
router.post("/create", async (req, res) => {
  return app.createUser(req, res);
});

// Route to Edit a user
router.put("/edit", async (req, res) => {
  return app.editUser(req, res);
});

// Route to Delete a user
router.delete("/delete", async (req, res) => {
  return app.deleteUser(req, res);
});

// Route to get all users
router.get("/getAll", async (req, res) => {
  return app.getAllUsers(req, res);
});

router.post("/uploadImage", upload.single("file") ,async (req, res) => {
  console.log("Recieved the request");
  
  return app.uploadImage(req, res);
});


router.get("/images", async(req, res)=>{
  console.log("Recieved the request");

  return app.getAllImages(req, res);
  
});


module.exports = router;

// const express = require("express");
// const router = express.Router();
// const app = require("../services/app.js");

// // Route to crete a new user
// router.post("/user/create", async (req, res) => {
//   return app.createUser(req, res);
// });

// // Route to Edit a user
// router.put("/user/edit", async (req, res) => {
//   return app.editUser(req, res);
// });

// // Route to Delete a user
// router.delete("/user/delete", async (req, res) => {
//   return app.deleteUser(req, res);
// });

// // Route to get all users
// router.get("/user/getAll", async (req, res) => {
//   return app.getAllUsers(req, res);
// });

// module.exports = router;