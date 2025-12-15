import type {  StoryTypes } from "@/types/RootTypes";
import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";

interface StoryState {
  data: StoryTypes[] | [];
  loading: boolean;
  error: string;
  isAuth: boolean;
}

const initialState: StoryState = {
  data: [],
  loading: false,
  error: "",
  isAuth: false,
};

const StorySlacer = createSlice({
  name: "Story",
  initialState,
  reducers: {
    setStory(state, { payload }: PayloadAction<StoryTypes[]>) {
      state.data = payload;
      state.loading = false;
      state.isAuth = true;
      state.error = "";
    },
    setStoryLoading(state) {
      state.loading = true;
    },
    setStoryError(state, { payload }: PayloadAction<string>) {
      state.error = payload;
      state.loading = false;
      state.isAuth = false;
    },
  },
});

export const { setStory,setStoryLoading, setStoryError } = StorySlacer.actions;
export default StorySlacer.reducer;
