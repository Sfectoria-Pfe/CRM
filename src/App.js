import './App.css';
import MyCard from './component/Home';
import VerticalNavbar from './component/Navbar';
import { Component } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Demande_devis from './component/page/demandedevis.js';
import NotFound from "./component/page/NotFound.js";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
    };
    this.changeSearchValue = this.changeSearchValue.bind(this);
  }

  changeSearchValue(e) {
    this.setState({ searchValue: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
      
          <Routes>
          <Route path="/" element={<VerticalNavbar searchValue={this.state.searchValue} changeValueSearch={this.changeSearchValue} />} />
            <Route path="/demandedevis" element={<Demande_devis />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <MyCard searchValue={this.state.searchValue} />
      </div>
    );
  }
}

export default App;
