const jwt = "jsonwebtoken";

const value = {
    name: "ariz",
    accountnumber: 123123123
}

const token = jwt.sign(value, "secret")
console.log(token);
