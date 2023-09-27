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

async function getComments(task_id) {
  try {
    const res = await axios.get(
      `${baseUrl}user/getTaskComments/${task_id}`,
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

async function addComment(task_id, { comment }) {
  try {
    const res = await axios.post(
      `${baseUrl}user/addTaskComment/${task_id}`,
      { comment: comment },
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

async function assignTask(task_id, { user_id }) {
  try {
    const res = await axios.post(
      `${baseUrl}user/addTaskAssignee/${task_id}`,
      { assignee_id: user_id },
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

async function removeAssignee(task_id) {
  try {
    const res = await axios.delete(
      `${baseUrl}user/removeTaskAssignee/${task_id}`,
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

async function deleteTask(task_id) {
  try {
    const res = await axios.delete(
      `${baseUrl}user/deleteTask/${task_id}`,
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

export {
  getRecentTasks,
  deleteTask,
  getRecentComments,
  getTaskInfo,
  getComments,
  addComment,
  removeAssignee,
  assignTask,
};
