import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GameSelect from "./screens/GameSelect";
import GameScreen from "./screens/GameScreen";
import RootLayout from "./layout/RootLayout";
import MainLayout from "./layout/MainLayoout";
import LoginRegister from "./screens/LoginRegister";


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <MainLayout><GameSelect /></MainLayout> },
      { path: "/game/:gameName", element: <MainLayout><GameScreen /></MainLayout> },
      { path: "/login", element: <LoginRegister /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}