import "../App.css";
import Navbar from "../layouts/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../layouts/Sidebar";
import Footer from "../layouts/Footer";
import Dashboard from "../pages/Dashboard";
import { useState } from "react";
import Product from "../pages/product/Product";
import { Outlet } from "react-router-dom";
//  import BasicExampleDataGrid from "../pages/Listeclient";
function App() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="App">      
    {isOpen && <Sidebar setIsOpen={setIsOpen} />}

      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <div style={{ paddingLeft: isOpen ? 300 : 0, paddingTop: 70 }}>
        <Outlet />
        <br/><br/><br/>
      {/* < BasicExampleDataGrid/> */}
      </div>
      <Footer isOpen={isOpen} />
    </div>
  );
}

export default App;
