ALTER TABLE "primary_destinations" RENAME TO "locations";--> statement-breakpoint
ALTER TABLE "tour_primary_destinations" DROP CONSTRAINT "tour_primary_destinations_primary_destination_id_primary_destinations_id_fk";
--> statement-breakpoint
ALTER TABLE "tour_secondary_destinations" DROP CONSTRAINT "tour_secondary_destinations_secondary_destination_id_primary_destinations_id_fk";
--> statement-breakpoint
ALTER TABLE "tours" DROP CONSTRAINT "tours_start_location_id_primary_destinations_id_fk";
--> statement-breakpoint
ALTER TABLE "tour_primary_destinations" ADD CONSTRAINT "tour_primary_destinations_primary_destination_id_locations_id_fk" FOREIGN KEY ("primary_destination_id") REFERENCES "public"."locations"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tour_secondary_destinations" ADD CONSTRAINT "tour_secondary_destinations_secondary_destination_id_locations_id_fk" FOREIGN KEY ("secondary_destination_id") REFERENCES "public"."locations"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tours" ADD CONSTRAINT "tours_start_location_id_locations_id_fk" FOREIGN KEY ("start_location_id") REFERENCES "public"."locations"("id") ON DELETE restrict ON UPDATE no action;