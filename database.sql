CREATE TABLE "person" (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);


CREATE TABLE "bathroom" (
	"id" serial NOT NULL,
	"type" integer NOT NULL,
	"location" integer NOT NULL,
	"date_added" DATE NOT NULL,
	"added_by" integer NOT NULL,
	CONSTRAINT bathroom_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "saved_bathrooms" (
	"key" serial NOT NULL,
	"person_id" integer NOT NULL,
	"bathroom_id" integer NOT NULL,
	CONSTRAINT saved_bathrooms_pk PRIMARY KEY ("key")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_ratings" (
	"id" serial NOT NULL,
	"rating" integer NOT NULL,
	"person_id" integer NOT NULL,
	"bathroom_id" integer NOT NULL,
	CONSTRAINT user_ratings_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "graffiti" (
	"id" serial NOT NULL,
	"content" varchar NOT NULL,
	"person_id" integer NOT NULL,
	"bathroom_id" integer NOT NULL,
	CONSTRAINT graffiti_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "bathroom_type" (
	"id" serial NOT NULL,
	"type" varchar NOT NULL,
	CONSTRAINT bathroom_type_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Amenities" (
	"id" serial NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT Amenities_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "bathroom_amenities" (
	"id" serial NOT NULL,
	"bathroom_id" integer NOT NULL,
	"amenities_id" integer NOT NULL,
	CONSTRAINT bathroom_amenities_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_preferences" (
	"id" serial NOT NULL,
	"person_id" integer NOT NULL,
	"type" integer NOT NULL,
	"amenities_id" integer NOT NULL,
	CONSTRAINT user_preferences_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "location" (
	"id" serial NOT NULL,
	"address" varchar NOT NULL,
	"city" varchar NOT NULL,
	"latitude" FLOAT NOT NULL,
	"longitude" FLOAT NOT NULL,
	"additional directions" varchar NOT NULL,
	CONSTRAINT location_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "bathroom" ADD CONSTRAINT "bathroom_fk0" FOREIGN KEY ("type") REFERENCES "bathroom_type"("id");
ALTER TABLE "bathroom" ADD CONSTRAINT "bathroom_fk1" FOREIGN KEY ("location") REFERENCES "location"("id");
ALTER TABLE "bathroom" ADD CONSTRAINT "bathroom_fk2" FOREIGN KEY ("added_by") REFERENCES "person"("id");

ALTER TABLE "saved_bathrooms" ADD CONSTRAINT "saved_bathrooms_fk0" FOREIGN KEY ("person_id") REFERENCES "person"("id");
ALTER TABLE "saved_bathrooms" ADD CONSTRAINT "saved_bathrooms_fk1" FOREIGN KEY ("bathroom_id") REFERENCES "bathroom"("id");

ALTER TABLE "user_ratings" ADD CONSTRAINT "user_ratings_fk0" FOREIGN KEY ("person_id") REFERENCES "person"("id");
ALTER TABLE "user_ratings" ADD CONSTRAINT "user_ratings_fk1" FOREIGN KEY ("bathroom_id") REFERENCES "bathroom"("id");

ALTER TABLE "graffiti" ADD CONSTRAINT "graffiti_fk0" FOREIGN KEY ("person_id") REFERENCES "person"("id");
ALTER TABLE "graffiti" ADD CONSTRAINT "graffiti_fk1" FOREIGN KEY ("bathroom_id") REFERENCES "bathroom"("id");



ALTER TABLE "bathroom_amenities" ADD CONSTRAINT "bathroom_amenities_fk0" FOREIGN KEY ("bathroom_id") REFERENCES "bathroom"("id");
ALTER TABLE "bathroom_amenities" ADD CONSTRAINT "bathroom_amenities_fk1" FOREIGN KEY ("amenities_id") REFERENCES "Amenities"("id");

ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_fk0" FOREIGN KEY ("person_id") REFERENCES "person"("id");
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_fk1" FOREIGN KEY ("type") REFERENCES "bathroom_type"("id");
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_fk2" FOREIGN KEY ("amenities_id") REFERENCES "Amenities"("id");

ALTER TABLE "public"."bathroom" ADD COLUMN "additional_directions" text;

INSERT INTO "public"."amenities"("name") VALUES('Key required') RETURNING "id", "name";
INSERT INTO "public"."amenities"("name") VALUES('Employee permission required') RETURNING "id", "name";
INSERT INTO "public"."amenities"("name") VALUES('Handicap Accessable') RETURNING "id", "name";
INSERT INTO "public"."amenities"("name") VALUES('Sharps disposal') RETURNING "id", "name";
INSERT INTO "public"."amenities"("name") VALUES('Paper Towels') RETURNING "id", "name";
INSERT INTO "public"."amenities"("name") VALUES('Blow Dryer') RETURNING "id", "name";
INSERT INTO "public"."amenities"("name") VALUES('Changing Table') RETURNING "id", "name";
INSERT INTO "public"."amenities"("name") VALUES('Mirrors') RETURNING "id", "name";
INSERT INTO "public"."amenities"("name") VALUES('Attendant') RETURNING "id", "name";
INSERT INTO "public"."amenities"("name") VALUES('Vending Machine') RETURNING "id", "name";
