import mongoose from "mongoose";

const ProjectSchema = mongoose.Schema({
    input_text : { type : String , required : true },
    output_text: { type: String },
    tone_tags: { type: [String], required: true },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true }
    },{timestamps : true , createdAt : created_at , updatedAt : updated_at})

const ProjectModel = mongoose.model("Project" , ProjectSchema)

export default ProjectModel