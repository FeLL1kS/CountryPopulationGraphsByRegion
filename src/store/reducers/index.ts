import { combineReducers } from "redux";
import { countriesReducer } from './countriesReducer'

export const rootReducer = combineReducers({
  countries: countriesReducer
})

export type RootState = ReturnType<typeof rootReducer>
