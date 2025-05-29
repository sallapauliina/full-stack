const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

// const mongoose = require("mongoose");
// const app = require("./app");
// const config = require("./utils/config");
// const logger = require("./utils/logger");

// mongoose.set("strictQuery", false);

// logger.info("Connecting to:", config.MONGODB_URI);

// mongoose
//   .connect(config.MONGODB_URI)
//   .then(() => {
//     logger.info("Connected to MongoDB");
//     app.listen(config.PORT, () => {
//       logger.info(`Server running on port ${config.PORT}`);
//     });
//   })
//   .catch((error) => {
//     logger.error("error connecting to MongoDB:", error.message);
//   });
