import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api/";

const auth = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

async function login({ email, password }) {
  try {
    const res = await axios.post(`${baseUrl}login`, {
      email,
      password,
    });
    if (res.status === 200) {
      const data = res.data;
      return { data };
    }
  } catch (error) {
    console.log(error);
  }
}

async function logout() {
  try {
    const res = await axios.post(`${baseUrl}user/logout`, undefined, auth());
    console.log(res.data);
    if (res.status === 200) {
      const data = res.data;
      return { data };
    }
  } catch (error) {
    console.log(error);
  }
}

async function register({ name, email, password }) {
  try {
    const res = await axios.post(`${baseUrl}register`, {
      name,
      email,
      password,
    });
  } catch (error) {
    console.log(error);
  }
}

export { login, auth, logout, register };
