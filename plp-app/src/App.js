import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import ProductsView from './components/ProductsView';
import Footer from './components/Footer';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/NXTwave_projects/plp-app">
        <Header />
        <Routes>
         <Route exact path="/" element={<Home />} />
         <Route exact path="/about" element={<About />} />
         <Route exact path="/product/:id" element={<ProductsView />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
