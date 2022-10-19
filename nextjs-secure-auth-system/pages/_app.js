import Header from "../components/Header";
import "../styles/globals.css";
import "antd/dist/antd.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyApp({ Component, pageProps }) {
  return (
    <div className=" h-screen snap-y snap-mandatory overflow-scroll z-0 ">
    <ToastContainer position="top-center"/>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
