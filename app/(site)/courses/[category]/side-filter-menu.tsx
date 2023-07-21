import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import FilterMenu from "@/components/filter-menu";
import SortFilter from "@/components/sort-filter";
import CoursesList from "./courses_list";

interface SideFilterMenuPropeTypes {
  category: string;
  searchParams: {
    rating: null | number;
    sub_categories?: null | string[];
    topics: null | string[];
    levels: null | string[];
    languages: null;
    price: null | string[];
    sort: string | null;
  };
}

const defaultFilters = {
  total_count: 0,
  rating: [
    {
      value: 4.5,
      count: 0,
      text: "4.5 & up",
    },
    {
      value: 4,
      count: 0,
      text: "4 & up",
    },
    {
      value: 3.5,
      count: 0,
      text: "3.5 & up",
    },
    {
      value: 3,
      count: 0,
      text: "3 & up",
    },
  ],
  topics: [
    {
      topic: "xx",
      topic_count: 4,
    },
  ],
  price: [
    {
      value: "PAID",
      label: "paid",
      count: 0,
    },
    {
      value: "FREE",
      label: "free",
      count: 0,
    },
  ],
  level: [
    {
      value: "ALL_LEVELS",
      label: "All Level",
      count: 0,
    },
    {
      value: "BEGINNER",
      label: "Beginner",
      count: 0,
    },
    {
      value: "INTERMEDIATE",
      label: "Intermediate",
      count: 0,
    },
    {
      value: "EXPERT",
      label: "Expert",
      count: 0,
    },
  ],
  sub_category: [
    {
      sub_category: "xxx",
      sub_category_count: 34,
    },
  ],
};

export default async function SideFilterMenu({
  category,
  searchParams,
}: SideFilterMenuPropeTypes) {
  const supabase = createServerComponentClient({ cookies });
  const dbFilter = {
    categories: [decodeURIComponent(category)],
    ...searchParams,
  };

  const { data, error } = await supabase.rpc("get_category_filters", dbFilter);

  if (error) {
    return <h1>Something went wrong!</h1>;
  }

  let filtersMetaData = defaultFilters;
  if (data["grouped"] && data["grouped"].length) {
    filtersMetaData["total_count"] = data["grouped"][0]["total_count"];
    filtersMetaData["rating"] = [
      {
        value: 4.5,
        count: data["grouped"][0]["rating_4_half_up"],
        text: "4.5 & up",
      },
      {
        value: 4,
        count: data["grouped"][0]["rating_4_up"],
        text: "4 & up",
      },
      {
        value: 3.5,
        count: data["grouped"][0]["rating_3_half_up"],
        text: "3.5 & up",
      },
      {
        value: 3,
        count: data["grouped"][0]["rating_3_up"],
        text: "3 & up",
      },
    ];
    filtersMetaData["price"] = [
      {
        value: "PAID",
        label: "Paid",
        count: data["grouped"][0]["paid"],
      },
      {
        value: "FREE",
        label: "Free",
        count: data["grouped"][0]["free"],
      },
    ];
    filtersMetaData["level"] = [
      {
        value: "ALL_LEVELS",
        label: "All Level",
        count: data["grouped"][0]["all_levels"],
      },
      {
        value: "BEGINNER",
        label: "Beginner",
        count: data["grouped"][0]["beginner"],
      },
      {
        value: "INTERMEDIATE",
        label: "Intermediate",
        count: data["grouped"][0]["intermediate"],
      },
      {
        value: "EXPERT",
        label: "Expert",
        count: data["grouped"][0]["expert"],
      },
    ];
  }
  if (data["topics"]) filtersMetaData["topics"] = data["topics"];
  if (data["sub_category"])
    filtersMetaData["sub_category"] = data["sub_category"];
  return (
    <div>
      <div>
        <div className="flex justify-between items-stretch h-14">
          <SortFilter sort={searchParams.sort} />
          <span className="text-lg font-bold text-gray-400 flex items-center">
            {filtersMetaData.total_count} results
          </span>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-64">
          <FilterMenu
            filtersMetaData={filtersMetaData}
            searchParams={searchParams}
          />
        </div>

        <div className="flex-1 mt-2">
          <CoursesList category={category} searchParams={searchParams} />
        </div>
      </div>
    </div>
  );
}
