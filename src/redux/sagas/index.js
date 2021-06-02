import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";
import { sortBy } from "lodash";

function* getCountriesSaga(action) {
  const countries = yield call(api.getCountries);
  const newCountries = sortBy(countries, "Country");
  yield put(actions.getCountries.getCountriesSuccess(newCountries));
}

function* getReportByCountrySaga(action) {
  const reports = yield call(api.getReportByCountry, action.payload);
  reports.pop();
  yield put(actions.getReportByCountry.getReportByCountrySuccess(reports));
}

function* mySaga() {
  yield takeLatest(actions.getCountries.getCountriesRequest, getCountriesSaga);
  yield takeLatest(
    actions.getReportByCountry.getReportByCountryRequest,
    getReportByCountrySaga
  );
}

export default mySaga;
