import { useState } from "react";
import { useGetCategoriesQuery } from "./features/api/mealApi";
import "./App.css";

function App() {
  const { data, isLoading } = useGetCategoriesQuery();

  if (isLoading) return <div>Завантаження API-даних...</div>;
  if (data)
    return <div>Дані завантажено. Категорій: {data.categories.length}</div>;

  return (
    <>
      <h1 className="text-3xl font-bold underline">Готово!!!</h1>
    </>
  );
}

export default App;
