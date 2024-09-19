import { Schema, model, models } from "mongoose";

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
    ref: 'User',
  },
  details: {
    type: String,
    trim: true
  },
  size: {
    value: {
      type: Number,
      min: 0
    },
    unit: {
      type: String,
      enum: ['hectares', 'acres', 'square meters'],
      default: 'hectares'
    }
  },
  status: {
    type: String,
  },
  image: {
    type: String, // URL to the uploaded image
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

FieldSchema.index({ "location.coordinates": "2dsphere" });

const Field = models?.Field || model('Field', FieldSchema);

export default Field;