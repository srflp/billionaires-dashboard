import {
  BooleanInput,
  DateInput,
  NumberInput,
  RadioButtonGroupInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

export const BillionaireForm = () => (
  <SimpleForm>
    <NumberInput source="rank" />
    <NumberInput source="finalWorth" />
    <TextInput source="category" validate={required()} />
    <TextInput source="personName" />
    <NumberInput source="age" />
    <TextInput source="country" />
    <TextInput source="city" />
    <TextInput source="source" validate={required()} />
    <TextInput source="industries" validate={required()} />
    <TextInput source="countryOfCitizenship" validate={required()} />
    <TextInput source="organization" />
    <BooleanInput source="selfMade" />
    <TextInput source="status" />
    <RadioButtonGroupInput
      source="gender"
      choices={[
        { id: "M", name: "Male" },
        { id: "F", name: "Female" },
      ]}
    />
    <DateInput source="birthDate" />
    <TextInput source="lastName" />
    <TextInput source="firstName" />
    <TextInput source="title" />
    <TextInput source="state" />
    <TextInput source="residenceStateRegion" />
    <NumberInput source="birthYear" />
    <NumberInput source="birthMonth" />
    <NumberInput source="birthDay" />
    <NumberInput source="cpiCountry" />
    <NumberInput source="cpiChangeCountry" />
    <NumberInput source="gdpCountry" />
    <NumberInput source="grossTertiaryEducationEnrollment" />
    <NumberInput source="grossPrimaryEducationEnrollmentCountry" />
    <NumberInput source="lifeExpectancyCountry" />
    <NumberInput source="taxRevenueCountryCountry" />
    <NumberInput source="totalTaxRateCountry" />
    <NumberInput source="populationCountry" />
    <NumberInput source="latitudeCountry" />
    <NumberInput source="longitudeCountry" />
  </SimpleForm>
);
