const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//VALIDATION OF USER INPUTS
const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
  firstname: Joi.string().min(3).required(),
  lastname: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(3).required(),
});

//SIGNUP USER
router.post("/register", async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    res.status(400).send("Email already exists");
    return;
  }

  //HASHING THE PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //ON PROCESS OF ADDING NEW USER
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    //VALIDATION OF USER INPUTS
    const { error } = await registerSchema.validateAsync(req.body);

    if (error) {
      res.status(400).send(error.detail[0].message);
      return;
    } else {
      //NEW USER IS ADDED

      const saveUser = await user.save();
      res.status(200).send("User created successfully");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

//LOGIN USER

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Incorrect Email- ID");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Incorrect Password");

  try {
    const { error } = await loginSchema.validateAsync(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
      //SENDING BACK TOKEN
      const token = jwt.sign(
        { _id: user._id, name: user.name, email: user.email },
        process.env.TOKEN_SECRET
      );
      res.json({
        token,
        user: { id: user._id, name: user.firstname, email: user.email },
      });
      // res.header("auth-token", token).send(token);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
