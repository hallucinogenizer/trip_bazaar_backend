import { Hono } from "hono";
import { z } from "@hono/zod-openapi";
import { describeRoute, generateSpecs, openAPISpecs } from "hono-openapi";
import { resolver, validator as zValidator } from "hono-openapi/zod";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { toursTable } from "./db/schema";
import { Tour } from "./db/types";
import { createSelectSchema } from "drizzle-zod";


export type Env = {
  DATABASE_URL: string;
}

const app = new Hono<{Bindings: Env}>();

const responseSchema = z.object({tours: z.array(createSelectSchema(toursTable))});

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
  async (c) => {
    const sql = neon(c.env.DATABASE_URL);
    const db = drizzle(sql);

    const allTasks: Tour[] = await db.select().from(toursTable)
    
    return c.json({ tours: allTasks });
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