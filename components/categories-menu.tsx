"use client";

import { useState, useCallback } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

export interface SubCategory {
  id: any;
  name: any;
}

export interface Topics {
  id: any;
  name: any;
}

export interface Category {
  id: any;
  name: any;
  sub_category: SubCategory[];
}

interface CategoriesMenuPropeTypes {
  categories: Category[] | null;
}

export default function CategoriesMenu({
  categories,
}: CategoriesMenuPropeTypes) {
  const supabase = createClientComponentClient();
  const [mainCategory, setMainCategory] = useState<Category | null>(null);
  const [subCategory, setSubCategory] = useState<SubCategory | null>(null);
  const [topics, setTopics] = useState<{
    loading: boolean;
    data: Topics[] | null;
  }>({ loading: false, data: [] });

  const mainCategoryChangeHandler = useCallback((c: any) => {
    setMainCategory(c);
    setSubCategory(null);
  }, []);

  const subCategoryChangeHandler = useCallback(async (sc: SubCategory) => {
    setSubCategory(sc);
    setTopics({ ...topics, loading: true });
    const { data: xtopics, error } = await supabase
      .from("topics")
      .select("*")
      .eq("sub_category", sc.id)
      .limit(8);
    setTopics({ loading: false, data: xtopics });
  }, []);

  return (
    <div className="flex shadow-trello bg-white rounded w-max">
      <ul className="p-3">
        {categories?.map((c) => (
          <Link
            className={`flex items-center justify-between my-2 gap-20 hover:text-primary-blue hover:cursor-pointer text-sm ${
              c.name == mainCategory?.name && "text-primary-blue"
            }`}
            key={c?.name}
            onMouseOver={() => mainCategoryChangeHandler(c)}
            href={`/courses/${c.name}`}
          >
            {c.name}
            {c.sub_category.length && (
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
          </Link>
        ))}
      </ul>
      {mainCategory?.sub_category.length ? (
        <ul className="border-l p-3">
          {mainCategory?.sub_category?.map((c) => (
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
      {topics.data?.length ? (
        <ul className="border-l p-3">
          <h2 className="text-base font-medium mb-3">Popular Topics</h2>
          {topics.data?.map((c) => (
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
