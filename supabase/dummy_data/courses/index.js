"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var path = require("path");
var fs = require("fs");
// import { categories } from "../category/category.json";
var utils_1 = require("../utils");
var c_index = 1;
function createRandomCourse(categories, users, creators) {
    var randomCategoryIndex = (0, utils_1.getRandomIntInclusive)(0, categories.length - 1);
    var randomSubCategoryIndex = (0, utils_1.getRandomIntInclusive)(0, categories[randomCategoryIndex].sub_categories.length - 1);
    var instructors = faker_1.faker.helpers.multiple(function () { return creators[(0, utils_1.getRandomIntInclusive)(0, creators.length - 1)]; }, { count: (0, utils_1.getRandomIntInclusive)(1, 3) });
    var is_paid = faker_1.faker.helpers.arrayElement(["PAID", "FREE"]);
    return {
        id: c_index++,
        image: faker_1.faker.image.urlPicsumPhotos({ width: 1920, height: 1080 }),
        title: faker_1.faker.word.words({ count: { max: 10, min: 5 } }).replace("'", " "),
        short_description: faker_1.faker.lorem.paragraph().replace("'", " "),
        category: categories[randomCategoryIndex].id,
        sub_category: categories[randomCategoryIndex].sub_categories[randomSubCategoryIndex],
        level: faker_1.faker.helpers.arrayElement([
            "ALL_LEVELS",
            "BEGINNER",
            "INTERMEDIATE",
            "EXPERT",
        ]),
        is_paid: is_paid,
        price: is_paid === "PAID" ? (0, utils_1.getRandomIntInclusive)(20, 100) : 0,
        long_description: faker_1.faker.lorem.paragraphs(5).replace("'", " "),
        requirements: faker_1.faker.lorem.paragraph().replace("'", " "),
        course_purpose: faker_1.faker.lorem.paragraph().replace("'", " "),
        language: faker_1.faker.helpers.arrayElement([
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
        course_promises: faker_1.faker.helpers.multiple(function () { return faker_1.faker.lorem.paragraph().replace("'", " "); }, {
            count: { min: 20, max: 30 },
        }),
        instructors: instructors.filter(function (i, idx) { return instructors.indexOf(i) === idx; }),
        enrollment: faker_1.faker.helpers.arrayElements(users.map(function (u) { return u.user_id; }), { min: 50, max: 200 }),
        reviewers: faker_1.faker.helpers.arrayElements(users.map(function (u) { return u.user_id; }), { min: 10, max: 20 }),
    };
}
function generateCourses(categories, users, creators, tagsIds, topics) {
    var courses = [];
    var courseTags = new Set();
    var _loop_1 = function (index) {
        var course = createRandomCourse(categories, users, creators);
        courses.push("insert into courses (id, image, title, short_description, category, sub_category, level, is_paid, long_description, requirements, course_purpose, language, course_promises) values (".concat(course.id, ",'").concat(course.image, "', '").concat(course.title, "','").concat(course.short_description, "','").concat(course.category, "','").concat(course.sub_category, "', '").concat(course.level, "', '").concat(course.is_paid, "','").concat(course.long_description, "','").concat(course.requirements, "','").concat(course.course_purpose, "','").concat(course.language, "','").concat(JSON.stringify(course.course_promises), "');"));
        if (course.is_paid) {
            courses.push("insert into public.price (course_id, amount) values (".concat(course.id, ", ").concat(course.price, ");"));
        }
        course.enrollment.forEach(function (u) {
            courses.push("insert into public.enrollment (course_id, user_id) values (".concat(course.id, ", '").concat(u, "');"));
        });
        course.instructors.forEach(function (i) {
            courses.push("insert into public.course_instructor (user_id, course_id) values ('".concat(i, "', ").concat(course.id, ");"));
        });
        if (topics[course.sub_category]) {
            faker_1.faker.helpers
                .arrayElements(topics[course.sub_category])
                .forEach(function (t) {
                return courses.push("insert into public.course_topics (topic_id, course_id) values (".concat(t, ", ").concat(course.id, ");"));
            });
        }
        for (var i = 0; i < course.reviewers.length; i++) {
            courses.push("insert into public.course_review (rating, user_id, course_id, body) values (".concat((0, utils_1.generateRandomRating)().toPrecision(2), ", '").concat(course.reviewers[i], "', ").concat(course.id, ", '").concat(faker_1.faker.lorem.paragraph(), "');"));
        }
    };
    for (var index = 0; index < 2000; index++) {
        _loop_1(index);
    }
    for (var idx = 0; idx < 500; idx++) {
        courseTags.add("insert into public.course_tags (tag_id, course_id) values (".concat(tagsIds[(0, utils_1.getRandomIntInclusive)(0, tagsIds.length - 1)], ", ").concat((0, utils_1.getRandomIntInclusive)(1, 1999), ");"));
    }
    fs.appendFileSync(path.join("./supabase", "seed.sql"), courses.join("\n").concat("\n", Array.from(courseTags).join("\n")));
    console.log("Array of strings has been written to", "seed.sql");
}
exports.default = generateCourses;
if (require.main === module) {
    // generateCourses();
}
