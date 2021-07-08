import { CountriesAction, CountriesActionTypes, CountriesState } from "../../types/country"

const initialState: CountriesState = {
  countries: [],
  loading: false,
  error: null
}

export const countriesReducer = (state = initialState, action: CountriesAction): CountriesState => {
  switch(action.type) {
    case CountriesActionTypes.FETCH_COUNTRIES:
      return {
        countries: [],
        loading: true,
        error: null
      }
    case CountriesActionTypes.FETCH_COUNTRIES_SUCCESS:
      return {
        countries: action.payload,
        loading: false,
        error: null
    }
    case CountriesActionTypes.FETCH_COUNTRIES_ERROR:
      return {
        countries: [],
        loading: false,
        error: action.payload
    }
    default:
      return state;
  }
}
