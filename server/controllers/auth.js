import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";

export const register = async (req, res) => {
  try {
    // console.log(req.body);

    const { name, email, password } = req.body;
    // validation

    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password is required and should be minimum 6 characters long");
    }

    let userExist = await User.findOne({ email }).exec();
    if (userExist) res.status(400).send("User already exsis. Please login");

    // hash password
    const hashedPassword = await hashPassword(password);
    // register

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    // console.log("Saved User", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error, Try Again.");
  }
};
