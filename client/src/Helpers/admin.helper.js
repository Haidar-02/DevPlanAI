import axios from "axios";
import { auth } from "./auth.helpers";
const baseUrl = "http://127.0.0.1:8000/api/";

async function getAllUsers() {
  try {
    const res = await axios.get(`${baseUrl}user/admin/getAllUsers`, auth());
    if (res.status === 200) {
      const data = res.data;
      return { data };
    }
  } catch (error) {
    throw error;
  }
}

async function searchAllUsers(query) {
  try {
    const res = await axios.post(
      `${baseUrl}user/searchUsers`,
      { content: query },
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

async function makeDemoteAdmin(userId) {
  try {
    const response = await axios.post(
      `${baseUrl}user/admin/makeDemoteAdmin/${userId}`,
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

async function deleteUser(userId) {
  try {
    const response = await axios.delete(
      `${baseUrl}user/admin/deleteUser/${userId}`,
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

async function searchAllProjects(query) {
  try {
    const response = await axios.post(
      `${baseUrl}user/admin/searchAllProjects`,
      { content: query },
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

export {
  getAllUsers,
  searchAllUsers,
  makeDemoteAdmin,
  deleteUser,
  searchAllProjects,
};
