import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(UserAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/login", { replace: true });
    }
  }, [isAuthorized, navigate]);

  const handleLogout = () => {
    setIsAuthorized(false);
    setUser({});
    navigate("/login", { replace: true });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>User Dashboard</h2>
      <p><strong>Name:</strong> {user?.name || "—"}</p>
      <p><strong>Email:</strong> {user?.email || "—"}</p>
      <div style={{ marginTop: 12 }}>
        <button className="btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
