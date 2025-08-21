const server = require("./server/index.cjs");

const { app, initializeDatabase } = server;
const PORT = 9696;

initializeDatabase()
  .then(() => {
    const serverInstance = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

    // Common Express app events
    app.on("error", (error) => {
      console.error("Express app error:", error);
    });

    // Server-specific events
    serverInstance.on("error", (error) => {
      console.error("Server error:", error);
    });

    serverInstance.on("listening", () => {
      console.log("Server is listening for connections");
    });

    serverInstance.on("connection", (socket) => {
      console.log("New connection established");
    });

    serverInstance.on("close", () => {
      console.log("Server closed");
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
