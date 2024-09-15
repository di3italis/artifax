// router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Home from "../components/Home";
import AllFax from "../components/AllFax";
import ArtId from "../components/ArtId";
import CreateFax from "../components/CreateFax";
import ErrorPage from "../components/ErrorPage";
import Layout from "./Layout";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "login",
                element: <LoginFormPage />,
            },
            {
                path: "signup",
                element: <SignupFormPage />,
            },
            {
                path: "artifax",
                element: <AllFax />,
            },
            {
                path: "artifax/:faxId",
                element: <ArtId />,
            },
            {
                path: "artifax/create",
                element: <CreateFax />
            },
            {
                path: "*",
                element: <ErrorPage />,
            },
        ],
    },
]);
