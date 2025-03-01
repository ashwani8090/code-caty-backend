const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { register, login } = require("../validators/auth.validators");
const validateBody = require("../middleware/validateBody");
const User = require("../models/user.model");

router.post("/register", validateBody(register), async (req, res) => {
  try {
    if(await User.isEmailTaken(req.body.email)){
      return res.status(400).send({
        errors: {
          email: "Email is already taken",
        },
      });
    }
    const user =  await User.create(req.body);

    res.status(200).send({
        message: "User created successfully",
        email: user.email,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", validateBody(login), async(req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    })
    if(!user){
        return res.status(400).send({
            errors: {
                email: "Email not found",
            },
        });
    }
    const isMatch = await user.comparePassword(req.body.password);
    if(!isMatch){
        return res.status(400).send({
            errors: {
                password: "Password is incorrect",
            },
        });
    }

    res.status(200).send({
        message: "User logged in successfully",
        email: user.email,
    });
   

});

module.exports = router;
