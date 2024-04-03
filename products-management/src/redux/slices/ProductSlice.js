import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    productList: [],
};

const URL = "https://6571bc40d61ba6fcc0136622.mockapi.io/products";

export const ProductSlice = createSlice({
    name: "product_list",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.fulfilled, (state, action) => {
                state.productList = action.payload;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.productList.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const updatedProduct = action.payload;
                const index = state.productList.findIndex(product => product.id === updatedProduct.id);
                if (index !== -1) {
                    state.productList[index] = updatedProduct;
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const idToDelete = action.payload;
                state.productList = state.productList.filter(product => product.id !== idToDelete);
            });
    },
});

// get
export const getProduct = createAsyncThunk("product_list/getProduct", async () => {
    try {
        const res = await axios.get(`${URL}`);
        return res.data;
    } catch (error) {
        console.log({ error });
    }
});

// create
export const createProduct = createAsyncThunk(
    "product_list/createProduct",
    async (newProduct) => {
        try {
            const res = await axios.post(`${URL}`, newProduct);
            return res.data;
        } catch (error) {
            console.log({ error });
        }
    }
);

export const updateProduct = createAsyncThunk(
    "product_list/updateProduct",
    async ({ id, updatedProduct }) => {
        try {
            const res = await axios.put(`${URL}/${id}`, updatedProduct);
            return res.data;
        } catch (error) {
            console.log({ error });
        }
    }
);

// delete
export const deleteProduct = createAsyncThunk(
    "product_list/deleteProduct",
    async (id) => {
        try {
            const res = await axios.delete(`${URL}/${id}`);
            console.log("response: ", res);
            return id;
        } catch (error) {
            console.log({ error })
        }
    })