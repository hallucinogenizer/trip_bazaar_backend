import { Hono } from "hono";
import { z } from "@hono/zod-openapi";
import { describeRoute, generateSpecs, openAPISpecs } from "hono-openapi";
import { resolver, validator as zValidator } from "hono-openapi/zod";


const app = new Hono();

const responseSchema = z.string().openapi({ example: "Hello Steven!" });

app.get(
  "/",
  describeRoute({
    description: "Say hello to the user",
    responses: {
      200: {
        description: "Successful greeting response",
        content: {
          "text/plain": {
            schema: resolver(responseSchema),
          },
        },
      },
    },
  }),
  (c) => {
    return c.text("Hello World!");
  }
);

const requestSchema = z.object({ body: z.string() });
app.post(
  "/",
  describeRoute({
    description: "Sample post endpoint",
    requestBody: {
      description: "JSON request body",
      required: true,
      content: {
        "application/json": {
          schema: resolver(requestSchema),
        },
      },
    },
    responses: {
      200: {
        description: "Successful response",
        content: {
          "text/plain": {
            schema: resolver(responseSchema),
          },
        },
      },
    },
  }),
  zValidator("json", requestSchema),
  (c) => {
    const { body } = c.req.valid("json");
    return c.text("Hello Hono!");
  }
);

app.get(
  "/openapi",
  openAPISpecs(app, {
    documentation: {
      info: {
        title: "Hono",
        version: "1.0.0",
        description: "API for greeting users",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Local server",
        },
      ],
    },
  })
);


export default app;