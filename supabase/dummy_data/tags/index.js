"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var liste = ["Latest", "Hot & New", "Highest Rated", "Bestseller", "New"];
function generateTags() {
    var tags = [];
    var jsonO = {
        tags: {},
        tagsIds: [],
    };
    var id = 1;
    liste.forEach(function (t) {
        tags.push("insert into tags (id, name) values (".concat(id, ", '").concat(t, "');"));
        jsonO.tagsIds.push(id);
        jsonO.tags[t] = id++;
    });
    fs.appendFileSync(path.join("./supabase", "seed.sql"), tags.join("\n"));
    console.log("Array of strings has been written to", "seed.sql");
    // fs.writeFileSync(
    //   path.join("./supabase/dummy_data/tags", "tags.json"),
    //   JSON.stringify(jsonO)
    // );
    // console.log("Array of strings has been written to", "tags.json");
    return jsonO;
}
exports.default = generateTags;
if (require.main === module) {
    generateTags();
}
