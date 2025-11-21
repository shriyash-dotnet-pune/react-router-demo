import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserAuthContext } from "../context/AuthContext";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(UserAuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    if (isAuthorized) {
      navigate(from, { replace: true });
    }
  }, [isAuthorized]); 

  useEffect(() => {
    if (!email) setEmailError("Email is required");
    else if (!emailPattern.test(email.trim())) setEmailError("Enter a valid email");
    else setEmailError("");

    if (!password) setPasswordError("Password is required");
    else if (password.length < 6) setPasswordError("Password should be at least 6 characters");
    else setPasswordError("");
  }, [email, password]);

  const isValid = !emailError && !passwordError && email && password;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      setSubmitMessage("Please fix validation errors before submitting.");
      return;
    }

    alert("Welcome "+email)

    const userObj = { email: email.trim(), name: email.split("@")[0] || "User" };
    setIsAuthorized(true);
    setUser(userObj);
    setSubmitMessage(`Logged in as ${userObj.email}`);

    setEmail("");
    setPassword("");
    setShowPass(false);

    navigate(from, { replace: true });
  };

  return (
    <div className="card" style={{ maxWidth: 480 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label className="label">Email</label>
        <input
          className={`input ${emailError ? "input-error" : ""}`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        {emailError && <div className="error">{emailError}</div>}

        <label className="label">Password</label>
        <div className="password-row">
          <input
            className={`input ${passwordError ? "input-error" : ""}`}
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <button
            type="button"
            aria-label="toggle password visibility"
            className="eye-btn"
            onClick={() => setShowPass((s) => !s)}
          >
            {showPass ? "🙈" : "👁️"}
          </button>
        </div>
        {passwordError && <div className="error">{passwordError}</div>}

        <button className="btn" type="submit" disabled={!isValid}>
          Login
        </button>

        {submitMessage && <div className="success">{submitMessage}</div>}
      </form>
    </div>
  );
}
