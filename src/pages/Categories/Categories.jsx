import React from "react";
import { useGetCategoriesQuery } from "../../api/categories";
import Title from "../../components/Title";

const Categories = () => {
  const { data = [], isLoading } = useGetCategoriesQuery();

  console.log(data);
  return (
    <div>
      <Title>Categories</Title>
      {data.length > 0 &&
        data.map((category) => {
          return <div key={category.id}>{category.name}</div>;
        })}
    </div>
  );
};

export default Categories;
