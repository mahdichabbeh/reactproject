import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async Thunk to fetch products & categories together
export const fetchProductsAndCategories = createAsyncThunk(
  "products/fetchProductsAndCategories",
  async () => {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch("http://localhost:3000/products-lists"),
      fetch("http://localhost:3000/categories"),
    ]);

    const [products, categories] = await Promise.all([
      productsRes.json(),
      categoriesRes.json(),
    ]);
    console.log("📢 Products fetched:", products);
      console.log("📢 Categories fetched:", categories);
    return { products, categories };
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    categories: [], // ✅ Added categories to state
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAndCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsAndCategories.fulfilled, (state, action) => {
        state.items = action.payload.products;
        state.categories = action.payload.categories; // ✅ Store categories in Redux
        state.loading = false;
      })
      .addCase(fetchProductsAndCategories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;
