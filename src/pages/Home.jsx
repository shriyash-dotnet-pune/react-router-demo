import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to the Home Page</h1>
      <p>This is a public page. Use Login to access the Dashboard.</p>
      <button onClick={()=>{navigate('/login')}}>Login</button>
    </div>
  );

}
