import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("http://127.0.0.1:3000/products");
    return response.json();
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    const response = await fetch("http://127.0.0.1:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return response.json();
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product) => {
    const response = await fetch(
      `http://127.0.0.1:3000/products/${product.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      }
    );
    return response.json();
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await fetch(`http://127.0.0.1:3000/products/${id}`, { method: "DELETE" });
    return id;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
    addProductLoading: false,
    addProductError: null,
    updateProductLoading: false,
    updateProductError: null,
    deleteProductLoading: false,
    deleteProductError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add product
      .addCase(addProduct.pending, (state) => {
        state.addProductLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.addProductLoading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addProductLoading = false;
        state.addProductError = action.error.message;
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.updateProductLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updateProductLoading = false;
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateProductLoading = false;
        state.updateProductError = action.error.message;
      })

      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.deleteProductLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteProductLoading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteProductLoading = false;
        state.deleteProductError = action.error.message;
      });
  },
});
export default productSlice.reducer;
