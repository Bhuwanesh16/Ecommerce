import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState={
    isLoading: false,
    productList:[],
}

export const addNewProduct=createAsyncThunk('/products/AddNewProduct',
    async(formData)=>
{
     const result=await axios.post('http://localhost:5000/api/admin/products/add', formData,
        { headers :
        {
            'Content-Type': 'application/json',
        },
    }
        
     ); 
      return result?.data; 
})
export const fetchAllProduct=createAsyncThunk('/products/fetchAllProduct',
    async()=>
{
     const result=await axios.get('http://localhost:5000/api/admin/products/fetch', 
        
     );
     return result?.data; 
})
export const updateProduct=createAsyncThunk('/products/UpdateProduct',
    async({id,formData})=>
{
     const result=await axios.put(`http://localhost:5000/api/admin/products/update/${id}`, formData,
        { headers :
        {
            'Content-Type': 'application/json',
        },
    }
        
     ); 
      return result?.data; 
})
export const deleteProduct=createAsyncThunk('/products/DeleteProduct',
    async(id)=>
{
     const result=await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`, 
        
     );
      return result?.data;  
})

const AdminProductsSlice= createSlice({
    name: 'adminProductsSlice',
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
         builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        console.log(action.payload.data, "action.payload.data");

        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
    }

})

export default AdminProductsSlice.reducer;