import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Pokemons from "./pages/Pokemons";
import About from "./pages/About";
import Pokemon from "./pages/Pokemon";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pokemonlar" element={<Pokemons />} />
        <Route path="/pokemonlar/:pokemonName" element={<Pokemon />} />
        <Route path="/hakkimizda" element={<About />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
