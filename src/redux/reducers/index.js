import { combineReducers } from "redux";
import { getCountries, getReportByCountry, getCountryMap } from "../actions";

const initialState = {
  countries: [],
  reports: [],
  countryMap: null,
};

function reducers(state = initialState, action) {
  switch (action.type) {
    case getCountries.getCountriesRequest().type:
      return {
        ...state,
      };
    case getCountries.getCountriesSuccess().type:
      return {
        ...state,
        countries: action.payload,
      };
    case getCountries.getCountriesFailure().type:
      return {
        ...state,
        countries: [],
      };
    case getReportByCountry.getReportByCountryRequest().type:
      return {
        ...state,
      };
    case getReportByCountry.getReportByCountrySuccess().type:
      return {
        ...state,
        reports: action.payload,
      };
    case getReportByCountry.getReportByCountryFailure().type:
      return {
        ...state,
        reports: [],
      };
    case getCountryMap.getCountryMapSuccess().type:
      return {
        ...state,
        countryMap: action.payload,
      };

    default:
      return state;
  }
}

export default combineReducers({
  root: reducers,
});
