import announcementModel from "../models/announcement.model.js";

const getAnnouncement = async (req, res) => {
    try {
        const announcements = await announcementModel.find().sort({ datePosted: -1 });
        res.json(announcements);
    } catch (err) {
        res.staus(500).json({
            message: "Server error!!!"
        })
    }
}

const createAnnouncement = async (req, res) => {
    try {
        const { title, body, author, expiresAt } = req.body;

        const newAnnouncement = await announcementModel.create({
            title,
            body,
            author,
            expiresAt
        });

        res.status(201).json({
            newAnnouncement
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Could not create announcement"
        })
    }
}

export default { createAnnouncement, getAnnouncement };