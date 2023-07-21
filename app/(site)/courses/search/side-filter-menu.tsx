"use client";

import FilterMenu from "@/components/filter-menu";
import SortFilter from "@/components/sort-filter";
import { ReactNode, useState } from "react";

interface SideFilterMenuPropeTypes {
  searchParams: {
    q: string;
    categories?: null;
    sub_categories?: null;
    rating: null | number;
    topics: null | string[];
    levels: null | string[];
    languages: null | string[];
    price: null | string[];
    sort: string | null;
  };
  children: ReactNode;
  filtersMetaData: any;
}

export default function SideFilterMenu({
  children,
  filtersMetaData,
  searchParams,
}: SideFilterMenuPropeTypes) {
  const [filterMenuVisible, setFilterMenuVisible] = useState(true);
  const toggleFilterMenuHandler = () => {
    setFilterMenuVisible(!filterMenuVisible);
  };
  return (
    <div>
      <div>
        <div className="flex justify-between items-stretch box-content h-14 pb-3 border-b">
          <SortFilter
            sort={searchParams?.sort || "default"}
            toggleFilterMenu={toggleFilterMenuHandler}
          />
          <span className="text-lg font-bold text-gray-400 flex items-center">
            {filtersMetaData.total_count} results
          </span>
        </div>
      </div>
      <div className="flex">
        <div
          className={`transition-all overflow-hidden ${
            filterMenuVisible ? "w-64 mr-7" : "w-0 m-0 p-0"
          }`}
        >
          <div className="w-64">
            <FilterMenu
              filtersMetaData={filtersMetaData}
              searchParams={searchParams}
            />
          </div>
        </div>

        <div className="flex-1 mt-2">{children}</div>
      </div>
    </div>
  );
}
