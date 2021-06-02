import { createActions } from "redux-actions";

export const getCountries = createActions({
  getCountriesRequest: undefined,
  getCountriesSuccess: (payload) => payload,
  getCountriesFailure: (err) => err,
});

export const getReportByCountry = createActions({
  getReportByCountryRequest: (params) => params,
  getReportByCountrySuccess: (payload) => payload,
  getReportByCountryFailure: (err) => err,
});

export const getCountryMap = createActions({
  getCountryMapSuccess: (payload) => payload,
});
