import { useState } from "react";
import { cx } from "../utils/cx";
import styles from "../styles/LoginRegister.module.css";
import { useAuthStore } from "../store/AuthStore";
import ErrorWindow from "../components/ErrorWindow/ErrorWindow";
import StarryBackground from "../layout/StarryBackbround/StarryBackground";

export default function LoginRegister() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);



  const register = useAuthStore((state) => state.register);
  const login = useAuthStore((state) => state.login);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Fields can not be empty.")
      return;
    }

    try {
      await login(email, password);
    } catch (err) {
      setError("Login failed.")
      console.log(err)
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Enter a valid e-mail.");
      return;
    }

    try {
      await register(email, password, username);
    } catch (err) {
      setError("Registraton failed. Try again.")
      console.log(err)
    }

  };

  // ---------------- LOGIN FORM ----------------
  if (mode === "login") {
    return (
      <StarryBackground>
        <div className={cx("column", styles["login-register-form"])}>
          <h1>Login</h1>

          <form onSubmit={handleLogin} className="column">
            <label>
              Email
              <input
                type="login"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </label>

            <ErrorWindow
              message={error}
              onClose={() => setError(null)}
            />

            <button className="pixel-corners" type="submit">Log in</button>


            <p>Don’t have an account?</p>
            <p className="clickable-text" onClick={() => setMode("register")}>
              Register
            </p>

          </form>
        </div>
      </StarryBackground>
    );
  }

  // ---------------- REGISTER FORM ----------------
  return (
    <StarryBackground>
      <div className={cx("column", styles["login-register-form"])}>
        <h1>Register</h1>

        <form onSubmit={handleRegister} className="column">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e-mail"
              required
            />
          </label>

          <label>
            Username
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>

          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>

          <ErrorWindow
            message={error}
            onClose={() => setError(null)}
          />

          <button className="pixel-corners" type="submit">Register</button>

          <p>
            Already have an account?</p>
          <p className="clickable-text" onClick={() => setMode("login")}>
            Back to login
          </p>

        </form>
      </div>
    </StarryBackground>
  );
}
