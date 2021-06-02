import axios from "./axios";

export const getCountries = () =>
  axios.get("countries").then((res) => res.data);

export const getReportByCountry = (params) =>
  axios.get(`dayone/country/${params}`).then((res) => res.data);
