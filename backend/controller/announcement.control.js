import announcementModel from "../models/announcement.model.js";

const getAnnouncement = async (req, res) => {
    try {
        const announcements = await announcementModel.find().sort({ CreatedAt: -1 });
        res.json(announcements);
    } catch (err) {
        res.staus(500).json({
            message: "Server error!!!"
        })
    }
}

const createAnnouncement = async (req, res) => {
    try {
        const { title, body, author, CreatedAt } = req.body;

        const newAnnouncement = await announcementModel.create({
            title,
            body,
            author,
            CreatedAt
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