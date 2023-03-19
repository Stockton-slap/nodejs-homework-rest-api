const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const dbUri = process.env.DB_HOST;

mongoose.set("strictQuery", true);

mongoose
  .connect(dbUri)
  .then(() =>
    app.listen(3000, () => {
      console.log("Database connection successful");
    })
  )
  .catch((e) => {
    console.log(`Server not running. Error message: ${e.message}`);
    process.exit(1);
  });
