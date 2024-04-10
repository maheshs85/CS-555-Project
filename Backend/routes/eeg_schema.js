import express from "express";
import { EEGData } from "../models/eeg_schema.js";
import csvtojson from "csvtojson";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { topic, email } = req.body;
    const file = req.files.file;
    const csvData = await csvtojson().fromFile(file.tempFilePath);
    const eegData = [];
    csvData.forEach((row) => {
      eegData.push({
        time: row.time,
        channel1: row.channel1,
        channel2: row.channel2,
        channel3: row.channel3,
        channel4: row.channel4,
        label: row.label,
      });
    });
    const EegData = new EEGData({
      email,
      topic,
      eegData,
    });

    await EegData.save();

    res.status(201).send({ message: "EEG data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error saving EEG data" });
  }
});

export default router;
