import Header from "../components/Header";
import "../styles/globals.css";
import "antd/dist/antd.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <div className="h-screen snap-y snap-mandatory overflow-scroll z-0 ">
        <ToastContainer position="top-center" />
        <Header />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
