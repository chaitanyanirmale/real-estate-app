import express from "express";
import { createListing, deleteListing, updateListing, getListing, getListings, uploadImage } from "../controller/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings); 
router.post('/upload', upload.array('images'), uploadImage);

export default router;