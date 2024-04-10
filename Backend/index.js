import express from "express";
import cors from "cors";
import connection from "./db.js";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import eegRoutes from "./routes/eeg_schema.js";

const app = express();
dotenv.config();

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());
// Set up express-fileupload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/eeg", eegRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}`));
