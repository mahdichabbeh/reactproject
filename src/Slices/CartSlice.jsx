import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Fetch or create cart
export const initializeCart = createAsyncThunk(
  "cart/initializeCart",
  async () => {
    let cartId = Cookies.get("cartId");

    if (!cartId) {
      const response = await fetch("http://localhost:3000/carts", {
        method: "POST",
      });
      const data = await response.json();
      cartId = data.id;
      Cookies.set("cartId", cartId);
    }

    const response = await fetch(`http://localhost:3000/carts/${cartId}`);
    return await response.json();
  }
);

// Add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ product, quantity, cartId }, { getState, dispatch }) => {
    const state = getState().cart;
    const existingItem = state.items.find((item) => item.id === product.id);

    const updatedItems = existingItem
      ? state.items.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + quantity } // **Corrected to use sent quantity**
            : item
        )
      : [...state.items, { ...product, qty: quantity }]; // **Use quantity from payload**
    const subTotal = updatedItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    const tax = subTotal * 0.2; // 20% Tax
    const total = subTotal + tax;
    const response = await fetch(`http://localhost:3000/carts/${cartId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: updatedItems,
        subTotal, // ✅ Send subtotal
        tax, // ✅ Send tax
        total,
      }),
    });

    const updatedCart = await response.json();
    dispatch(updateCart(updatedCart));
  }
);
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, quantity, cartId }, { getState, dispatch }) => {
    const state = getState().cart;
    const updatedItems = state.items.map((item) =>
      item.id === productId ? { ...item, qty: quantity } : item
    );

    const response = await fetch(`http://localhost:3000/carts/${cartId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: updatedItems }),
    });

    const updatedCart = await response.json();
    dispatch(updateCart(updatedCart));
  }
);
// Remove from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, cartId }, { getState, dispatch }) => {
    const state = getState().cart;

    const updatedItems = state.items.filter((item) => item.id !== productId);

    const response = await fetch(`http://localhost:3000/carts/${cartId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: updatedItems }),
    });

    const updatedCart = await response.json();
    dispatch(updateCart(updatedCart));
  }
);

// Checkout action
export const checkoutCart = createAsyncThunk(
  "cart/checkoutCart",
  async (cartId, { dispatch }) => {
    // Clear cart and remove cookie
    Cookies.remove("cartId");
    dispatch(resetCart());
  }
);

// Calculate Subtotal, Tax (20%), and Total
const calculateCartTotals = (items) => {
  const subTotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subTotal * 0.2; // 20% tax
  const total = subTotal + tax;
  return { subTotal, tax, total };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartId: "",
    items: [],
    subtotal: 0,
    tax: 0,
    totalAmount: 0,
    loading: false,
  },
  reducers: {
    updateCart: (state, action) => {
      state.items = action.payload.items || [];
      const { subtotal, tax, total } = calculateCartTotals(state.items);
      state.subtotal = subtotal;
      state.tax = tax;
      state.totalAmount = total;
    },
    resetCart: (state) => {
      state.cartId = "";
      state.items = [];
      state.subtotal = 0;
      state.tax = 0;
      state.totalAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeCart.fulfilled, (state, action) => {
        state.cartId = action.payload.id;
        state.items = action.payload.items || [];
        const { subtotal, tax, total } = calculateCartTotals(state.items);
        state.subtotal = subtotal;
        state.tax = tax;
        state.totalAmount = total;
        state.loading = false;
      })
      .addCase(initializeCart.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { updateCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
