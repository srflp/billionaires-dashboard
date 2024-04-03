import {
  BooleanField,
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
  TextInput,
} from "react-admin";

export const BillionaireList = () => (
  <List
    filters={[
      <TextInput
        key="search"
        label="Person name"
        source="personName"
        alwaysOn
      />,
    ]}
  >
    <Datagrid rowClick="edit">
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
      <TextField source="state" />
      <TextField source="residenceStateRegion" />
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
    </Datagrid>
  </List>
);
