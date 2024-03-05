import { Schema, model } from "mongoose";

const eegSchema = new Schema({
    AF3: {type: Number, required:true},
    T7:  {type: Number, required:true},
    Pz:  {type: Number, required:true},
    T8:  {type: Number, required:true},
    AF4: {type: Number, required:true},
});
  
const EEG=model("eeg",eegSchema)

export {EEG};