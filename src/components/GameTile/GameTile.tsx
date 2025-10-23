
type GameTileProps = {
    gameName: string;
    coverPhoto: string;
}

export default function GameTile({ gameName, coverPhoto }: GameTileProps) {
    return (
        <div className="game-tile">
            <img src={coverPhoto}></img>
            <h2>{gameName}</h2>
        </div >
    )
}
