import { bigint, date } from "drizzle-orm/pg-core";
import {
  pgTable,
  text,
  boolean,
  integer,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";
import { decimal } from "drizzle-orm/pg-core";

export const genderEnum = pgEnum("gender", ["M", "F"]);

export const billionaires = pgTable("billionaires", {
  id: uuid("id").primaryKey().defaultRandom(),
  rank: integer("rank"),
  finalWorth: integer("finalWorth"),
  category: text("category").notNull(),
  personName: text("personName"),
  age: integer("age"),
  country: text("country"),
  city: text("city"),
  source: text("source").notNull(),
  industries: text("industries").notNull(),
  countryOfCitizenship: text("countryOfCitizenship").notNull(),
  organization: text("organization"),
  selfMade: boolean("selfMade"),
  status: text("status"),
  gender: genderEnum("gender"),
  birthDate: date("birthDate"),
  lastName: text("lastName"),
  firstName: text("firstName"),
  title: text("title"),
  state: text("state"),
  residenceStateRegion: text("residenceStateRegion"),
  birthYear: integer("birthYear"),
  birthMonth: integer("birthMonth"),
  birthDay: integer("birthDay"),
  cpiCountry: decimal("cpiCountry", { precision: 5, scale: 2 }),
  cpiChangeCountry: decimal("cpiChangeCountry", { precision: 2, scale: 1 }),
  gdpCountry: bigint("gdpCountry", { mode: "number" }),
  grossTertiaryEducationEnrollment: decimal(
    "grossTertiaryEducationEnrollment",
    { precision: 4, scale: 1 }
  ),
  grossPrimaryEducationEnrollmentCountry: decimal(
    "grossPrimaryEducationEnrollmentCountry",
    { precision: 4, scale: 1 }
  ),
  lifeExpectancyCountry: decimal("lifeExpectancyCountry", {
    precision: 3,
    scale: 1,
  }),
  taxRevenueCountryCountry: decimal("taxRevenueCountryCountry", {
    precision: 3,
    scale: 1,
  }),
  totalTaxRateCountry: decimal("totalTaxRateCountry", {
    precision: 4,
    scale: 1,
  }),
  populationCountry: integer("populationCountry"),
  latitudeCountry: decimal("latitudeCountry", { precision: 8, scale: 6 }),
  longitudeCountry: decimal("longitudeCountry", { precision: 9, scale: 6 }),
});

// date column is useless
// gdp_country is a string - why?
