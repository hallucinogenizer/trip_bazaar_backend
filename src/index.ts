import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import * as z from 'zod'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post("/", zValidator('json', z.object({body: z.string()})), (c) => {
  const { body } = c.req.valid('json');
  return c.text("Hello Hono!")
})

export default app
