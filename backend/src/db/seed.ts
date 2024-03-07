import fs from "node:fs";
import { parse } from "csv-parse";
import { camelCase } from "lodash-es";
import path from "node:path";
import { billionaires } from "./schemas.js";
import { db } from "./index.js";

const parseInteger = (value: string) => {
  const number = parseInt(value, 10);
  if (Number.isNaN(number)) {
    return null;
  }
  return number;
};

export const seed = async () => {
  fs.createReadStream(path.resolve("data/billionaires.csv"))
    .pipe(
      parse({
        columns: (headers: string[]) =>
          headers.map((header) => camelCase(header)),
      })
    )
    .on("data", async (row) => {
      const data = {
        ...row,
        rank: parseInteger(row.rank),
        finalWorth: parseInteger(row.finalWorth),
        age: parseInteger(row.age),
        selfMade: row.selfMade === "TRUE",
        birthYear: parseInteger(row.birthYear),
        birthMonth: parseInteger(row.birthMonth),
        birthDay: parseInteger(row.birthDay),
        birthDate: row.birthDate || null,
        cpiCountry: row.cpiCountry || null,
        cpiChangeCountry: row.cpiChangeCountry || null,
        grossTertiaryEducationEnrollment:
          row.grossTertiaryEducationEnrollment || null,
        grossPrimaryEducationEnrollmentCountry:
          row.grossPrimaryEducationEnrollmentCountry || null,
        lifeExpectancyCountry: row.lifeExpectancyCountry || null,
        taxRevenueCountryCountry: row.taxRevenueCountryCountry || null,
        totalTaxRateCountry: row.totalTaxRateCountry || null,
        latitudeCountry: row.latitudeCountry || null,
        longitudeCountry: row.longitudeCountry || null,
        gdpCountry: parseInteger(row.gdpCountry.replace(/\D/g, "")),
        populationCountry: parseInteger(row.populationCountry),
      };
      try {
        await db.insert(billionaires).values(data).onConflictDoNothing();
      } catch (e) {
        console.log(e, data);
      }
    });
};
