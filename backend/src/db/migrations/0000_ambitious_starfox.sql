DO $$ BEGIN
 CREATE TYPE "gender" AS ENUM('M', 'F');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "billionaires" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"rank" integer,
	"finalWorth" integer,
	"category" text NOT NULL,
	"personName" text,
	"age" integer,
	"country" text,
	"city" text,
	"source" text NOT NULL,
	"industries" text NOT NULL,
	"countryOfCitizenship" text NOT NULL,
	"organization" text,
	"selfMade" boolean,
	"status" text,
	"gender" "gender",
	"birthDate" date,
	"lastName" text,
	"firstName" text,
	"title" text,
	"state" text,
	"residenceStateRegion" text,
	"birthYear" integer,
	"birthMonth" integer,
	"birthDay" integer,
	"cpiCountry" numeric(5, 2),
	"cpiChangeCountry" numeric(2, 1),
	"gdpCountry" bigint,
	"grossTertiaryEducationEnrollment" numeric(4, 1),
	"grossPrimaryEducationEnrollmentCountry" numeric(4, 1),
	"lifeExpectancyCountry" numeric(3, 1),
	"taxRevenueCountryCountry" numeric(3, 1),
	"totalTaxRateCountry" numeric(4, 1),
	"populationCountry" integer,
	"latitudeCountry" numeric(8, 6),
	"longitudeCountry" numeric(9, 6)
);
