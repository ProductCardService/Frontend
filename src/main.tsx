import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import router from "./router/router.tsx";
import "./main.css"
import "./reset.css"
import {ToastContainer, Bounce} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
      <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
      />
      <RouterProvider router={router}/>
  </>,
)
