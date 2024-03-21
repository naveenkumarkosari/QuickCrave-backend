import { Request, Response } from "express";
import User from "../models/user";

//get user
const getCurrentUser=async(req:Request,res:Response)=>{
  try{
    const currentUser=User.findOne({_id:req.userId});
    if(!currentUser){
      return res.status(404).json({message:"User not found"})
    }
    return res.json(currentUser)

  }catch(error){
    console.log(error);
    res.status(500).json({message:"something went wrong"})
    
  }
}


//createUser
const createCurrentUser = async (req: Request, res: Response) => {
  //if user exists
  //create a user doesnt exist
  //return a user object to the calling client
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      return res.status(200).send();
    }
    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    //get properties
    const { name, addressLine1, country, city } = req.body;
    //get user to update
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    //update user credentials
    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;
    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export default {
  getCurrentUser,
  createCurrentUser,
  updateCurrentUser,
  
  
};
