import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import GameSelect from "./screens/GameSelect";
import GameScreen from "./screens/GameScreen";
import SplashScreen from "./screens/Splash";
import { Suspense } from "react";
import LoadingScreen from "./screens/Loading";


const router = createBrowserRouter([{
  path: "/",
  element: <GameSelect />,
  loader: SplashScreen,

},
{
  path: "/game/:gameName",
  element: <GameScreen />,
  loader: LoadingScreen,
}])


export default function App() {
  return (
    <Suspense fallback={<SplashScreen />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
