import * as fs from "fs";
import * as path from "path";

import { Categories } from "../../../lib/fake-data.json";

export default function generateCategory() {
  const jsonO: {
    categories: { id: number; name: string; sub_categories: number[] }[];
    sub_categories: number[];
  } = { categories: [], sub_categories: [] };

  const categories: string[] = [];
  const sub_categories: string[] = [];

  let category_id = 1;
  let sub_category_id = 1;

  Categories.forEach((c, cIdx) => {
    let t: { id: number; name: string; sub_categories: number[] } = {
      id: category_id,
      name: c.name,
      sub_categories: [],
    };
    categories.push(
      `insert into public.category (id, name) values(${category_id}, '${c.name}');`
    );
    c.subCategories.forEach((sc, scIdx) => {
      sub_categories.push(
        `insert into public.sub_category (id, name, category_id) values(${sub_category_id}, '${sc.name}', ${category_id});`
      );
      t.sub_categories.push(sub_category_id++);
    });
    category_id++;

    jsonO.categories.push(t);
    jsonO.sub_categories = jsonO.sub_categories.concat(t.sub_categories);
  });

  fs.writeFileSync(
    path.join("./supabase/dummy_data/category", "category.sql"),
    categories.join("\n").concat("\n", sub_categories.join("\n"))
  );
  console.log("Array of strings has been written to", "category.sql");
  fs.writeFileSync(
    path.join("./supabase/dummy_data/category", "category.json"),
    JSON.stringify(jsonO)
  );
  console.log("Array of strings has been written to", "category.json");
}

if (require.main === module) {
  generateCategory();
}
