import {createBrowserRouter} from "react-router-dom";
import CardListPage from "../pages/card-list.tsx";
import EditCardPage from "../pages/edit-card.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <CardListPage />
    },
    {
        path: "/cards",
        element: <CardListPage />
    },
    {
        path: "/cards/:cardId",
        element: <EditCardPage />
    },
]);

export default router;