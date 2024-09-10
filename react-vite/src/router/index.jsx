// router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import AllFax from "../components/AllFax";
import Layout from "./Layout";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <h1>Welcome!</h1>,
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
            // {
            //     path: "artifax/:id",
            //     element: <ArtId />,
            // }
        ],
    },
]);
