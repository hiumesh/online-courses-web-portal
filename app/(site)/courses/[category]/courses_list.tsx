import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { cookies } from "next/headers";
import Image from "next/image";
import RatingStar from "@/components/rating-star";
import CategoryTags from "@/components/category-tag";

interface CoursesListPropeTypes {
  category: string;
  searchParams: {
    rating: null | number;
    sub_categories: null | string[];
    topics: null | string[];
    levels: null | string[];
    languages: null;
    price: null | string[];
  };
}

interface CourseType {
  id: number;
  image: string;
  title: string;
  short_description: string;
  instructors: string;
  tags: string;
  is_paid: string;
  enrollment_count: number;
  avg_rating: number;
  review_count: number;
  level: string;
  amount: number;
}

export default async function CoursesList({
  category,
  searchParams,
}: CoursesListPropeTypes) {
  const supabase = createServerComponentClient({ cookies });
  const dbFilter = {
    categories: [decodeURIComponent(category)],
    ...searchParams,
    page_size: 20,
    page_number: 0,
  };

  const { data, error } = await supabase.rpc("get_courses_list", dbFilter);
  console.log(error?.message);
  if (error) {
    <h1>{error.message}</h1>;
  }

  return (
    <div className="flex flex-col gap-4">
      {(data as CourseType[])?.map((c) => (
        <CourseCard key={c.id} {...c} />
      ))}
    </div>
  );
}

function CourseCard({
  id,
  image,
  title,
  short_description,
  instructors,
  tags,
  is_paid,
  enrollment_count,
  avg_rating,
  review_count,
  level,
  amount,
}: CourseType) {
  return (
    <div className="flex gap-2">
      <div>
        <Image src={image} width={350} height={200} alt="image" />
      </div>
      <div className="flex-1">
        <h1 className="text-lg font-medium">{title}</h1>
        <p className="text-sm">{short_description}</p>
        <div>
          {instructors.split(", ").map((i) => (
            <Link href="#" key={i} className="text-xs text-slate-500">
              {i}&nbsp;
            </Link>
          ))}
        </div>
        <RatingStar rating={avg_rating}>
          {avg_rating}({review_count})
        </RatingStar>
        <p className="text-sm text-slate-500">
          {level.charAt(0).toUpperCase() + level.slice(1).toLowerCase()}(
          {enrollment_count})
        </p>
        <div className="relative -left-2 mt-2">
          {tags?.split(", ").map((t) => (
            <CategoryTags key={t}>{t}</CategoryTags>
          ))}
        </div>
      </div>
    </div>
  );
}
