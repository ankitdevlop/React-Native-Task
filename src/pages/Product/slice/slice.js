import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { API_ENDPOINTS, METHOD_TYPE } from "../../../utilities/apiUrls";
import api, { addUrl } from "../../../utilities/api";

const initialState = {
    isLoading: false,
    error: null,
    products: null,
    productData: null
};

export const getAllProduct = createAsyncThunk("getAllProduct", async () => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: addUrl(API_ENDPOINTS.getAllProduct)
        };
        const response = await api(data);
        return response?.data;
    } catch (error) {
        throw error.response.data;
    }
});
export const getProductDetails = createAsyncThunk("getProductDetails", async (query) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: addUrl(API_ENDPOINTS.viewProduct+query)
        };
        const response = await api(data);
        return response?.data;
    } catch (error) {
        throw error.response.data;
    }
});
export const deleteProduct = createAsyncThunk("deleteProduct", async (query) => {
    try {
        let data = {
            method: METHOD_TYPE.delete,
            url: addUrl(API_ENDPOINTS.deleteProduct+query)
        };
        const response = await api(data);
        return response?.data;
    } catch (error) {
        throw error.response.data;
    }
});
export const updateProduct = createAsyncThunk("updateProduct", async ({query,requestData}) => {
    try {
        let data = {
            method: METHOD_TYPE.put,
            url: addUrl(API_ENDPOINTS.updateProduct+query),
            data: requestData
        };
        const response = await api(data);
        return response?.data;
    } catch (error) {
        throw error.response.data;
    }
});
export const addProduct = createAsyncThunk("addProduct", async (requestData) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: addUrl(API_ENDPOINTS.addProduct),
            data: requestData
        };
        const response = await api(data);
        return response?.data;
    } catch (error) {
        throw error.response.data;
    }
});






const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProductToState: (state, action) => {
            state.products.push(action.payload); // Add new product locally
          },
          updateProductInState: (state, action) => {
            const index = state.products.findIndex((p) => p.id === action.payload.id);
            if (index !== -1) {
              state.products[index] = action.payload; // Update existing product locally
            }
        }
    },
    extraReducers: (builder) => {
        builder
            
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.products = action.payload
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.productData = action.payload
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
            })
            
            .addCase(addProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
            })
            
            .addMatcher(isAnyOf(getAllProduct.pending,getProductDetails.pending,deleteProduct.pending,updateProduct.pending,addProduct.pending), (state) => {
                state.isLoading = true;
            })
            .addMatcher(isAnyOf(getAllProduct.rejected,getProductDetails.rejected,deleteProduct.rejected,updateProduct.rejected,addProduct.rejected), (state, { error }) => {
                state.isLoading = false;
                state.error = error.message ? error.message : "Request Failed Please Try Again ";
            })
    }
});

export default productSlice.reducer;