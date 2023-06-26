"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var fs = require("fs");
var path = require("path");
var utils_1 = require("../utils");
function generateTopics(sub_categories) {
    var topics = [];
    var subCategoryTopics = new Set();
    var topicsConnection = new Set();
    var jsonO = { map_category_topics: {}, map_topic_categories: {} };
    for (var idx = 1; idx < 2100; idx++) {
        topics.push("insert into public.topics (id, name) values (".concat(idx, ", '").concat(faker_1.faker.helpers
            .unique(faker_1.faker.word.noun)
            .replace("'", " "), "');"));
        jsonO.map_topic_categories[idx] = new Set();
    }
    for (var idx = 1; idx < 4000; idx++) {
        var topic_id = (0, utils_1.getRandomIntInclusive)(1, 2099);
        var topic_ids = Object.keys(jsonO.map_topic_categories);
        var sub_category_id = sub_categories[(0, utils_1.getRandomIntInclusive)(1, sub_categories.length - 1)];
        subCategoryTopics.add("insert into public.sub_category_topics (topic_id, sub_category_id) values (".concat(topic_id, ", ").concat(sub_category_id, ");"));
        topicsConnection.add("insert into public.topic_connections (from_id, to_id) values (".concat(topic_ids[(0, utils_1.getRandomIntInclusive)(0, topic_ids.length - 1)], ", ").concat(topic_ids[(0, utils_1.getRandomIntInclusive)(0, topic_ids.length - 1)], ");"));
        if (jsonO.map_category_topics[sub_category_id]) {
            jsonO.map_category_topics[sub_category_id].add(topic_id);
        }
        else {
            jsonO.map_category_topics[sub_category_id] = new Set();
            jsonO.map_category_topics[sub_category_id].add(topic_id);
        }
        jsonO.map_topic_categories[topic_id].add(sub_category_id);
    }
    Object.keys(jsonO.map_category_topics).forEach(function (key) {
        return (jsonO.map_category_topics[key] = Array.from(jsonO.map_category_topics[key]));
    });
    Object.keys(jsonO.map_topic_categories).forEach(function (key) {
        return (jsonO.map_topic_categories[key] = Array.from(jsonO.map_topic_categories[key]));
    });
    fs.appendFileSync(path.join("./supabase", "seed.sql"), topics
        .join("\n")
        .concat("\n", Array.from(subCategoryTopics).join("\n"), Array.from(topicsConnection).join("\n")));
    console.log("Array of strings has been written to", "seed.sql");
    // fs.writeFileSync(
    //   path.join("./supabase/dummy_data/topics", "topics.json"),
    //   JSON.stringify(jsonO)
    // );
    // console.log("Array of strings has been written to", "topics.json");
    return jsonO;
}
exports.default = generateTopics;
if (require.main === module) {
    generateTopics([]);
}
