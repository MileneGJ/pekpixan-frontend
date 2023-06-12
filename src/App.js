import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/generalLayout.css";
import HomePage from "./components/HomePage";
import DogsPage from "./components/DogsPage";
import DogDetails from "./components/DogDetails";
import DisciplinesPage from "./components/DisciplinesPage";
import DisciplineDetails from "./components/DisciplineDetails";
import Header from "./components/Layout/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dogs" element={<DogsPage />} />
        <Route path="/disciplines" element={<DisciplinesPage />} />
        <Route
          path="/disciplines/:disciplineId"
          element={<DisciplineDetails />}
        />
        <Route path="/dogs/:dogId" element={<DogDetails />} />
        <Route path="/dogs/:dogId/disciplines" element={<DisciplinesPage />} />
        <Route
          path="/dogs/:dogId/disciplines/:disciplineId"
          element={<DisciplineDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
