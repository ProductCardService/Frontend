import {createBrowserRouter} from "react-router-dom";
import CardListPage from "../pages/card-list.tsx";
import CreateCardPage from "../pages/edit-or-create-card.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <CardListPage />
    },
    {
        path: "/create",
        element: <CreateCardPage />
    },
    {
        path: "/edit/:cardId",
        element: <CreateCardPage />
    }
]);

export default router;