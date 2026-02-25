import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { MEDIA_TYPE } from "src/types/Common";

export interface MyListItem {
  id: number;
  mediaType: MEDIA_TYPE;
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
}

interface MyListState {
  items: MyListItem[];
}

function loadFromLocalStorage(): MyListItem[] {
  try {
    const data = localStorage.getItem("netflix_my_list");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveToLocalStorage(items: MyListItem[]) {
  localStorage.setItem("netflix_my_list", JSON.stringify(items));
}

const initialState: MyListState = {
  items: loadFromLocalStorage(),
};

const myListSlice = createSlice({
  name: "myList",
  initialState,
  reducers: {
    addToMyList: (state, action: PayloadAction<MyListItem>) => {
      const exists = state.items.find((item) => item.id === action.payload.id && item.mediaType === action.payload.mediaType);
      if (!exists) {
        state.items.push(action.payload);
        saveToLocalStorage(state.items);
      }
    },
    removeFromMyList: (state, action: PayloadAction<{ id: number; mediaType: MEDIA_TYPE }>) => {
      state.items = state.items.filter(
        (item) => !(item.id === action.payload.id && item.mediaType === action.payload.mediaType)
      );
      saveToLocalStorage(state.items);
    },
    toggleMyList: (state, action: PayloadAction<MyListItem>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id && item.mediaType === action.payload.mediaType
      );
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
      saveToLocalStorage(state.items);
    },
  },
});

export const { addToMyList, removeFromMyList, toggleMyList } = myListSlice.actions;

export const selectMyList = (state: RootState) => state.myList.items;
export const selectIsInMyList = (id: number, mediaType: MEDIA_TYPE) => (state: RootState) =>
  state.myList.items.some((item) => item.id === id && item.mediaType === mediaType);

export default myListSlice.reducer;
