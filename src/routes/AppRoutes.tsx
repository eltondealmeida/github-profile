import { Routes, Route } from "react-router-dom";
import HomePage from "../components/pages/home/HomePage";
import RepositoriesPage from "../components/pages/repositories/RepositoriesPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={"*" || "/home"} element={<HomePage />} />
      <Route path="/repositories/:id" element={<RepositoriesPage />} />
    </Routes>
  );
}
