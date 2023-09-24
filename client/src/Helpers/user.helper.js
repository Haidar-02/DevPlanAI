import axios from "axios";
import { auth } from "./auth.helpers";
const baseUrl = "http://127.0.0.1:8000/api/";

async function getUserGeneralInfo() {
  try {
    const res = await axios.get(`${baseUrl}user/getUserGeneralInfo`, auth());
    if (res.status === 200) {
      const data = res.data;
      return { data };
    }
  } catch (error) {
    throw error;
  }
}

export { getUserGeneralInfo };
