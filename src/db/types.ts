import { InferSelectModel } from "drizzle-orm";
import { toursTable } from "./schema";

export type Tour = InferSelectModel<typeof toursTable>;