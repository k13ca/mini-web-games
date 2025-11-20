import { useEffect, useState } from "react";
import { cx } from "../../utils/cx";
import styles from "./ErrorWindow.module.css"

interface ErrorWindowProps {
    message: string | null;
    onClose: () => void;
}

export default function ErrorWindow({ message, onClose }: ErrorWindowProps) {
    const [stage, setStage] = useState('hidden');

    useEffect(() => {
        if (message && stage === 'hidden') {
            setStage('opening');
            setTimeout(() => setStage('visible'), 800);
        } else if (!message && stage === 'visible') {
            setStage('closing');
            setTimeout(() => setStage('hidden'), 1200);
        }
    }, [message, stage]);

    if (stage === 'hidden') return null;

    return (
        <div className={cx(styles["error-window"], styles[stage])}>
            <button onClick={onClose} className={styles["close-btn"]}>X</button>

            <h2 className={cx(stage === "visible" ? styles["show"] : styles["hide"])}>
                ERROR_
            </h2>

            <p className={cx(stage === "visible" ? styles["show"] : styles["hide"])}>
                {message}
            </p>
        </div>
    )
}


