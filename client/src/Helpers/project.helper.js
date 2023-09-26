import axios from "axios";
import { auth } from "./auth.helpers";
const baseUrl = "http://127.0.0.1:8000/api/";

async function getRecentProjects() {
  try {
    const res = await axios.get(`${baseUrl}user/getMyRecentProjects`, auth());
    if (res.status === 200) {
      const data = res.data;
      return { data };
    }
  } catch (error) {
    throw error;
  }
}

async function getMyProjects() {
  try {
    const res = await axios.get(`${baseUrl}user/getMyProjects`, auth());
    if (res.status === 200) {
      const data = res.data;
      return { data };
    }
  } catch (error) {
    throw error;
  }
}
async function searchMyProjects(query) {
  try {
    const res = await axios.post(
      `${baseUrl}user/searchMyProjects`,
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

async function getProjectInfo(project_id) {
  try {
    const res = await axios.get(
      `${baseUrl}user/getProjectInfo/${project_id}`,
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

async function removeContributor(project_id, user_id) {
  try {
    const res = await axios.post(
      `${baseUrl}user/removeProjectContributor/${project_id}`,
      { user_id },
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

async function abandonProject(project_id) {
  try {
    const res = await axios.post(
      `${baseUrl}user/deleteProject/${project_id}`,
      undefined,
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

async function markProjectDone(project_id) {
  try {
    const res = await axios.post(
      `${baseUrl}user/markProjectDone/${project_id}`,
      undefined,
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
  getRecentProjects,
  getMyProjects,
  searchMyProjects,
  getProjectInfo,
  removeContributor,
  abandonProject,
  markProjectDone,
};
