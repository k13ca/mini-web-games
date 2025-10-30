import React, { useMemo, type ReactNode } from 'react';
import styles from "./StarryBackground.module.css";
import { cx } from '../../utils/cx';
import StarSvgUrl from "../../assets/backgroundStar.svg";

interface StarData {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    begin: number;
    minOpacity: number;
}

type StarProps = StarData;

interface StarryBackgroundProps {
    children?: ReactNode;
}

const getRandomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomFloat = (min: number, max: number): number =>
    parseFloat((Math.random() * (max - min) + min).toFixed(2));

const Star = React.memo(({ x, y, size, duration, begin, minOpacity }: StarProps) => (
    <g transform={`translate(${x}, ${y}) scale(${size / 10})`}>
        <image href={StarSvgUrl} x="0" y="0" height="2" aria-hidden="true" />
        <animate
            attributeName="opacity"
            values={`1;${minOpacity};1`}
            dur={`${duration}s`}
            repeatCount="indefinite"
            begin={`${begin}s`}
        />
    </g>
));

const StarryBackground = ({ children }: StarryBackgroundProps) => {
    const NUM_STARS = 200;

    const starData: StarData[] = useMemo(() => {
        const data: StarData[] = [];
        for (let i = 0; i < NUM_STARS; i++) {
            data.push({
                id: i,
                x: getRandomInt(-5, 105),
                y: getRandomInt(-5, 105),
                size: getRandomFloat(2, 10),
                duration: getRandomFloat(1.0, 3.5),
                begin: getRandomFloat(0.0, 3.5),
                minOpacity: getRandomFloat(0.1, 0.4),
            });
        }
        return data;
    }, [NUM_STARS]);

    return (
        <div className={cx(styles["starry-background-container"])}>
            <svg
                className={cx(styles["starry-background-stars"])}
                id="star-field-svg"
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid slice"
            >
                <g id="stars-group">
                    {starData.map(star => (
                        <Star key={star.id} {...star} />
                    ))}
                </g>
            </svg>

            <div className={cx(styles["starry-background-content"])}>
                {children}
            </div>
        </div>
    );
};

export default StarryBackground;
