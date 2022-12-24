// ===== --- ===== ### Axios ### ===== --- ===== //
import axios from "axios";

// ===== --- ===== ### Upload-Img-Function ### ===== --- ===== //
export const UploadImg = async (file) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.React_App_CLOUDINARY_UPLOAD_PRESET
  );

  const res = await axios.post(process.env.React_App_CLOUDINARY_URL, formData);
  return res;
};
