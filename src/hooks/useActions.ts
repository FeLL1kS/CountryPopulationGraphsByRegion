import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as CountryActionCreators from '../store/actionCreators/country';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(CountryActionCreators, dispatch);
}