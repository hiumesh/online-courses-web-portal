import { faker } from "@faker-js/faker";
import * as fs from "fs";
import * as path from "path";

import { getRandomIntInclusive } from "../utils";

export default function generateTopics(sub_categories: number[]) {
  const topics = [];
  const jsonO: {
    map_category_topics: { [index: number]: Set<number> | number[] };
    map_topic_categories: { [index: number]: Set<number> | number[] };
  } = { map_category_topics: {}, map_topic_categories: {} };

  for (let idx = 1; idx < 2100; idx++) {
    topics.push(
      `insert into public.topics (id, name) values (${idx}, '${faker.helpers
        .unique(faker.word.noun)
        .replace("'", " ")}');`
    );
    jsonO.map_topic_categories[idx] = new Set();
  }

  for (let idx = 1; idx < 4000; idx++) {
    let topic_id = getRandomIntInclusive(1, 2099);
    let sub_category_id =
      sub_categories[getRandomIntInclusive(1, sub_categories.length - 1)];
    if (jsonO.map_category_topics[sub_category_id]) {
      (jsonO.map_category_topics[sub_category_id] as Set<number>).add(topic_id);
    } else {
      jsonO.map_category_topics[sub_category_id] = new Set();
      (jsonO.map_category_topics[sub_category_id] as Set<number>).add(topic_id);
    }
    (jsonO.map_topic_categories[topic_id] as Set<number>).add(sub_category_id);
  }

  Object.keys(jsonO.map_category_topics).forEach(
    (key) =>
      (jsonO.map_category_topics[key as unknown as number] = Array.from(
        jsonO.map_category_topics[key as unknown as number]
      ))
  );

  Object.keys(jsonO.map_topic_categories).forEach(
    (key) =>
      (jsonO.map_topic_categories[key as unknown as number] = Array.from(
        jsonO.map_topic_categories[key as unknown as number]
      ))
  );

  fs.appendFileSync(path.join("./supabase", "seed.sql"), topics.join("\n"));
  console.log("Array of strings has been written to", "seed.sql");

  // fs.writeFileSync(
  //   path.join("./supabase/dummy_data/topics", "topics.json"),
  //   JSON.stringify(jsonO)
  // );
  // console.log("Array of strings has been written to", "topics.json");

  return jsonO;
}

if (require.main === module) {
  generateTopics([]);
}
