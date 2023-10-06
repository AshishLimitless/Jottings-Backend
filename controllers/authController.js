import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import Usermodels from "../schemas/Usermodels.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req);
    if (!name) {
      res.send({
        message: "Name is required",
      });
    }
    if (!email) {
      res.send({
        message: "Email is required",
      });
    }
    if (!password) {
      res.send({
        message: "Password is required",
      });
    }
    const existingUser = await Usermodels.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered please login",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new Usermodels({
      name,
      email,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(404).send({
        success: false,
        message,
      });
    }
    const user = await Usermodels.findOne({ email });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "User is not registered",
      });
    }
    const check = await comparePassword(password, user.password);
    if (!check) {
      res.status(200).send({
        success: false,
        message: "Invaild Password",
      });
    }
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        name: user.name,
        _id: user._id,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
