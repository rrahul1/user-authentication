import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Signup function
export const signup = async (req, res) => {
   const { name, email, password } = req.body;

   try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
         name,
         email,
         password: hashedPassword,
      });

      await newUser.save();
      console.log("User created successfully");

      const token = jwt.sign(
         { id: newUser._id, email: newUser.email },
         process.env.JWT_SECRET,
         { expiresIn: "1h" }
      );

      return res.status(201).json({ user: newUser });
   } catch (error) {
      return res.status(500).json({ message: "Error occurred during signup" });
   }
};

// Login function
export const login = async (req, res) => {
   const { email, password } = req.body;

   try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
         return res.status(404).json({ message: "User not found" });
      }

      const isPasswordCorrect = await bcrypt.compare(
         password,
         existingUser.password
      );
      if (!isPasswordCorrect) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
         { id: existingUser._id, email: existingUser.email },
         process.env.JWT_SECRET,
         {
            expiresIn: "1h",
         }
      );

      res.status(200).json({ user: existingUser, token });
   } catch (error) {
      res.status(500).json({ message: "Error occurred during login" });
   }
};

// Function to get all user
export const getAllUserDetails = async (req, res) => {
   try {
      const users = await User.find({});

      res.status(200).json(users);
   } catch (error) {
      res.status(500).json({ message: "Error fetching user details" });
   }
};

// Function to update user information (name, email, or password one at a time)
export const updateUser = async (req, res) => {
   const { userId } = req.params;
   const { name, email, password, oldPassword } = req.body;

   try {
      const updateData = {};

      if (name) {
         updateData.name = name;
      }

      if (email) {
         const emailRegex = /\S+@\S+\.\S+/;
         if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
         }
         updateData.email = email;
      }

      if (password) {
         if (!oldPassword) {
            return res.status(400).json({
               message: "Old password is required to update password",
            });
         }

         const user = await User.findById(userId);
         if (!user) {
            return res.status(404).json({ message: "User not found" });
         }

         const isMatch = await bcrypt.compare(oldPassword, user.password);
         if (!isMatch) {
            return res
               .status(400)
               .json({ message: "Old password is incorrect" });
         }

         if (password.length < 6) {
            return res.status(400).json({
               message: "Password must be at least 6 characters long",
            });
         }

         updateData.password = await bcrypt.hash(password, 12);
      }

      if (Object.keys(updateData).length === 0) {
         return res
            .status(400)
            .json({ message: "No valid field provided to update" });
      }

      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
         new: true,
      });

      if (!updatedUser) {
         return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
         message: "User updated successfully",
         user: updatedUser,
      });
   } catch (error) {
      res.status(500).json({
         message: "Error updating user information",
         error,
      });
   }
};

// Function to delete a user
export const deleteUser = async (req, res) => {
   const { id } = req.params;

   try {
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
         return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
         message: "User deleted successfully",
         user: deletedUser,
      });
   } catch (error) {
      res.status(500).json({
         message: "Error deleting user",
         error,
      });
   }
};
