import mongoose from "mongoose";

const eegSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    topic: { type: String, required: true },
    eegData: [
      {
        time: {
          type: Number,
          required: true,
        },
        channel1: {
          type: Number,
          required: true,
        },
        channel2: {
          type: Number,
          required: true,
        },
        channel3: {
          type: Number,
          required: true,
        },
        channel4: {
          type: Number,
          required: true,
        },
        label: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const EEGData = mongoose.model("EEGData", eegSchema);

export { EEGData };
