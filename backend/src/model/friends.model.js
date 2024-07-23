import mongoose,{Schema} from "mongoose";

const friendRequestSchema=new Schema({

    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ref"
    },
    reciver:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"ref"
    },
    status:{
        type:String,
        enum:['Accepted','Rejected','Pending'],
        default:'Pending'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

},{timestamps:true})

export const FriendRequest=mongoose.model("FriendRequest",friendRequestSchema)