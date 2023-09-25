import axios from "axios";
import { auth } from "./auth.helpers";
const baseUrl = "http://127.0.0.1:8000/api/";

async function getReadNotifications() {
  try {
    const res = await axios.get(`${baseUrl}user/getReadNotifications`, auth());
    if (res.status === 200) {
      const data = res.data;
      return { data };
    }
  } catch (error) {
    throw error;
  }
}
async function getUnreadNotifications() {
  try {
    const res = await axios.get(
      `${baseUrl}user/getUnreadNotifications`,
      auth()
    );
    if (res.status === 200) {
      const data = res.data;
      return { data };
    }
  } catch (error) {
    throw error;
  }
}

async function markNotificationAsRead(notification_id) {
  try {
    const response = await axios.post(
      `${baseUrl}user/markNotificationAsRead/${notification_id}`,
      undefined,
      auth()
    );
    if (response.status === 200) {
      const data = response.data;
      return { data };
    }
  } catch (error) {
    throw error;
  }
}

export { markNotificationAsRead, getUnreadNotifications, getReadNotifications };
