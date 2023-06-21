"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var path = require("path");
var fs = require("fs");
var category_json_1 = require("../category/category.json");
var utils_1 = require("../utils");
var users_json_1 = require("../users/users.json");
var c_index = 1;
function createRandomCourse() {
    var randomCategoryIndex = (0, utils_1.getRandomIntInclusive)(0, category_json_1.categories.length - 1);
    var randomSubCategoryIndex = (0, utils_1.getRandomIntInclusive)(0, category_json_1.categories[randomCategoryIndex].sub_categories.length - 1);
    var instructors = faker_1.faker.helpers.multiple(function () { return users_json_1.creators[(0, utils_1.getRandomIntInclusive)(0, users_json_1.creators.length - 1)]; }, { count: (0, utils_1.getRandomIntInclusive)(1, 3) });
    return {
        id: c_index++,
        image: faker_1.faker.image.urlPicsumPhotos({ width: 1920, height: 1080 }),
        title: faker_1.faker.word.words({ count: { max: 10, min: 5 } }).replace("'", " "),
        short_description: faker_1.faker.lorem.paragraph().replace("'", " "),
        category: category_json_1.categories[randomCategoryIndex].id,
        sub_category: category_json_1.categories[randomCategoryIndex].sub_categories[randomSubCategoryIndex],
        long_description: faker_1.faker.lorem.paragraphs(5).replace("'", " "),
        requirements: faker_1.faker.lorem.paragraph().replace("'", " "),
        course_purpose: faker_1.faker.lorem.paragraph().replace("'", " "),
        language: faker_1.faker.helpers.arrayElement(["english", "hindi", "sanakrit"]),
        course_promises: faker_1.faker.helpers.multiple(function () { return faker_1.faker.lorem.paragraph().replace("'", " "); }, {
            count: { min: 20, max: 30 },
        }),
        instructors: instructors.filter(function (i, idx) { return instructors.indexOf(i) === idx; }),
        enrollment: faker_1.faker.helpers.arrayElements(users_json_1.users.map(function (u) { return u.user_id; }), { min: 50, max: 200 }),
    };
}
function generateCourses() {
    var courses = [];
    var _loop_1 = function (index) {
        var course = createRandomCourse();
        courses.push("insert into courses (id, image, title, short_description, category, sub_category, long_description, requirements, course_purpose, language, course_promises) values (".concat(course.id, ",'").concat(course.image, "', '").concat(course.title, "','").concat(course.short_description, "','").concat(course.category, "','").concat(course.sub_category, "','").concat(course.long_description, "','").concat(course.requirements, "','").concat(course.course_purpose, "','").concat(course.language, "','").concat(JSON.stringify(course.course_promises), "');"));
        course.enrollment.forEach(function (u) {
            courses.push("insert into public.enrollment (course_id, user_id) values (".concat(course.id, ", '").concat(u, "');"));
        });
        course.instructors.forEach(function (i) {
            courses.push("insert into public.course_instructor (user_id, course_id) values ('".concat(i, "', ").concat(course.id, ");"));
        });
    };
    for (var index = 0; index < 2000; index++) {
        _loop_1(index);
    }
    fs.writeFileSync(path.join("./supabase/dummy_data/courses", "courses.sql"), courses.join("\n"));
    console.log("Array of strings has been written to", "courses.sql");
}
exports.default = generateCourses;
if (require.main === module) {
    generateCourses();
}
