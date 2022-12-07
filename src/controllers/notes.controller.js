import User from "../models/User.js";

export const renderNoteForm = (req, res) => res.render("notes/new-note");

export const renderNotes = async (req, res) => {
  const notes = await User.find({ user: req.user})
    .sort({ date: "desc" })
    .lean();
  res.render("notes/all-notes", { notes });
};




