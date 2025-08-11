import UserModel from "../model/userModel.js";
import axios from "axios";

const fixTone = async (req, res) => {
  try {
    const userId = req.user.id;
    const { input_text, tone_tags } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Input text:", input_text);
    console.log("Tone tags:", tone_tags);

    
    
  } catch (error) {
  
  }
};

export default fixTone;
