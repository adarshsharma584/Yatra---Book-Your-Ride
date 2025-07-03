import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({

    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver"
  },
  pickupLocation: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  dropLocation: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  price: {
    type: Number,
    default: 0
  },
  distance: {
    type: Number,
    default: 0
  },
  rideStatus: {
    type: String,
    enum: ["requested", "accepted", "started", "completed", "cancelled"],
    default: "requested"
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending"
  },
},{timestamps:true});

const Ride = mongoose.model("Ride", userSchema);
export default Ride;