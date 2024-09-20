import { Schema, model, models } from "mongoose";
import User from "./user.model";

const FieldSchema = new Schema({
  fieldName: {
    type: String,
    unique: true,
    required: true,
  },
  cropType: {
    type: String,
    trim: true
  },
  location: {
    coordinates: {
      type: [Number],  // [longitude, latitude]
      default: undefined
    },
    address: {
      type: String,
      trim: true
    }
  },
  pic: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
  details: {
    type: String,
    trim: true
  },
  status: {
    type: String,
  },
  image: {
    type: Array,
    trim: true
  },
  plantingDate: {
    type: Date,
    default: Date.now
  },
  harvestDate: {
    type: Date,
  }
});

FieldSchema.index({ "location.coordinates": "2dsphere" });

const Field = models?.Field || model('Field', FieldSchema);

export default Field;