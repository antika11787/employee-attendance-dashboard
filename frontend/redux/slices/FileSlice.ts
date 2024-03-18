import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialFileState {
  _id: string;
}

const initialState: InitialFileState = {
  _id: typeof window !== "undefined" ? localStorage.getItem("_id") || "" : "",
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    saveFileID: (state, action: PayloadAction<{ _id: string }>) => {
      state._id = action.payload._id;
      if (typeof window !== "undefined") {
        localStorage.setItem("_id", action.payload._id);
      }
    },
  },
});

export const { saveFileID } = fileSlice.actions;

export default fileSlice.reducer;
