import { FormEvent, useState } from "react";

import "./App.css";
import Signup from "./Signup";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  if (window.location.pathname === "/signup") {
    return <Signup />;
  }

  const validateForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset messages
    setEmailError("");
    setPasswordError("");
    setLoginMessage("");

    let isValid = true;

    // Email validation
    if (email.trim() === "") {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    // Password validation
    if (password.trim() === "") {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setLoginMessage("Login information is valid!");
    }, 1000);
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-header">
          <div className="logo">
            CS
          </div>

          <h1>Welcome Back</h1>

          <p>
            Log in to your CollabSpace account
          </p>
        </div>

        <form onSubmit={validateForm} noValidate>
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              className={emailError ? "input-error" : ""}
            />

            {emailError && (
              <span className="error-message">
                {emailError}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                className={passwordError ? "input-error" : ""}
              />

              <button
                type="button"
                className="show-password-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {passwordError && (
              <span className="error-message">
                {passwordError}
              </span>
            )}
          </div>

          {/* Remember me and Forgot password */}
          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="forgot-password"
            >
              Forgot password?
            </button>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>

          {/* Success message */}
          {loginMessage && (
            <div className="success-message">
              {loginMessage}
            </div>
          )}
        </form>

        {/* Sign up */}
        <div className="signup-section">
          <span>
            Don't have an account?
          </span>

          <button
            type="button"
            className="signup-button"
            onClick={() => {
              window.location.href = "/signup";
            }}
          >
            Sign up
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;