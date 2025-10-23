import { useNavigate } from "react-router-dom";

export default function GameSelect() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Select Game</h1>

            <div onClick={() => navigate("/game/firstgame")}>game 1</div>
            <div onClick={() => navigate("/game/secondgame")}>game 2</div>
        </div>
    );
}
