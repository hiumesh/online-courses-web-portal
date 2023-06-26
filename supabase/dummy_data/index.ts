import generateCategory from "./category";
import genearteUsers from "./users";
import generateCourses from "./courses";
import generateTopics from "./topics";
import generateTags from "./tags";

const usersObj = genearteUsers();
const tagsObj = generateTags();
const categoriesObj = generateCategory();
const topicsObj = generateTopics(categoriesObj.sub_categories);
generateCourses(
  categoriesObj.categories,
  usersObj.users,
  usersObj.creators,
  tagsObj.tagsIds,
  topicsObj.map_category_topics
);
