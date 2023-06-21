import { faker } from "@faker-js/faker";
import * as path from "path";
import * as fs from "fs";

import { categories } from "../category/category.json";
import { getRandomIntInclusive } from "../utils";
import { users, creators } from "../users/users.json";

interface Course {
  id: number;
  image: string;
  title: string;
  short_description: string;
  category: number;
  sub_category: number;
  long_description: string;
  requirements: string;
  course_purpose: string;
  language: string;
  course_promises: string[];
  instructors: string[];
  enrollment: string[];
}

let c_index = 1;

function createRandomCourse(): Course {
  const randomCategoryIndex = getRandomIntInclusive(0, categories.length - 1);
  const randomSubCategoryIndex = getRandomIntInclusive(
    0,
    categories[randomCategoryIndex].sub_categories.length - 1
  );
  const instructors = faker.helpers.multiple(
    () => creators[getRandomIntInclusive(0, creators.length - 1)],
    { count: getRandomIntInclusive(1, 3) }
  );
  return {
    id: c_index++,
    image: faker.image.urlPicsumPhotos({ width: 1920, height: 1080 }),
    title: faker.word.words({ count: { max: 10, min: 5 } }).replace("'", " "),
    short_description: faker.lorem.paragraph().replace("'", " "),
    category: categories[randomCategoryIndex].id,
    sub_category:
      categories[randomCategoryIndex].sub_categories[randomSubCategoryIndex],
    long_description: faker.lorem.paragraphs(5).replace("'", " "),
    requirements: faker.lorem.paragraph().replace("'", " "),
    course_purpose: faker.lorem.paragraph().replace("'", " "),
    language: faker.helpers.arrayElement(["english", "hindi", "sanakrit"]),
    course_promises: faker.helpers.multiple(
      () => faker.lorem.paragraph().replace("'", " "),
      {
        count: { min: 20, max: 30 },
      }
    ),
    instructors: instructors.filter((i, idx) => instructors.indexOf(i) === idx),
    enrollment: faker.helpers.arrayElements(
      users.map((u) => u.user_id),
      { min: 50, max: 200 }
    ),
  };
}

export default function generateCourses() {
  const courses = [];

  for (let index = 0; index < 2000; index++) {
    const course = createRandomCourse();
    courses.push(
      `insert into courses (id, image, title, short_description, category, sub_category, long_description, requirements, course_purpose, language, course_promises) values (${
        course.id
      },'${course.image}', '${course.title}','${course.short_description}','${
        course.category
      }','${course.sub_category}','${course.long_description}','${
        course.requirements
      }','${course.course_purpose}','${course.language}','${JSON.stringify(
        course.course_promises
      )}');`
    );

    course.enrollment.forEach((u) => {
      courses.push(
        `insert into public.enrollment (course_id, user_id) values (${course.id}, '${u}');`
      );
    });

    course.instructors.forEach((i) => {
      courses.push(
        `insert into public.course_instructor (user_id, course_id) values ('${i}', ${course.id});`
      );
    });
  }

  fs.writeFileSync(
    path.join("./supabase/dummy_data/courses", "courses.sql"),
    courses.join("\n")
  );
  console.log("Array of strings has been written to", "courses.sql");
}

if (require.main === module) {
  generateCourses();
}
