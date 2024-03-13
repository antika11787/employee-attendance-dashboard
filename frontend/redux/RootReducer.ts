import fileReducer from "../redux/slices/FileSlice";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  file: fileReducer,
});

export default rootReducer;
