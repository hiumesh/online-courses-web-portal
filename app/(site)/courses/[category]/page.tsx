import SideFilterMenu from "./side-filter-menu";

interface CategoryPropeTypes {
  params: {
    category: string;
  };
  searchParams: {
    rating?: string;
    sub_category?: string | string[];
    topics?: string | string[];
    prices?: string | string[];
    levels?: string | string[];
    sort?: string;
  };
}

const processSearchQuery = (searchParams: {
  rating?: string;
  sub_category?: string | string[];
  topics?: string | string[];
  prices?: string | string[];
  levels?: string | string[];
  sort?: string;
}) => {
  const filters: {
    rating: null | number;
    sub_categories: null | string[];
    topics: null | string[];
    levels: null | string[];
    languages: null;
    price: null | string[];
    sort: null | string;
  } = {
    rating: null,
    sub_categories: null,
    topics: null,
    levels: null,
    languages: null,
    price: null,
    sort: null,
  };
  if (searchParams.rating)
    filters["rating"] = Number.parseFloat(searchParams.rating);
  if (searchParams.topics) {
    if (typeof searchParams.topics === "string")
      filters["topics"] = [searchParams.topics];
    else filters["topics"] = searchParams.topics;
  }

  if (searchParams.sub_category) {
    if (typeof searchParams.sub_category === "string")
      filters["sub_categories"] = [searchParams.sub_category];
    else filters["sub_categories"] = searchParams.sub_category;
  }

  if (searchParams.levels) {
    if (typeof searchParams.levels === "string")
      filters["levels"] = [searchParams.levels];
    else filters["levels"] = searchParams.levels;
  }

  if (searchParams.prices) {
    if (typeof searchParams.prices === "string")
      filters["price"] = [searchParams.prices];
    else filters["price"] = searchParams.prices;
  }

  if (searchParams.sort) filters["sort"] = searchParams.sort;

  return filters;
};

export default function Category({ params, searchParams }: CategoryPropeTypes) {
  const processedSearchParams = processSearchQuery(searchParams);

  return (
    <main className="max-w-7xl mx-auto p-3">
      <h1 className="text-4xl font-bold mb-2">
        {decodeURIComponent(params.category)} courses
      </h1>
      <SideFilterMenu
        category={decodeURIComponent(params.category)}
        searchParams={processedSearchParams}
      />
    </main>
  );
}
