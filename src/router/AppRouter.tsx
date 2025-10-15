import { Routes, Route } from "react-router-dom";

import AllRecipesPage from "../pages/AllRecipesPage";
import RecipePage from "../pages/RecipePage";
import SelectionPage from "../pages/SelectionPage";

const AppRouter = () => {
  return (
      <Routes>
        <Route path="/" element={<AllRecipesPage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/selection" element={<SelectionPage />} />
      </Routes>
  );
};

export default AppRouter;
