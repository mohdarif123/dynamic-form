import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "utils/store";

export interface ThemeChangeState {
  backgroundColor: boolean;
}
// localStorage.clear();
const initialState: ThemeChangeState = {
  backgroundColor: false,
};

export const themeChangeSlice = createSlice({
  name: "themeChange",
  initialState,
  reducers: {
    themeChangeAction: (
      state,
      action: PayloadAction<{
        backgroundColor: boolean;
      }>
    ) => {
      state.backgroundColor = action.payload.backgroundColor;
    },
  },
});

export const { themeChangeAction } = themeChangeSlice.actions;
export const selectBackgroundColor = (state: RootState) =>
  state.themeChangeSlice.backgroundColor;
export default themeChangeSlice.reducer;
