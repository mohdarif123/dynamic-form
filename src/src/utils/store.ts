import {
  configureStore,
  ThunkAction,
  Action,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import authReducer from "redux/authSlice";
import themeChangeSlice from "redux/themeChangeSlice";

const loadState = () => {
  try {
    const loadedState = localStorage.getItem("state");
    if (loadedState === null) return undefined;
    return JSON.parse(loadedState);
  } catch (error: any) {
    return undefined;
  }
};
export interface BlockingState {
  isBlocking: boolean;
  isTemplateBlockingState: boolean;
}
const initialState: BlockingState = {
  isBlocking: false,
  isTemplateBlockingState: false,
};

const saveState = (state: RootState) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("state", serializedState);
};

const persistedState = loadState();
export const blockSlice = createSlice({
  name: "blocking",
  initialState,
  reducers: {
    blockingState: (state, action: PayloadAction<{ isBlocking: boolean }>) => {
      state.isBlocking = action.payload.isBlocking;
    },
    templateBlockingState: (
      state,
      action: PayloadAction<{ isTemplateBlockingState: boolean }>
    ) => {
      state.isTemplateBlockingState = action.payload.isTemplateBlockingState;
    },
  },
});

export const store = configureStore({
  reducer: { auth: authReducer, themeChangeSlice },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export const { blockingState, templateBlockingState } = blockSlice.actions;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
