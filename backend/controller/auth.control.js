import bcrypt from "bcrypt"
import userModel from "../models/user.model.js";

const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedpass = await bcrypt.hash(password, 10);

        const user = {
            email: email,
            password: hashedpass
        }

        await userModel.create(user);

        res.status(200).json({
            message: "User registered successfully!!!",
            user: {
                email
            }
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Something went wrong :<"
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        const pass = await bcrypt.compare(password, user.password);

        if (!pass) {
            return res.status(400).json({
                message: "Incorrect Password!!"
            })
        }

        res.status(200).json({
            message: "Login successful!!",
            user: {
                id: user._id,
                email: user.email
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Something went wrong :<"
        })
    }
}

export default { register, login }