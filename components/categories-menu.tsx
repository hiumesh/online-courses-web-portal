"use client";

import { useState, useCallback } from "react";

interface CategoriesMenuPropeTypes {
  categories: {
    name: string;
    subCategories: {
      name: string;
    }[];
  }[];
}

export default function CategoriesMenu({
  categories,
}: CategoriesMenuPropeTypes) {
  const [mainCategory, setMainCategory] = useState<null | {
    name: string;
    subCategories: {
      name: string;
    }[];
  }>(null);
  const [subCategory, setSubCategory] = useState<null | {
    name: string;
    topics: {
      name: string;
    }[];
  }>(null);

  const mainCategoryChangeHandler = useCallback((c: any) => {
    setMainCategory(c);
    setSubCategory(null);
  }, []);

  const subCategoryChangeHandler = useCallback((sc: any) => {
    setSubCategory(sc);
  }, []);

  return (
    <div className="flex shadow-trello bg-white rounded w-max">
      <ul className="p-3">
        {categories.map((c) => (
          <li
            className={`flex items-center justify-between my-2 gap-20 hover:text-primary-blue hover:cursor-pointer text-sm ${
              c.name == mainCategory?.name && "text-primary-blue"
            }`}
            key={c?.name}
            onMouseOver={() => mainCategoryChangeHandler(c)}
            onClick={() => mainCategoryChangeHandler(c)}
          >
            {c.name}
            {c.subCategories.length && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m9 5l6 7l-6 7"
                />
              </svg>
            )}
          </li>
        ))}
      </ul>
      {mainCategory?.subCategories.length ? (
        <ul className="border-l p-3">
          {mainCategory?.subCategories?.map((c) => (
            <li
              className={`flex items-center justify-between my-2 gap-14 hover:text-primary-blue hover:cursor-pointer text-sm ${
                c.name == subCategory?.name && "text-primary-blue"
              }`}
              key={c?.name}
              onMouseOver={() => subCategoryChangeHandler(c)}
            >
              {c.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m9 5l6 7l-6 7"
                />
              </svg>
            </li>
          ))}
        </ul>
      ) : null}
      {subCategory?.topics.length ? (
        <ul className="border-l p-3">
          <h2 className="text-base font-medium mb-3">Popular Topics</h2>
          {subCategory.topics?.map((c) => (
            <li
              className="flex items-center justify-between my-2 gap-14 hover:text-primary-blue hover:cursor-pointer text-sm "
              key={c?.name}
            >
              {c.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
