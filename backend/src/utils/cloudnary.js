import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDNARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const upploadCloudnary = async (localPath) => {
    try {
        if (!localPath) return null;

        const res = await cloudinary.uploader.upload(localPath, {
            resource_type: "auto"
        });

        // Provide a callback function to fs.unlink
        fs.unlink(localPath, (err) => {
            if (err) {
                console.error('Error deleting local file:', err);
            } else {
                console.log('Local file deleted successfully');
            }
        });

        return res;
    } catch (error) {
        // Provide a callback function to fs.unlink
        fs.unlink(localPath, (err) => {
            if (err) {
                console.error('Error deleting local file:', err);
            } else {
                console.log('Local file deleted successfully');
            }
        });
        return null;
    }
};

export { upploadCloudnary };
