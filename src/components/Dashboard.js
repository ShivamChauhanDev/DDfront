import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ setAuth }) => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "POST",
        headers: { token: localStorage.token }
      });

      const parseData = await res.json();
      setRole(parseData.user_role);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

    useEffect(() => {
    if (role === "Admin") {
      navigate("/admindashboard");
    } else if (role === "Pilot") {
      navigate("/pilotdashboard");
    }else if (role === "Co-pilot") {
      navigate("/copilotdashboard");
    }else if (role === "Projectlead") {
      navigate("/projectleaddashboard");
    }else if (role === "Client") {
      navigate("/clientdashboard");
    }else if (role === "progressing") {
      navigate("/progressingdashboard");
    }
    
  }, [role, navigate]);


  return (
    <>
      <h1 className="mt-5">Loading....</h1>
    </>
  );
};

export default Dashboard;