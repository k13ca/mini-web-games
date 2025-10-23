
import { Outlet, useNavigation } from "react-router-dom";
import SplashScreen from "../screens/Splash";
import LoadingScreen from "../screens/Loading";

export default function RootLayout() {
    const navigation = useNavigation();

    if (navigation.state === "loading") {
        const path = window.location.pathname;
        if (path.startsWith("/game")) return <LoadingScreen />;
        return <SplashScreen />;
    }

    return <Outlet />;
}
