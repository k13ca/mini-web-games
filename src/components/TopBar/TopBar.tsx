import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/UserStore"
import { cx } from "../../utils/cx"
import styles from "./TopBar.module.css"


export default function TopBar() {
    const navigate = useNavigate();
    const username = useUserStore((store) => store.username)
    return (
        <div className={cx(styles["top-bar"], "row")}>
            <div className="row">
                <p>coins</p>
                <p>37</p>
            </div>
            <div className="row">

                <h3>{username}</h3>

                <button name="login" onClick={() => navigate("/login")}>Login</button>
            </div>

        </div>
    )
}
