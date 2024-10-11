import express from "express";  
import { addVideo, getVideo, getVideoDetails } from "../controllers/videoController.js";
import authorization from "../middleWares/auth.js";
import { uploadFile } from "../middleWares/fileUploader.js";

const router = express.Router();

router.post("/add-video/:fileCategory",uploadFile, addVideo);
router.get("/get-video", getVideo);
router.get("/get-video-details/:randomId", getVideoDetails);
 

export default router; 