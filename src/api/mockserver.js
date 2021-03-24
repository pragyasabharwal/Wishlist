import { createServer, Model, RestSerializer } from "miragejs";

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer
    },

    models: {
      wish: Model
    },

    routes() {
      this.namespace = "api";
      this.timing = 3000;
      this.resource("wishes");
    },

    seeds(server) {
      server.create("wish", { id: 1, text: "To spread kindness" });
      server.create("wish", { id: 2, text: "To never hurt anyone" });
    }
  });
}
