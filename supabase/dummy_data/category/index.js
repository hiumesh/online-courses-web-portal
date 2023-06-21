"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var fake_data_json_1 = require("../../../lib/fake-data.json");
function generateCategory() {
    var jsonO = { categories: [], sub_categories: [] };
    var categories = [];
    var sub_categories = [];
    var category_id = 1;
    var sub_category_id = 1;
    fake_data_json_1.Categories.forEach(function (c, cIdx) {
        var t = {
            id: category_id,
            name: c.name,
            sub_categories: [],
        };
        categories.push("insert into public.category (id, name) values(".concat(category_id, ", '").concat(c.name, "');"));
        c.subCategories.forEach(function (sc, scIdx) {
            sub_categories.push("insert into public.sub_category (id, name, category_id) values(".concat(sub_category_id, ", '").concat(sc.name, "', ").concat(category_id, ");"));
            t.sub_categories.push(sub_category_id++);
        });
        category_id++;
        jsonO.categories.push(t);
        jsonO.sub_categories = jsonO.sub_categories.concat(t.sub_categories);
    });
    fs.writeFileSync(path.join("./supabase/dummy_data/category", "category.sql"), categories.join("\n").concat("\n", sub_categories.join("\n")));
    console.log("Array of strings has been written to", "category.sql");
    fs.writeFileSync(path.join("./supabase/dummy_data/category", "category.json"), JSON.stringify(jsonO));
    console.log("Array of strings has been written to", "category.json");
}
exports.default = generateCategory;
if (require.main === module) {
    generateCategory();
}
