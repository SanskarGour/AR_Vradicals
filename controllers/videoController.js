import Joi from "joi";
import { videoModel } from "../models/video.model.js";
import QRCode from 'qrcode'
import crypto from 'crypto'
export const addVideo = async (req, res, next) => {
    // Input validation using Joi
    const inputSanitizer = Joi.object({
        name: Joi.string().required(),
        playStoreUrl: Joi.string().required(),
        imageUrl: Joi.string().required(),
        url: Joi.string().required(),
    });

    const { error } = inputSanitizer.validate(req.body);
    if (error) {
        return next(error);
    }

    const { name, url, imageUrl } = req.body;

    try {
        const files = req.files;
        const videoThumbnail = files?.videoThumbnail?.map(file => file.filename);
        const randomNumber = (crypto.randomBytes(6).toString('hex'))

        const qrCode = await QRCode.toDataURL(`${url}&${randomNumber}`);

        await videoModel.create({
            randomId: randomNumber,
            name: name,
            url: qrCode, // QR code containing the JSON data as text
            videoThumbnail: videoThumbnail ? videoThumbnail[0] : null, // If no thumbnail, set to null
            imageUrl: imageUrl, // Storing image URL as well in the document
        });

        return res.status(200).json({ success: true, message: "Video Added Successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
export const getVideoDetails = async (req, res) => {
    const {randomId} = req.params;
    console.log(randomId)
    try {
        const details = await videoModel.findOne({ randomId: randomId })
        if (!details) {
            return res.status(404).json({
                success: false, message: "No data found"
            })
        }
        return res.status(200).json({ success: true, details })
    } catch (error) {

    }

}


export const getVideo = async (req, res, nex) => {
    try {
        const videoQr = await videoModel.findOne({})
        return res.status(200).json({ success: true, videoQr })
    } catch (error) {
        console.log(error)
        return res.status(200).json({ success: true, message: "Internal Server Error" })
    }
}