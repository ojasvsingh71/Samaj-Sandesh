import bcrypt from "bcrypt"
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"

const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {

        const existing = await userModel.findOne({ email });
        if (existing) {
            return res.status(400).json({
                message: "User already exists with this email..."
            });
        }

        const hashedpass = await bcrypt.hash(password, 10);

        const user = {
            name: name,
            email: email,
            password: hashedpass,
            role: role
        }

        await userModel.create(user);

        res.status(200).json({
            message: "User registered successfully!!!",
            user: user
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Something went wrong :<"
        })
    }
}

const login = async (req, res) => {
    const { email, password} = req.body;

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

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "5h" }
        )

        res.status(200).json({
            message: "Login successful!!",
            token,
            user: {
                id: user._id,
                email: user.email,
                role:user.role
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Something went wrong :<"
        })
    }
}

const getme = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Could not fetch user" });
    }
}

export default { register, login, getme }