import userModel from "../models/User.js";
import axios from "axios";
import FormData from "form-data";
export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;
    const user = await userModel.findById(userId);
    if (!user || !prompt) {
      return res
        .status(401)
        .json({ success: false, message: "Missing Details" });
    }
    if (user.creditBalance === 0 || userModel.creditBalance < 0) {
      return res.status(401).json({
        success: false,
        message: "Insufficient Credits",
        creditBalance: user.creditBalance,
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;
    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });
    res.status(200).json({
      success: true,
      image: "Image Generated Successfully",
      creditBalance: user.creditBalance,
      resultImage,
    });
  } catch (err) {
    console.log(err.message);
    req.status(400).json({ success: false, message: err.message });
  }
};

// 5:51:19
