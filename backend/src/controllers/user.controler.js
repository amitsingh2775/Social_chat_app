import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { upploadCloudnary } from '../utils/cloudnary.js';
import { User } from '../model/user.models.js';


// funtion of genrate refreshtoken and access token

const genrateToken=asyncHandler(async(userId)=>{
    // find user from database based on userId
    const user=await User.findById(userId);
    const accesToken=user.genrateAccesToken();
    const refreshToken=user.genrateRefreshToken()
    user.refreshToken=refreshToken;
    // save the user
    user.save({validateBeforeSave:false})

    return ({accesToken,refreshToken})
})
// Register user controller
const RegisterUser = asyncHandler(async (req, res) => {
    const { fullName, username, email, password } = req.body;

    ///console.log("full name is", fullName);
    // Check if any field is empty
    if ([username, fullName, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    // Check if user exists
    const userExist = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (userExist) {
        throw new ApiError(400, "Username or email already exists");
    }

    const profileImagePath = req.files?.profileImage[0]?.path;

    if (!profileImagePath) {
        throw new ApiError(400, "File is not uploaded");
    }

    const profileImage = await upploadCloudnary(profileImagePath);

    //console.log(profileImage);

    if (!profileImage) {
        throw new ApiError(400, "Profile image is required");
    }

    const user = await User.create({
        fullName: fullName,
        username: username,
        email: email,
        password: password,
        profileImage: profileImage.url
    });

    if (!user) {
        throw new ApiError(400, "Empty user");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "Account is successfully created"));
});

// login controler

const LoginUser=asyncHandler(async(req,res)=>{
   // fetch data from fields;

   const {identifier,password}=req.body

    // check filed is filed or not
   if(!identifier || !password){
      throw new ApiError(400,"fileds is required")
   }
 
   // find user by username either email
  const user= awaitUser.findOne({
    $or:[{username:identifier},{email:identifier}]
   })
     
   // if user does't exist throw an error
   if(!user){
     throw new ApiError(400,"user does't exist create account")
   }
 // call ispassword method to check password is coorect or not
   const isCorrectPassword=await User.isPasswordCorrect(password)

   if(!isCorrectPassword){

     throw new ApiError(400,"password doesn't matched")

   }
  // genrate accestoken and refreshtoken

  const {refreshToken,accesToken}=await genrateToken(user?._id)

   // find logeduser and it give an object and without password and refreshtoken
  const logeduser=await User.findById(user._id).select("-password","-refreshToken")

  const options={
      httpOnly:true,
      secure:true
  }
  return res
  .status(200)
  .cookie("accesToken",accesToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(
    new ApiResponse(
        200,
        {
             user:logeduser,
             refreshToken,
             accesToken
        },
        "account is succefully created"
    )
  )
  

})
export {
    RegisterUser,
    LoginUser
};
