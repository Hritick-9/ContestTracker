import mongoose from "mongoose";

const contestSchema = new mongoose.Schema({
   platform: {
       type: String,
       enum:["Codeforces", "CodeChef", "LeetCode"],
       required: true
   },
   name: {
         type: String,
         required: true
   },
   url:{type: String, required: true},
   startTime: {type: Date},
    endTime: {type: Date},
   duration: {type: Number, required: true},
   status: {
       type: String,
       default: "Upcoming",
       enum: ["Upcoming", "Running", "Ended"],
       required: true
   },


});

const Contest = mongoose.model("Contest",contestSchema);
export default Contest;