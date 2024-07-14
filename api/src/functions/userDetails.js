const { app } = require("@azure/functions");

app.http("userDetails", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    var text = "Stranger 👋 (please login)";
    const header = request.headers.get("x-ms-client-principal");
    if (header) {
      const user = JSON.parse(Buffer.from(header, "base64").toString("utf-8"));
      text = `${user.userDetails}!`;
    }

    return { body: text };
  },
});
