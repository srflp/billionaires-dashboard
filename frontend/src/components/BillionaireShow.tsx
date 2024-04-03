import {
  BooleanField,
  DateField,
  NumberField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import { BillionaireTitle } from "./BillionaireTitle";

export const BillionaireShow = () => (
  <Show title={<BillionaireTitle />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <NumberField source="rank" />
      <NumberField source="finalWorth" />
      <TextField source="category" />
      <TextField source="personName" />
      <NumberField source="age" />
      <TextField source="country" />
      <TextField source="city" />
      <TextField source="source" />
      <TextField source="industries" />
      <TextField source="countryOfCitizenship" />
      <TextField source="organization" />
      <BooleanField source="selfMade" />
      <TextField source="status" />
      <TextField source="gender" />
      <DateField source="birthDate" />
      <TextField source="lastName" />
      <TextField source="firstName" />
      <TextField source="title" />
      <DateField source="state" />
      <DateField source="residenceStateRegion" />
      <NumberField source="birthYear" />
      <NumberField source="birthMonth" />
      <NumberField source="birthDay" />
      <TextField source="cpiCountry" />
      <TextField source="cpiChangeCountry" />
      <NumberField source="gdpCountry" />
      <TextField source="grossTertiaryEducationEnrollment" />
      <TextField source="grossPrimaryEducationEnrollmentCountry" />
      <TextField source="lifeExpectancyCountry" />
      <TextField source="taxRevenueCountryCountry" />
      <TextField source="totalTaxRateCountry" />
      <NumberField source="populationCountry" />
      <TextField source="latitudeCountry" />
      <TextField source="longitudeCountry" />
    </SimpleShowLayout>
  </Show>
);
