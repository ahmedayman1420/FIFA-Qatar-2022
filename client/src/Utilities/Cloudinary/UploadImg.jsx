// ===== --- ===== ### Axios ### ===== --- ===== //
import axios from "axios";

// ===== --- ===== ### Upload-Img-Function ### ===== --- ===== //
export const UploadImg = async (image) => {
  try {
    console.log(process.env.React_App_CLOUDINARY_UPLOAD_PRESET);
    console.log(process.env.React_App_CLOUDINARY_URL);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Singularity");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dsvyqthlb/image/upload",
      formData
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
