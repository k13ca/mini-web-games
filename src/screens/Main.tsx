import TopBar from "../components/TopBar/TopBar";

type Props = {
    children: React.ReactNode;
};

export default function Main({ children }: Props) {
    return (
        <div>
            <TopBar />
            {children}
        </div>
    )
}
