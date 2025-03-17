CREATE TABLE "primary_destinations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "primary_destinations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"featured_image_url" varchar(255) NOT NULL,
	"additional_image_urls" text[],
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "tour_primary_destinations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tour_primary_destinations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"tour_id" integer NOT NULL,
	"primary_destination_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "tour_secondary_destinations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tour_secondary_destinations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"tour_id" integer NOT NULL,
	"secondary_destination_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "tours" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tours_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"price" integer NOT NULL,
	"featured_image_url" varchar(255) NOT NULL,
	"additional_image_urls" text[],
	"images" varchar(255) NOT NULL,
	"start_date" date,
	"start_date_time" timestamp,
	"start_location_id" integer,
	"end_date" date,
	"end_date_time" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "tasks" CASCADE;--> statement-breakpoint
ALTER TABLE "tour_primary_destinations" ADD CONSTRAINT "tour_primary_destinations_tour_id_tours_id_fk" FOREIGN KEY ("tour_id") REFERENCES "public"."tours"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tour_primary_destinations" ADD CONSTRAINT "tour_primary_destinations_primary_destination_id_primary_destinations_id_fk" FOREIGN KEY ("primary_destination_id") REFERENCES "public"."primary_destinations"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tour_secondary_destinations" ADD CONSTRAINT "tour_secondary_destinations_tour_id_tours_id_fk" FOREIGN KEY ("tour_id") REFERENCES "public"."tours"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tour_secondary_destinations" ADD CONSTRAINT "tour_secondary_destinations_secondary_destination_id_primary_destinations_id_fk" FOREIGN KEY ("secondary_destination_id") REFERENCES "public"."primary_destinations"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tours" ADD CONSTRAINT "tours_start_location_id_primary_destinations_id_fk" FOREIGN KEY ("start_location_id") REFERENCES "public"."primary_destinations"("id") ON DELETE restrict ON UPDATE no action;