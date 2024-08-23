//import axios from "axios";

import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const DashboardPage = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
  });
  const router = useRouter();

  const getProfile = async () => {
    try {
      const res = await axios.get("/api/profile");
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
    } catch (error) {
      console.log(error);
    }
    router.push("/login");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={getProfile}>Get profile</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
