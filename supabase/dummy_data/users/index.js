"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var fs = require("fs");
var path = require("path");
function createRandomUsers() {
    var firstName = faker_1.faker.person.firstName().replace("'", " ");
    var lastName = faker_1.faker.person.lastName().replace("'", " ");
    var username = faker_1.faker.internet.userName({ firstName: firstName, lastName: lastName });
    var email = faker_1.faker.helpers.unique(faker_1.faker.internet.email, [
        firstName,
        lastName,
    ]);
    return {
        uuid: faker_1.faker.string.uuid(),
        avatar: faker_1.faker.image.avatar(),
        email: email,
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: "uswag007",
        account_type: faker_1.faker.helpers.arrayElement(["default", "creater"]),
    };
}
function genearteUsers() {
    var users = [];
    var jsonO = { users: [], creators: [] };
    for (var index = 0; index < 1000; index++) {
        var user = createRandomUsers();
        var q = "select public.create_user('".concat(user.uuid, "', '").concat(user.username, "', '").concat(user.email, "', '").concat(user.password, "', '").concat(user.avatar, "', '").concat(user.firstName, "', '").concat(user.lastName, "', '").concat(user.account_type, "');");
        users.push(q);
        jsonO.users.push({ user_id: user.uuid, account_type: user.account_type });
        if (user.account_type === "creater") {
            jsonO.creators.push(user.uuid);
        }
    }
    fs.writeFileSync(path.join("./supabase/dummy_data/users", "users.sql"), users.join("\n"));
    console.log("Array of strings has been written to", "user.sql");
    fs.writeFileSync(path.join("./supabase/dummy_data/users", "users.json"), JSON.stringify(jsonO));
    console.log("Array of strings has been written to", "users.json");
}
exports.default = genearteUsers;
if (require.main === module) {
    genearteUsers();
}
