import rateModel from "../models/rateModel.js";
import issuemodel from "../models/issueModel.js";

// Add a new rating
export const addRating = async (req, res) => {
    try {
        const { complaintId, rating } = req.body;   
        const userId = req.user._id;
        // Check if the complaint exists
        const complaint = await issuemodel.findById(complaintId);
        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }
        // Check if the user has already rated this complaint
        const existingRating = await rateModel.findOne({ complaintId, userId });
        if (existingRating) {
            return res.status(400).json({ message: "You have already rated this complaint" });
        }
        // Create and save the new rating
        const newRating = new rateModel({ complaintId, userId, rating });
        await newRating.save();
        res.status(201).json({ message: "Rating added successfully", rating: newRating });
    } catch (error) {
        console.error("Error adding rating:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get average rating for a complaint
export const getRating=async (req, res) => {
    try {
        const userId = req.user._id;
        const ratings = await rateModel.find({ userId });
        if (ratings.length === 0) {
            return res.status(404).json({ message: "No ratings found for this user" });
        }   
        const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
        res.status(200).json({
            averageRating,
            totalRatings: ratings.length,
            ratings
         });

    }
    catch (error) {

        console.error("Error fetching average rating:", error);
        res.status(500).json({ message: "Server error" });
    }
};