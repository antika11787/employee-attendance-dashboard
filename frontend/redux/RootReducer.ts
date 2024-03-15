import fileReducer from "./slices/FileSlice";
import contentReducer from "./slices/ContentSlice";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  file: fileReducer,
  content: contentReducer,
});

export default rootReducer;
