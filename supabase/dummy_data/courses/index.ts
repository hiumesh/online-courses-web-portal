import { faker } from "@faker-js/faker";
import * as path from "path";
import * as fs from "fs";

// import { categories } from "../category/category.json";
import { generateRandomRating, getRandomIntInclusive } from "../utils";
// import { users, creators } from "../users/users.json";
// import { tagsIds } from "../tags/tags.json";

interface Course {
  id: number;
  image: string;
  title: string;
  short_description: string;
  category: number;
  sub_category: number;
  level: string;
  is_paid: string;
  price: number;
  long_description: string;
  requirements: string;
  course_purpose: string;
  language: string;
  course_promises: string[];
  instructors: string[];
  enrollment: string[];
  reviewers: string[];
}

let c_index = 1;

function createRandomCourse(
  categories: {
    id: number;
    name: string;
    sub_categories: number[];
  }[],
  users: {
    user_id: string;
    account_type: string;
  }[],
  creators: string[]
): Course {
  const randomCategoryIndex = getRandomIntInclusive(0, categories.length - 1);
  const randomSubCategoryIndex = getRandomIntInclusive(
    0,
    categories[randomCategoryIndex].sub_categories.length - 1
  );
  const instructors = faker.helpers.multiple(
    () => creators[getRandomIntInclusive(0, creators.length - 1)],
    { count: getRandomIntInclusive(1, 3) }
  );
  let is_paid = faker.helpers.arrayElement(["PAID", "FREE"]);
  return {
    id: c_index++,
    image: faker.image.urlPicsumPhotos({ width: 1920, height: 1080 }),
    title: faker.word.words({ count: { max: 10, min: 5 } }).replace("'", " "),
    short_description: faker.lorem.paragraph().replace("'", " "),
    category: categories[randomCategoryIndex].id,
    sub_category:
      categories[randomCategoryIndex].sub_categories[randomSubCategoryIndex],
    level: faker.helpers.arrayElement([
      "ALL_LEVELS",
      "BEGINNER",
      "INTERMEDIATE",
      "EXPERT",
    ]),
    is_paid: is_paid,
    price: is_paid === "PAID" ? getRandomIntInclusive(20, 100) : 0,
    long_description: faker.lorem.paragraphs(5).replace("'", " "),
    requirements: faker.lorem.paragraph().replace("'", " "),
    course_purpose: faker.lorem.paragraph().replace("'", " "),
    language: faker.helpers.arrayElement([
      "English",
      "Hindi",
      "Sanskrit",
      "Spanish",
      "French",
      "German",
      "Italian",
      "Japanese",
      "Chinese",
      "Russian",
      "Other",
    ]),
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
    reviewers: faker.helpers.arrayElements(
      users.map((u) => u.user_id),
      { min: 10, max: 20 }
    ),
  };
}

export default function generateCourses(
  categories: {
    id: number;
    name: string;
    sub_categories: number[];
  }[],
  users: {
    user_id: string;
    account_type: string;
  }[],
  creators: string[],
  tagsIds: number[],
  topics: { [index: number]: Set<number> | number[] }
) {
  const courses = [];
  let courseTags = new Set();

  for (let index = 0; index < 2000; index++) {
    const course = createRandomCourse(categories, users, creators);
    courses.push(
      `insert into courses (id, image, title, short_description, category, sub_category, level, is_paid, long_description, requirements, course_purpose, language, course_promises) values (${
        course.id
      },'${course.image}', '${course.title}','${course.short_description}','${
        course.category
      }','${course.sub_category}', '${course.level}', '${course.is_paid}','${
        course.long_description
      }','${course.requirements}','${course.course_purpose}','${
        course.language
      }','${JSON.stringify(course.course_promises)}');`
    );

    if (course.is_paid) {
      courses.push(
        `insert into public.price (course_id, amount) values (${course.id}, ${course.price});`
      );
    }
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
    if (topics[course.sub_category]) {
      faker.helpers
        .arrayElements(topics[course.sub_category] as number[])
        .forEach((t) =>
          courses.push(
            `insert into public.course_topics (topic_id, course_id) values (${t}, ${course.id});`
          )
        );
    }

    for (let i = 0; i < course.reviewers.length; i++) {
      courses.push(
        `insert into public.course_review (rating, user_id, course_id, body) values (${generateRandomRating().toPrecision(
          2
        )}, '${course.reviewers[i]}', ${
          course.id
        }, '${faker.lorem.paragraph()}');`
      );
    }
  }

  for (let idx = 0; idx < 500; idx++) {
    courseTags.add(
      `insert into public.course_tags (tag_id, course_id) values (${
        tagsIds[getRandomIntInclusive(0, tagsIds.length - 1)]
      }, ${getRandomIntInclusive(1, 1999)});`
    );
  }

  fs.appendFileSync(
    path.join("./supabase", "seed.sql"),
    courses.join("\n").concat("\n", Array.from(courseTags).join("\n"))
  );
  console.log("Array of strings has been written to", "seed.sql");
}

if (require.main === module) {
  // generateCourses();
}
