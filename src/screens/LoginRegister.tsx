import { useState } from "react";
import { cx } from "../utils/cx";
import styles from "../styles/LoginRegister.module.css"

export default function LoginRegister() {
    const [mode, setMode] = useState<"login" | "register">("login");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Logging in:", { login, password });
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Registering:", { email, password });
    };

    // ---------------- LOGIN FORM ----------------
    if (mode === "login") {
        return (
            <div className={cx("column", styles["login-register-form"])}>
                <h2>Login</h2>

                <form onSubmit={handleLogin}>
                    <label>
                        Login
                        <input
                            type="login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            placeholder="you@example.com"
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

                    <button type="submit">Log in</button>

                    <p>
                        Don’t have an account?
                        <button
                            type="button"
                            onClick={() => setMode("register")}
                        >
                            Register
                        </button>
                    </p>
                </form>
            </div>
        );
    }

    // ---------------- REGISTER FORM ----------------
    return (
        <div>
            <h2>Register</h2>

            <form onSubmit={handleRegister}>
                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                    />
                </label>

                <label>
                    Login
                    <input
                        type="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder="you@example.com"
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

                <button type="submit">Register</button>

                <p>
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => setMode("login")}
                    >
                        Back to login
                    </button>
                </p>
            </form>
        </div>
    );
}
