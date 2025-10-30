import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/UserStore";
import { cx } from "../../utils/cx";
import styles from "./TopBar.module.css";
import { useAuthStore } from "../../store/AuthStore";

export default function TopBar() {
  const navigate = useNavigate();
  const username = useUserStore((store) => store.username);
  const logout = useAuthStore((store) => store.logout);
  const user = useAuthStore((store) => store.user);
  return (
    <div className={cx(styles["top-bar"], "row")}>
      <div className="row">
        <p>coins</p>
        <p>37</p>
      </div>
      <div className="row">
        {user ? (
          <>
            <h3>{user.displayName}</h3>
            <button name="logout" onClick={() => logout()}>
              Logout
            </button>
          </>
        ) : (
          <>
            <h3>{username}</h3>
            <button className="pixel-corners--wrapper" name="login" onClick={() => navigate("/login")}>
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
