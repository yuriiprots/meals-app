import { Routes, Route } from "react-router-dom";
import AllMealsPage from "../pages/all-meals-page";
import MealPage from "../pages/meal-page";
import SelectionPage from "../pages/selection-page";

const AppRouter = () => {

const routes = [
  { path: "/", element: <AllMealsPage /> },
  { path: "/recipe/:id", element: <MealPage /> },
  { path: "/selection", element: <SelectionPage /> },
];

  return (
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
  );
};

export default AppRouter;
