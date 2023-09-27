import axios from "axios";
import { auth } from "./auth.helpers";
const baseUrl = "http://127.0.0.1:8000/api/";

async function getRecentTasks() {
  try {
    const res = await axios.get(`${baseUrl}user/getUpcomingTasks`, auth());
    if (res.status === 200) {
      const data = res.data;
      return { data };
    }
  } catch (error) {
    throw error;
  }
}

async function getRecentComments() {
  try {
    const res = await axios.get(`${baseUrl}user/getRecentComments`, auth());
    if (res.status === 200) {
      const data = res.data;
      return { data };
    }
  } catch (error) {
    throw error;
  }
}

async function getTaskInfo(task_id) {
  try {
    const res = await axios.get(
      `${baseUrl}user/getTaskInfo/${task_id}`,
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

export { getRecentTasks, getRecentComments, getTaskInfo };
