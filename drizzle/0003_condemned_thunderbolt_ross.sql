ALTER TABLE "locations" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "locations" DROP COLUMN "updated_at";