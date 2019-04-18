import {combineReducers} from "redux";
import searchReducer from './searchReducer';
import currentCoordinateReducer from './currentCoordinateReducer'

export default combineReducers({
  searchReducer,
  currentCoordinateReducer
});
