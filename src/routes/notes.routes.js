import { Router } from "express";
import {
  renderNotes,
  
} from "../controllers/notes.controller.js";
import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

// Get All Notes
router.get("/notes", renderNotes);

export default router;
