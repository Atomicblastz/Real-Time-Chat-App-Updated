import { config } from "dotenv"
import connectDB from "../lib/db.js"
import User from "../models/user.model.js"

config();

const seedUsers = [
    // Creating 15 Users
    {
        email: "emma.thompson@example.com",
        fullName: "Emma Thompson",
        password: "password123",
        profilePic: "/avatar.png",
    },
    {
        email: "olivia.miller@example.com",
        fullName: "Olivia Miller",
        password: "password123",
        profilePic: "/avatar.png",
    },
    {
        email: "liam.johnson@example.com",
        fullName: "Liam Johnson",
        password: "password123",
        profilePic: "/avatar.png",
    },
    {
        email: "sophia.davis@example.com",
        fullName: "Sophia Davis",
        password: "password123",
        profilePic: "/avatar.png",
    },
    {
        email: "noah.garcia@example.com",
        fullName: "Noah Garcia",
        password: "password123",
        profilePic: "/avatar.png",
    },     
    {   email: "ava.rodriguez@example.com",
        fullName: "Ava Rodriguez",
        password: "password123",
        profilePic: "/avatar.png",
    },
    {
        email: "william.martinez@example.com",
        fullName: "William Martinez",
        password: "password123",
        profilePic: "/avatar.png",
    },
    {
        email: "isabella.hernandez@example.com",
        fullName: "Isabella Hernandez",
        password: "password123",
        profilePic: "/avatar.png",
    },
    {
        email: "james.lopez@example.com",
        fullName: "James Lopez",
        password: "password123",
        profilePic: "/avatar.png",
    },
    {
        email: "mia.gonzalez@example.com",
        fullName: "Mia Gonzalez",
        password: "password123",
        profilePic: "/avatar.png",
    },
    {
        email: "benjamin.perez@example.com",
        fullName: "Benjamin Perez",
        password: "password123",
        profilePic: "/avatar.png",
    },
    {
        email: "charlotte.sanchez@example.com",
        fullName: "Charlotte Sanchez",
        password: "password123",
        profilePic: "/avatar.png",
    },
    {
        email: "lucas.ramirez@example.com",
        fullName: "Lucas Ramirez",
        password: "password123",
        profilePic: "/avatar.png",
    },
    {
        email: "amelia.kim@example.com",
        fullName: "Amelia Kim",
        password: "password123",
        profilePic: "/avatar.png",
    },
    {
        email: "henry.chen@example.com",
        fullName: "Henry Chen",
        password: "password123",
        profilePic: "/avatar.png",
    },
]

const seedDatabase = async () => {
    try {
        await connectDB();
        
        await User.insertMany(seedUsers);
        console.log("Database seeded successfully.");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

seedDatabase();