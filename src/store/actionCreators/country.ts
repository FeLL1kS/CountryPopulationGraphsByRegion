import { Dispatch } from "redux";
import { CountriesAction, CountriesActionTypes, Country } from "../../types/country";

export const fetchCountries = () => {
  return async (dispatch: Dispatch<CountriesAction>) => {
    try {
      dispatch({ 
        type: CountriesActionTypes.FETCH_COUNTRIES, 
      })
      
      const response: Response = await fetch('https://restcountries.eu/rest/v2/all?fields=alpha3Code;region;population');
      const countries: Country[] = await response.json();

      countries.sort((a, b) => (a.region > b.region ? 1 : -1))

      dispatch({ 
        type: CountriesActionTypes.FETCH_COUNTRIES_SUCCESS,
        payload: countries,
      })
    } catch {
      dispatch({
        type: CountriesActionTypes.FETCH_COUNTRIES_ERROR,
        payload: "Ошибка",
      })
    }
  }
}