import { faker } from "@faker-js/faker";
import * as fs from "fs";
import * as path from "path";

import { sub_categories } from "../category/category.json";
import { getRandomIntInclusive } from "../utils";

export default function generateTopics() {
  const topics = [];
  const jsonO: { [index: number]: number[] } = {};

  let id = 1;

  for (let index = 0; index < sub_categories.length; index++) {
    let range = getRandomIntInclusive(10, 22);
    let t = [];
    for (let x = 0; x < range; x++) {
      t.push(id);
      const q = `insert into topics (id, name, sub_category) values (${id++}, '${faker.string.alphanumeric(
        { length: { min: 10, max: 15 } }
      )}', ${sub_categories[index]});`;
      topics.push(q);
    }
    jsonO[sub_categories[index]] = t;
  }

  fs.writeFileSync(
    path.join("./supabase/dummy_data/topics", "topics.sql"),
    topics.join("\n")
  );
  console.log("Array of strings has been written to", "topics.sql");
  fs.writeFileSync(
    path.join("./supabase/dummy_data/topics", "topics.json"),
    JSON.stringify(jsonO)
  );
  console.log("Array of strings has been written to", "topics.json");
}

if (require.main === module) {
  generateTopics();
}
