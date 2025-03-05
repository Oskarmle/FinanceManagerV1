import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoryEntity } from "./CategoryEntity";
import { CategoriesAPI } from "../APIs/CategoryAPI";

// Create a thunk to fetch all categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, thunkAPI) => {
    return await CategoriesAPI.getCategories();
  }
);

export const createCategory = createAsyncThunk(
  "categories/create",
  async (category: CategoryEntity, thunkAPI) => {
    return await CategoriesAPI.createCategory(category);
  }
);

type categoryState = {
  categories: CategoryEntity[];
};

const initialState: categoryState = {
  categories: [],
};

// Handle actions in your reducers
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // Non-async reducers should be in here
  },
  extraReducers: (builder) => {
    // Add async reducers in here
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      console.log("payload", action.payload);

      state.categories = action.payload;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      console.log("payload", action.payload);

      state.categories.push(action.payload);
    });
  },
});
export default categorySlice.reducer;