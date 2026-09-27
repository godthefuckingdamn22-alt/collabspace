import { useState } from "react";
import type { FormEvent } from "react";
import "./App.css";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFullNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setSuccessMessage("");

    let isValid = true;

    if (fullName.trim() === "") {
      setFullNameError("Full name is required.");
      isValid = false;
    }

    if (email.trim() === "") {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      isValid = false;
    }

    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Please confirm your password.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("Account created successfully!");
    }, 1000);
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-header">
          <div className="logo">CS</div>

          <h1>Create Account</h1>

          <p>Sign up for your CollabSpace account</p>
        </div>

        <form onSubmit={validateForm} noValidate>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>

            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setFullNameError("");
              }}
              className={fullNameError ? "input-error" : ""}
            />

            {fullNameError && (
              <span className="error-message">{fullNameError}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="signupEmail">Email Address</label>

            <input
              id="signupEmail"
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
              <span className="error-message">{emailError}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="signupPassword">Password</label>

            <div className="password-input-wrapper">
              <input
                id="signupPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
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
              <span className="error-message">{passwordError}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>

            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError("");
              }}
              className={confirmPasswordError ? "input-error" : ""}
            />

            {confirmPasswordError && (
              <span className="error-message">
                {confirmPasswordError}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>

          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
        </form>

        <div className="signup-section">
          <span>Already have an account?</span>

          <button
            type="button"
            className="signup-button"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Log in
          </button>
        </div>
      </section>
    </main>
  );
}

export default Signup;