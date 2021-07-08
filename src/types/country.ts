export interface Country {
  alpha3Code: string;
  population: number;
  region: string;
}

export interface CountriesState {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

export enum CountriesActionTypes {
  FETCH_COUNTRIES,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_ERROR,
}

interface FetchCountries {
  type: CountriesActionTypes.FETCH_COUNTRIES
}

interface FetchCountriesSuccess {
  type: CountriesActionTypes.FETCH_COUNTRIES_SUCCESS;
  payload: Country[];
}

interface FetchCountriesError {
  type: CountriesActionTypes.FETCH_COUNTRIES_ERROR;
  payload: string;
}

export type CountriesAction = FetchCountries | FetchCountriesSuccess | FetchCountriesError;
