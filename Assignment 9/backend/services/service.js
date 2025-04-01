const User = require("../models/model");
const bcrypt = require("bcrypt");
const Image = require("../models/imageSchema"); // Import the Image model
const multer = require("multer");

const validateUser = async (emailId, password) => {
  try {
    console.log("Validating user...");
    console.log("Username from User:", emailId);
    console.log("Password from User:", password);

    const user = await User.findOne({ email: emailId });
    console.log(user);

    // console.log(fullName);
    // console.log("db password is "+user.password);
    // console.log("passsed password is "+password);
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log(user.password);
      console.log(password);

      if (isPasswordValid) {
        console.log("User validated successfully");
        return true;
      } else {
        console.log("Invalid password");
        return false;
      }
    } else {
      console.log("User not found");
      return false;
    }
  } catch (error) {
    console.error("Error validating user:", error.message);
  }
};

// const User = require("../models/userSchema.js");
// const bcrypt = require("bcrypt");

async function getAllUsers(req, res) {
  try {
    const resultsPerPage =
      req.query.size == undefined ? 10 : parseInt(req.query.size);
    let page = req.query.page >= 1 ? req.query.page : 1;
    const searchCriteria = req.query.search ? req.query.search : "";

    page = page - 1;

    let query = {};
    if (searchCriteria) {
      query = {
        $or: [
          { fullName: { $regex: new RegExp(searchCriteria, "i") } },
          { email: { $regex: new RegExp(searchCriteria, "i") } },
        ],
      };
    }

    const totalUsers = await User.countDocuments(query);

    const users = await User.find(query, { salt: 0, _id: 0, __v: 0 })
      .select("fullName email password")
      .sort({ fullName: "asc" })
      .limit(resultsPerPage)
      .skip(resultsPerPage * page);

    const totalPages = isNaN(resultsPerPage)
      ? 1
      : Math.ceil(totalUsers / resultsPerPage);
    if (totalPages == NaN) {
      totalPages = 1;
    }
    const currentPage = page + 1;
    var response = {};
    if (currentPage > totalPages) {
      response = {
        metadata: {
          totalUsers,
          totalPages,
          currentPage,
          resultsPerPage,
        },

        data: {},
      };
    } else {
      response = {
        metadata: {
          totalUsers,
          totalPages,
          currentPage,
          resultsPerPage,
        },

        data: { users },
      };
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in getting all users:", error);
    res.status(500).send("Error in getting all users");
  }
}

async function deleteUser(req, res) {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).send("Invalid email format");
  }

  try {
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).send("User not found");
    }

    res.send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Error in deleting user");
  }
}

async function editUser(req, res) {
  const { email, fullName, password } = req.body;
  if (!fullName && !password) {
    return res.status(400).send("Please enter data to update!");
  }

  if (!email || typeof email !== "string") {
    return res.status(400).send("Invalid email ");
  }

  if (
    fullName &&
    (typeof fullName !== "string" || !fullName.match(/^[a-zA-Z ]{2,30}$/))
  ) {
    return res
      .status(400)
      .send("Invalid fullname - Only alphabets and space allowed");
  }

  if (
    password &&
    (typeof password !== "string" ||
      !password.match(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      ))
  ) {
    return res
      .status(400)
      .send(
        "Invalid Password - Should be between 6-16 characters (Atleast one number, special character and a upper case is required)."
      );
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send(" User not found");
    }

    if (fullName) {
      user.fullName = fullName;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.send(`User ${user.fullName} details updated successfully`);
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).send("Error in updating user details");
  }
}

async function createUser(req, res) {
  const { fullName, email, password } = req.body;
  console.log(fullName);
  console.log(email);
  console.log(password);
  
  if (!fullName || !email || !password) {
    return res.status(400).send("Missing required fields in the request body");
  }

  if (typeof fullName !== "string" || !fullName.match(/^[a-zA-Z ]{2,30}$/)) {
    return res
      .status(400)
      .send("Invalid fullname - Only alphabets and space allowed");
  }

  if (
    !email ||
    typeof email !== "string" ||
    !email.match(/^[a-zA-Z0-9._-]+@northeastern\.edu$/)
  ) {
    return res
      .status(400)
      .send("Invalid EmailId - Please use your northeastern email");
  }

  if (
    !password.match(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    )
  ) {
    return res
      .status(400)
      .send(
        "Invalid Password - Should be between 6-16 characters (Atleast one number, special character and a upper case is required)."
      );
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ fullName, email, password: hashedPassword, salt });
    await user.save();
    res.send(`User ${user.email} created successfully`);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .send(
        "Internal Server Error - Error creating user - Check Email Id, User might already exist"
      );
  }
}

async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    console.log("Uploaded file:", req.file);
    // console.log("request req);

    const { originalname, buffer } = req.file;
    const { name } = req.body; // Extract the 'name' from the request body

    console.log("Original Filename:", originalname);
    console.log(" Filename:", name);

    const newImage = new Image({
      name: name,  // Store the original filename
      image: { data: buffer },  // Store the image's binary data
    });

    await newImage.save().then(console.log("Success"));
    return res.status(200).send("Image uploaded successfully!");

  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).send("Error uploading image");
  }
}

async function getAllImages(req, res){
  // console.log("inside")

  // const response = Image.find();
  // console.log(response.buffer)
  // return response;
  try {
    const images = await Image.find({}, "name image"); // Fetch only the name and image fields

    // Map the images into a response format the frontend can use
    const response = images.map(img => ({
      name: img.name,
      image: `data:image/png;base64,${img.image.data.toString("base64")}` // Convert buffer to Base64
    }));

    return res.status(200).json(response); // Send the formatted response
  } catch (error) {
    console.error("Error fetching images:", error);
    return res.status(500).send("Error fetching images");
  }
}


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // cb(null, '../images');
//     cb(null, path.join(__dirname, '../images')); // Absolute path to the images folder

//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });
module.exports = {
  validateUser,
  getAllUsers,
  deleteUser,
  editUser,
  createUser,
  uploadImage,
  getAllImages,
};
