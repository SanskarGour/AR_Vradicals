import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        randomId: { type: String, default: null },
        videoThumbnail: { type: String, default: null },
        playStoreUrl: { type: String, default: null },
        name: { type: String, default: null },
        url: { type: String, default: null }, 
    },
    { timestamps: true }
);

export const videoModel = mongoose.model("video", videoSchema);

