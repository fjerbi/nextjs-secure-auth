import user from "../models/user";
import User from "../models/user";
import { comparePassword, hashPassword } from "../utils/auth";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) return res.status(400).send("Name is requried");
    if (!password || password.length < 6) {
      return res.status(400).send("Password is requried");
    }
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("User already exixts");

    const hashedPassword = await hashPassword(password);

    //register
    const user = new User({
      name,
      email,
      password: hashedPassword,
    }).save();
    console.log("Saved user", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error, TryAgain");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).exec();
    if (!user) return res.status(400).send("No User Found");
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send("Wrong Password");
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    res.cookie("token", token, {
      httpOnly: true,
      //secure:true //Works only on HTTPS
    });
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error");
  }
};
