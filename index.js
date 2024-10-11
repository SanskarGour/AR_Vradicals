import express from "express";
import dbConnect from "./models/dbConnect.js";
import http from 'http'
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from 'path';
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import morgan from "morgan"; 
import videoRoutes from "./routes/video.routes.js";
import errorHandler from "./middleWares/errorHandler.js";
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config(); // Reading .env file data
dbConnect.DBConnection();
const app = express();
const server = http.createServer(app);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}

app.use(express.static(path.resolve(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.use(cors(corsOptions));

app.use(morgan("dev"));

//userRoutes
app.use("/video", videoRoutes);
 

app.use(errorHandler);
server.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}🚀 `);
});



