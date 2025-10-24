import { Routes, Route } from "react-router-dom";
import AllMealsPage from "../pages/all-meals-page";
import MealPage from "../pages/meal-page";
import SelectionPage from "../pages/selection-page";

const AppRouter = () => {
  return (
      <Routes>
        <Route path="/" element={<AllMealsPage />} />
        <Route path="/recipe/:id" element={<MealPage />} />
        <Route path="/selection" element={<SelectionPage />} />
      </Routes>
  );
};

export default AppRouter;
