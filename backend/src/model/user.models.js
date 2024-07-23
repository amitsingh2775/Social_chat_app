import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema=new Schema({
   fullName:{
      type:String,
      required:true,
      trim:true
   },
   username:{
     type:String,
      required:true,
      unique:true,
      lowercase:true,
      trim:true
   },
   email:{
     type:String,
     unique:true,
     required:true,
     lowercase:true,
     trim:true
   },

   password:{
     type:String,
     required:[true,"password must be required"]
   },
   profileImage:{
     type:String
   },
   refreshToken:{
     type:String
   },
   firends:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User"
   }]


},{timestamps:true})

// pre save hook 

UserSchema.pre("save",async function(next){
   if(!this.isModified("password")){
    return next();
   }
   this.password=await bcrypt.hash(this.password,12)
   next();
})

// this method check password is cooret or not

UserSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

// this method genrate accesToken
UserSchema.methods.genrateAccesToken= function(){
    return jwt.sign(
        {
        _id:this._id,
        emial:this.email,
        username:this.username
    },
    process.env.SECRET_KEY,
    {expiresIn:process.env.ACCES_TOKEN_EXPIRY}
)

}
// these method genrate refreshToken
UserSchema.methods.genrateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESHTOKEN_KEY,
        {
            expiresIn:process.env.REFRESHTOKEN_KEY_EXPIRY
        }

    )
}


export const User=mongoose.model("User",UserSchema)