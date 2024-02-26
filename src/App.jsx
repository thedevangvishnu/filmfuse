import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import Details from "./pages/details/Details";
import Footer from "./components/footer/Footer";

import "./App.styles.scss";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/searchPage" element={<Search />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="/:mediaType/:id" element={<Details />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
