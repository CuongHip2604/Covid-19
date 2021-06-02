import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  NativeSelect,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getReportByCountry,
  getCountries,
  getCountryMap,
} from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: `${theme.spacing(3)}px 0`,
  },
}));

function CountrySeletor(props) {
  const styles = useStyles();
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.root.countries);

  const handleOnChange = (event) => {
    setSelectedCountryId(event.target.value);
  };

  useEffect(() => {
    dispatch(getCountries.getCountriesRequest());
    setSelectedCountryId("VN");
  }, [dispatch]);

  useEffect(() => {
    if (!selectedCountryId) return;
    const country = countries.find(
      (country) => country.ISO2 === selectedCountryId
    );
    if (!country?.Slug) return;
    import(
      `@highcharts/map-collection/countries/${selectedCountryId.toLocaleLowerCase()}/${selectedCountryId.toLocaleLowerCase()}-all.geo.json`
    ).then((res) => dispatch(getCountryMap.getCountryMapSuccess(res)));

    dispatch(getReportByCountry.getReportByCountryRequest(country.Slug));
  }, [selectedCountryId, countries, dispatch]);

  return (
    <FormControl className={styles.formControl}>
      <InputLabel htmlFor="country-selector" shrink>
        Country
      </InputLabel>
      <NativeSelect
        value={selectedCountryId}
        onChange={handleOnChange}
        inputProps={{
          name: "country",
          id: "country-selector",
        }}
      >
        {countries.map((country, index) => {
          return (
            <option key={index} value={country.ISO2}>
              {country.Country}
            </option>
          );
        })}
      </NativeSelect>
      <FormHelperText>Select country</FormHelperText>
    </FormControl>
  );
}

export default CountrySeletor;
