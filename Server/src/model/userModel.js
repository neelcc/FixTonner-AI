import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{ type : String , required : true },
    email:{ type : String , required : true , unique : true },
    password:{ type : String , required : true },
    credits:{type:Number, default: 3}
})

const UserModel = mongoose.model("User",userSchema)

export default UserModel