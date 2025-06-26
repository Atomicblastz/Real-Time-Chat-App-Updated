import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { email, fullName, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long."
            });
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "User with this email already exists."
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            email,
            fullName,
            password: hashedPassword,
        })

        if(newUser) {
            // generate jwt toaken here if needed
            generateToken(newUser._id, res);

            await newUser.save();
            return res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                profilePicture: newUser.profilePicture,
                message: "User created successfully."
            });
        } else {
            return res.status(500).json({
                message: "Failed to create user."
            })
        }

    } catch (error) {
        console.error("Error during singup:", error.message);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({
            email,
       });

       if(!existingUser) {
        return res.status(400).json({
            message: "Invalid email or password."
        })
       }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid email or password."
            });
        }

        // generate jwt token here
        generateToken(existingUser._id, res);

        res.status(200).json({
            _id: existingUser._id,
            email: existingUser.email,
            fullName: existingUser.fullName,
            profilePicture: existingUser.profilePicture,
            message: "Login successful."
        })
         
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({
            message: "Internal server error."
        })
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("Token", "", {
            httpOnly: true,
            expires: new Date(0), // Set cookie to expire immediately
            maxAge: 0,
        });
        
        return res.status(200).json({
            message: "Logout successful."
        })
    } catch (error) {
        console.error("Error during logout:", error.message);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePicture } = req.body;
        const userId = req.user._id;

        if(!profilePicture) {
            return res.status(400).json({
                message: "Profile picture is required."
            })
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePicture);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: uploadResponse.secure_url },
            { new: true, runValidators: true },
        )

        res.status(200).json(updatedUser);          

    } catch (error) {
        console.error("Error during profile update:", error.message);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const checkAuthStatus = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error checking auth status:", error.message);
        res.status(500).json({
            message: "Internal server error."
        });
    }
};