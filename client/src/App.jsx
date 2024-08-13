import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { useSelector } from "react-redux";
import Footer from "./components/navbar/Footer";

export default function App() {
  return (
    <div>
      {/* header------- */}
      <div>
        <Navbar></Navbar>
      </div>
      {/* Main outlet------ */}
      <main className=" flex ">
        <div className="w-[18%]">
          <Sidebar></Sidebar>
        </div>
        <div className="w-[80%] p-5">
          <Outlet></Outlet>
        </div>
      </main>
      {/* footer---- */}
      <Footer/>
      <div></div>
    </div>
  );
}
