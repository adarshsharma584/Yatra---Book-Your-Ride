import mongoose,{Schema} from 'mongoose';

const driverSchema = new Schema(
   {
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  vehicleDetails: {
    carModel: {
      type: String,
      required: true
    },
    carNumber: {
      type: String,
      required: true,
      unique: true
    }
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  currentLocation: {
    lat: { type: Number },
    lng: { type: Number }
  },
  rating: {
    type: Number,
    default: 5,
    min: 0,
    max: 5
  },
  ridesCompleted: {
    type: Number,
    default: 0
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  }
},
{
    timestamps:true
}
);

const Driver = mongoose.model("Driver", driverSchema);
export default Driver;