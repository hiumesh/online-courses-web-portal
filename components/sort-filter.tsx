"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortFilterPropeTypes {
  searchParams: {
    rating: null | number;
    sub_categories: null | string[];
    topics: null | string[];
    levels: null | string[];
    languages: null;
    price: null | string[];
    sort: null | string;
  };
}

export default function SortFilter({ searchParams: sp }: SortFilterPropeTypes) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const coursesSortHandler = (value: string) => {
    const qq: string[] = [];
    if (searchParams.has("sort")) {
      searchParams.forEach((value, key) => {
        if (key !== "sort") qq.push(`${key}=${value}`);
      });
      router.replace(pathname + `?${qq.join("&")}&sort=${value}`);
    } else {
      router.replace(pathname + `?${searchParams.toString()}&sort=${value}`);
    }
  };

  const clearFilterHandler = () => {
    router.replace(pathname);
  };

  const clearFilters =
    searchParams.has("rating") ||
    searchParams.has("topics") ||
    searchParams.has("sub_category") ||
    searchParams.has("levels") ||
    searchParams.has("price");

  return (
    <div className="flex gap-2">
      <button className="flex gap-2 items-center border bg-slate-100 px-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"
          />
        </svg>
        Filter
      </button>
      <Select
        onValueChange={coursesSortHandler}
        defaultValue={sp?.sort || undefined}
      >
        <SelectTrigger className="bg-slate-100 px-3 border rounded-none h-full">
          <SelectValue
            placeholder="Sort By"
            // placeholder={
            //   <div className="flex flex-col items-start pr-2">
            //     <span className="text-sm">Sort by</span>
            //     <span>{}</span>
            //   </div>
            // }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="mostpop">Most Popular</SelectItem>
          <SelectItem value="high">Higest Rated</SelectItem>
          <SelectItem value="new">Newest</SelectItem>
        </SelectContent>
      </Select>
      {clearFilters && (
        <button onClick={clearFilterHandler} className="text-base font-medium">
          Clear Filters
        </button>
      )}
    </div>
  );
}
