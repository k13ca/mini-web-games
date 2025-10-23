import TopBar from "../components/TopBar/TopBar";

type Props = { children: React.ReactNode };

export default function MainLayout({ children }: Props) {
    return (
        <div>
            <TopBar />
            {children}
        </div>
    );
}
