import "dotenv/config";
import app from "./src/app";

import { ConnectToDb } from "./src/config/database";

const PORT = 3000;

try {
  ConnectToDb();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.error("Failed to start server:", error);
  process.exit(1);
}
