import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { CourseType } from "@/components/courses_list";
import RatingStar from "@/components/rating-star";

interface CoursePagePropeTypes {
  params: {
    Id: string;
  };
}

export default async function CoursePage({ params }: CoursePagePropeTypes) {
  const supabase = createServerComponentClient({ cookies });

  const { data: resData, error } = await supabase
    .from("courses")
    .select(`*, category (name), sub_category(name)`)
    .eq("id", params.Id)
    .limit(1)
    .single();

  const data = resData as CourseType;
  console.log(data);
  return (
    <main>
      <div className="p-3 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-purple-500">
            <span>{(data.category as { name: string }).name}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="fill-white stroke-white scale-125"
            >
              <path d="m14.83 11.29l-4.24-4.24a1 1 0 0 0-1.42 0a1 1 0 0 0 0 1.41L12.71 12l-3.54 3.54a1 1 0 0 0 0 1.41a1 1 0 0 0 .71.29a1 1 0 0 0 .71-.29l4.24-4.24a1 1 0 0 0 0-1.42Z"></path>
            </svg>
            <span>{(data.sub_category as { name: string }).name}</span>
          </div>
          <h1 className="text-4xl text-white font-bold max-w-2xl mb-4">
            {data.title}
          </h1>
          <p className="text-lg text-white font-medium max-w-2xl">
            {data.short_description}
          </p>
          <div className="flex gap-3">
            <div className="flex gap-1">
              <span className="text-lg font-bold text-orange-500">
                {data.avg_rating}
              </span>
              <RatingStar rating={data.avg_rating}> </RatingStar>
            </div>
            <span className="text-lg text-purple-400 underline">
              ({data.review_count} ratings)
            </span>
            <span className="text-lg text-white">
              {data.enrollment_count} students
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
