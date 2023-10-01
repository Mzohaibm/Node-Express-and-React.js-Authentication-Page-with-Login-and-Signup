const { username, password } = process.env;
const connectwithDbs =
  "mongodb+srv://" +
  username +
  ":" +
  password +
  "@cluster0.mwurla7.mongodb.net/user?retryWrites=true&w=majority";

module.exports = connectwithDbs;
