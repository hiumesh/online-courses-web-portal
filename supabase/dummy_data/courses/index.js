"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var path = require("path");
var fs = require("fs");
var utils_1 = require("../utils");
var markdownDescription = "**Welcome to the Marvelous World of Adventure and Wonder!**\n\nIn this mesmerizing universe of infinite possibilities, prepare to embark on an extraordinary journey that will captivate your imagination and thrill your senses. The Marvelous World of Adventure and Wonder is a place where dreams come to life, where heroes rise, and villains fall. Immerse yourself in the magical tapestry of narratives, where each tale is more enthralling than the last.\n\n**Unravel the Epic Tales**\n\nDiscover an extensive collection of epic tales that span across galaxies, dimensions, and timelines. From the courageous exploits of legendary superheroes to the cunning machinations of sinister supervillains, our diverse range of stories will leave you at the edge of your seat, craving for more. Whether you are a die-hard fan or new to the universe of Marvelous Adventure and Wonder, there s something for everyone.\n\n- Experience the valor of iconic heroes like **Captain Marvel**, **Spider-Man**, and **Black Panther**.\n- Embrace the complexity of morally ambiguous anti-heroes like **Deadpool** and **Venom**.\n\n**Enchanting Settings**\n\nVenture into extraordinary worlds that defy reality and imagination. From the bustling streets of New York City to the mystical realms of Asgard and Wakanda, each setting is meticulously crafted, transporting you into a fantastical experience like no other. Get ready to be **awestruck** by the jaw-dropping scenery and **awe-inspiring landscapes**.\n\n**Mind-bending Plots**\n\nPrepare for mind-bending plots that will challenge your perceptions of right and wrong. As the lines between good and evil blur, our tales take you on an emotional rollercoaster of triumphs, betrayals, and unexpected alliances. Brace yourself for **twists** that will leave you questioning everything you thought you knew.\n\n**Immersive Artwork**\n\nComplementing the enthralling narratives, immerse yourself in the mesmerizing artwork that adorns these pages. Our team of talented artists brings the characters and worlds to life, giving you a visual treat that enhances your reading experience. Lose yourself in the **intricate details** and **vibrant colors** that breathe life into each panel.\n\n**A Community of Enthusiasts**\n\nThe Marvelous World of Adventure and Wonder is not just a collection of stories; it s a vibrant community of enthusiasts. Engage in lively discussions, share fan theories, and connect with fellow readers who share your passion for all things marvelous. Be part of a community that celebrates **creativity** and **imagination**.\n\n**Your Journey Begins Here**\n\nSo, dear reader, fasten your seatbelt and get ready for the most thrilling ride of your life. The Marvelous World of Adventure and Wonder awaits your exploration. Whether you seek action, intrigue, romance, or heartwarming moments, our universe has it all.\n\nRemember, within these pages, anything is possible. Heroes will rise, villains will fall, and new legends will be born. Your adventure starts now! **Welcome to the Marvelous World of Adventure and Wonder!**";
var c_index = 1;
function createRandomCourse(categories, users, creators) {
    var randomCategoryIndex = (0, utils_1.getRandomIntInclusive)(0, categories.length - 1);
    var randomSubCategoryIndex = (0, utils_1.getRandomIntInclusive)(0, categories[randomCategoryIndex].sub_categories.length - 1);
    var instructors = faker_1.faker.helpers.multiple(function () { return creators[(0, utils_1.getRandomIntInclusive)(0, creators.length - 1)]; }, { count: (0, utils_1.getRandomIntInclusive)(1, 3) });
    var is_paid = faker_1.faker.helpers.arrayElement(["PAID", "FREE"]);
    var meta_data = {
        long_description: markdownDescription,
        requirements: faker_1.faker.helpers.multiple(function () { return faker_1.faker.lorem.paragraph().replace("'", " "); }, { count: { min: 5, max: 8 } }),
        whos_course: faker_1.faker.helpers.multiple(function () { return faker_1.faker.lorem.paragraph().replace("'", " "); }, { count: { min: 5, max: 8 } }),
        course_promises: faker_1.faker.helpers.multiple(function () { return faker_1.faker.lorem.paragraph().replace("'", " "); }, {
            count: { min: 20, max: 30 },
        }),
    };
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
        meta_data: meta_data,
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
        courses.push("insert into courses (id, image, title, short_description, category, sub_category, level, is_paid, language, meta_data) values (".concat(course.id, ",'").concat(course.image, "', '").concat(course.title, "','").concat(course.short_description, "','").concat(course.category, "','").concat(course.sub_category, "', '").concat(course.level, "', '").concat(course.is_paid, "','").concat(course.language, "','").concat(JSON.stringify(course.meta_data), "');"));
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
