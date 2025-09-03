import UserModel from "../model/userModel.js";
import axios from "axios";

const   fixTone = async (req, res) => {
  try {
    const userId = req.user.id;
    const { input_text, tone_tags } = req.body;
    const user = await UserModel.findById(userId);
    console.log("Input text:", input_text);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role:"system",
            content:"You are a bot who fix the tone of Sentences. Whenever user enter any prompt you have to send only single fixed sentence."
          },
          {
             role: "user", 
             content: `Convert this Message : ${input_text} into this tone : ${tone_tags.map(t=>t.trim()).join(' and ')} `

           }
           
          ],
      }),
    });
    
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      let errorMessage = data.error?.message || "Something went wrong";

      throw new Error(errorMessage);
    }

    await UserModel.updateOne(
      { _id: user._id, credits: { $gt: 0 } }, 
      { $inc: { credits: -1 } }
    );  
    res.json({
      success : true ,
      reply: data.choices[0].message.content ,
      credits : user.credits,
      user
      });

    // console.log("Tone tags:", tone_tags);
  } catch (error) {
    res.send({
      success:false,
      message : error.message
    })
  }
};  

const loadCredits = async (req,res) => {
    try {
      const userId = req.user.id
      const user = await UserModel.findById(userId);
      
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
     return res.send({
        success:true,
        credits : user.credits,
        user : user
      })
      

    } catch (error) {
      res.status(404).send({
        message : error.message
      })
    }
}


export { fixTone ,  loadCredits } 



