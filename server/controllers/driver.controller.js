
import Driver from "../models/driver.model.js";

export const registerDriver = async (req,res)=>{
   try {
     const userId = req.user.id;
     const {licenseNumber , carModel , carNumber,isAvailable,city } = req.body;
     console.log(userId);
     console.log("req.body",req.body);
     if(!userId){
         return res.status(400).json({message:"User id is not found"});
     }
     if(!licenseNumber || !carModel || !carNumber || !isAvailable || !city){
         return res.status(400).json({
            message:"All fields are required",
         });
     };

     const driver = await Driver.create({
        userId:userId,
        licenseNumber:licenseNumber,
       vehicleDetails: {
        carModel:carModel,
        carNumber:carNumber,
      },
        isAvailable:isAvailable,
        city:city,
     });

     if(!driver){
        return res.status(500).json({message:"driver creation failed"});
     };

     return res.status(201).json({
        message:"Driver registered successfully",
        responseData:driver,
     });

   } catch (error) {
      console.log(error)
    res.status(500).json({
        message:"Internal server error",
        error,
    })
   }
}