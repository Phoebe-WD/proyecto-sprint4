import React from "react";
import NavBarProfile from "../../components/NavBarProfile/NavBarProfile";
import { useProtectedContext } from "../../context/Protected";
import { Navigate } from "react-router-dom";
import "./MyProfile.css";

const MyProfile = () => {
  const { user, setUser } = useProtectedContext();
  if (!user) return <Navigate to="/" />;
  return (
    <div className="MyProfile">
      <NavBarProfile />
    </div>
  );
};

export default MyProfile;
