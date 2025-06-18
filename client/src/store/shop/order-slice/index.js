import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"




const initialState = {
  isLoading: false,
  approvalURL: null,
  orderId: null
}

export const createNewOrder = createAsyncThunk('/create/createNewOrder',
  async (orderData) => {
    const response = await axios.post('http://localhost:5000/api/shop/order/create', orderData);
    return response.data;
  }
)
export const capturePayment = createAsyncThunk('/create/capturePayment',
  async ( { payerId, orderId, paymentId }) => {
    const response = await axios.post('http://localhost:5000/api/shop/order/capture', 
       { payerId, orderId, paymentId }
    );
    return response.data;
  }
)

const ShoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = true;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      });

  },
})

export default ShoppingOrderSlice.reducer;