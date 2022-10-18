import User from "../models/user";
import { comparePassword, hashPassword } from "../utils/auth";

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
