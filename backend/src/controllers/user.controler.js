import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { upploadCloudnary } from '../utils/cloudnary.js';
import { User } from '../model/user.models.js';

// Register user controller
const RegisterUser = asyncHandler(async (req, res) => {
    const { fullName, username, email, password } = req.body;

    console.log("full name is", fullName);
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

    console.log(profileImage);

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

export {
    RegisterUser
};
