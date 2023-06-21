import { faker } from "@faker-js/faker";
import * as fs from "fs";
import * as path from "path";

type AccountType = "default" | "creater";

interface User {
  uuid: string;
  avatar: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  account_type: AccountType;
}

function createRandomUsers(): User {
  const firstName = faker.person.firstName().replace("'", " ");
  const lastName = faker.person.lastName().replace("'", " ");
  const username = faker.internet.userName({ firstName, lastName });
  const email = faker.helpers.unique(faker.internet.email, [
    firstName,
    lastName,
  ]);

  return {
    uuid: faker.string.uuid(),
    avatar: faker.image.avatar(),
    email,
    username,
    firstName,
    lastName,
    password: "uswag007",
    account_type: faker.helpers.arrayElement(["default", "creater"]),
  };
}

export default function genearteUsers() {
  const users = [];
  const jsonO: {
    users: { user_id: string; account_type: string }[];
    creators: string[];
  } = { users: [], creators: [] };

  for (let index = 0; index < 1000; index++) {
    const user = createRandomUsers();
    const q = `select public.create_user('${user.uuid}', '${user.username}', '${user.email}', '${user.password}', '${user.avatar}', '${user.firstName}', '${user.lastName}', '${user.account_type}');`;
    users.push(q);
    jsonO.users.push({ user_id: user.uuid, account_type: user.account_type });
    if (user.account_type === "creater") {
      jsonO.creators.push(user.uuid);
    }
  }

  fs.writeFileSync(
    path.join("./supabase/dummy_data/users", "users.sql"),
    users.join("\n")
  );
  console.log("Array of strings has been written to", "user.sql");

  fs.writeFileSync(
    path.join("./supabase/dummy_data/users", "users.json"),
    JSON.stringify(jsonO)
  );
  console.log("Array of strings has been written to", "users.json");
}

if (require.main === module) {
  genearteUsers();
}
