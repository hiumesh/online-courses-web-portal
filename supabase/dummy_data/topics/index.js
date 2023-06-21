"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var fs = require("fs");
var path = require("path");
var category_json_1 = require("../category/category.json");
var utils_1 = require("../utils");
function generateTopics() {
    var topics = [];
    var jsonO = {};
    var id = 1;
    for (var index = 0; index < category_json_1.sub_categories.length; index++) {
        var range = (0, utils_1.getRandomIntInclusive)(10, 22);
        var t = [];
        for (var x = 0; x < range; x++) {
            t.push(id);
            var q = "insert into topics (id, name, sub_category) values (".concat(id++, ", '").concat(faker_1.faker.string.alphanumeric({ length: { min: 10, max: 15 } }), "', ").concat(category_json_1.sub_categories[index], ");");
            topics.push(q);
        }
        jsonO[category_json_1.sub_categories[index]] = t;
    }
    fs.writeFileSync(path.join("./supabase/dummy_data/topics", "topics.sql"), topics.join("\n"));
    console.log("Array of strings has been written to", "topics.sql");
    fs.writeFileSync(path.join("./supabase/dummy_data/topics", "topics.json"), JSON.stringify(jsonO));
    console.log("Array of strings has been written to", "topics.json");
}
exports.default = generateTopics;
if (require.main === module) {
    generateTopics();
}
