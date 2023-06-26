import * as fs from "fs";
import * as path from "path";

const liste = ["Latest", "Hot & New", "Highest Rated", "Bestseller", "New"];

export default function generateTags() {
  const tags: string[] = [];
  const jsonO: { tags: { [index: string]: number }; tagsIds: number[] } = {
    tags: {},
    tagsIds: [],
  };

  let id = 1;

  liste.forEach((t) => {
    tags.push(`insert into tags (id, name) values (${id}, '${t}');`);
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

if (require.main === module) {
  generateTags();
}
