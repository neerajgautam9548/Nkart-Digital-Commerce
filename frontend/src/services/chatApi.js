import axios from "axios";
import { API_URL } from "../constant/url";

export const sendMessage = async (message) => {
  const res = await axios.post(
    `${API_URL}/chat`,
    { message }
  );

  return res.data.reply;
};