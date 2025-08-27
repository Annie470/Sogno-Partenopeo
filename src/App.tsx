import "./assets/style/style.scss";
import NavSogno from "./components/NavSogno";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeContainer from "./components/HomeContainer";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavSogno />
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/write" element={<Contact/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
