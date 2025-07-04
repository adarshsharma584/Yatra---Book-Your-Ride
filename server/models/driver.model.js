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
  city:{
    type:String,
    required:true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  }
  // currentLocation: {
  //   lat: { type: Number },
  //   lng: { type: Number }
  // },
  // rating: {
  //   type: Number,
  //   default: 5,
  //   min: 0,
  //   max: 5
  // },
  // ridesCompleted: {
  //   type: Number,
  //   default: 0
  // },
},
{
    timestamps:true
}
);

const Driver = mongoose.model("Driver", driverSchema);
export default Driver;