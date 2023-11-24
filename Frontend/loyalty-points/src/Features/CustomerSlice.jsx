import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const customerState = {
  updateState: false,
  loading: false,
  customerList: [],
  error: "",
  response: "",
};

export const addCustomer = createAsyncThunk(
  "customer/addCustomer",
  async (data) => {
    const response = await axios.post(
        "http://localhost:8080/api/customers",
      {
        name: data.name,
        email: data.email,
        points: data.points,
      }
    );
    console.log("Customer is added " + data.response);
    return response.data.response;
  }
);

export const fetchCustomers = createAsyncThunk(
  "customer/fetchCustomers",
  async () => {
    const response = await axios.get(`http://localhost:8080/api/customers`);
    console.log("Customer List Data");
    console.log(response);
    return response.data.response;
  }
);

export const fetchCustomersById = createAsyncThunk(
    "customer/fetchCustomersById",
    async (data) => {
      const response = await axios.get(`http://localhost:8080/api/customers/${data.id}`);
      return response.data.response;
    }
  );

export const modifyCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async (data) => {
    const response = await axios.put(
        `http://localhost:8080/api/customers/${data.id}`,
      {
        name: data.name,
        email: data.email,
        points: data.points,
      }
    );
    return response.data.response;
  }
);

export const removeCustomer = createAsyncThunk(
    "customer/deleteCustomer",
    async (data) => {
        const response = await axios.delete(`http://localhost:8080/api/customers/${data}`);
        return response.data.response;
    }
);

export const addPoints = createAsyncThunk(
    "customer/addPoints",
    async (data) => {
        const response = await axios.put(`http://localhost:8080/api/customers/addPoints/${data.id}`,
        {
            points: data.points,
        }
        );
        return response.data.response;
    }
)

export const redeemPoints = createAsyncThunk(
    "customer/redeemPoints",
    async (data) => {
        const response = await axios.put(`http://localhost:8080/api/customers/redeemPoints/${data.id}`,
        {
            points: data.points,
        }
        );
        return response.data.response;
    }
)

const CustomerSlice = createSlice({
    name: 'customer',
    initialState: customerState,
    reducers: {
        changeStateTrue: (state) => {
            state.updateState = true;
        },
        changeStateFalse: (state) => {
            state.updateState = false;
          },
          clearResponse: (state) => {
            state.response = "";
          },
    },
    extraReducers: (builder) => {
        builder
        .addCase(addCustomer.pending, (state) => {
            state.loading = true;
          })
          .addCase(addCustomer.fulfilled, (state, action) => {
            state.loading = false;
            if (state.customerList != undefined) {
                state.customerList.push(action.payload);
               } else {
                const customerList = [fetchCustomers];
                customerList.push(action.payload);
                console.log(customerList);
               }
            
            state.response = "add";
            console.log(state.customerList);
          })
          .addCase(addCustomer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });

        builder
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.customerList = action.payload;
        console.log("Is it getting here?");
        console.log(customerState.customerList);
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.error = action.error.message;
      });

    //   builder
    //   .addCase(fetchCustomersById.fulfilled, (state, action) => {
    //     state.customerList = action.payload;
    //   })
    //   .addCase(fetchCustomersById.rejected, (state, action) => {
    //     state.error = action.error.message;
    //   });

      builder
      .addCase(modifyCustomer.fulfilled, (state, action) => {
        const updateItem = action.payload;
        console.log(updateItem);
        const index = state.customerList.findIndex(
            (item) => item._id === updateItem._id
        );
        if (index !== -1) {
            state.customerList[index] = updateItem;
        }
        state.response = "update";
      });

      builder.addCase(removeCustomer.fulfilled, (state, action) => {
        state.customerList = state.customerList.filter(
            (item) => item._id !== action.payload
        );
        state.response = "delete";
      });

      builder
      .addCase(addPoints.fulfilled, (state, action) => {
        const updateItem = action.payload;
        console.log(updateItem);
        const index = state.customerList.findIndex(
            (item) => item._id === updateItem._id
        );
        if (index !== -1) {
            state.customerList[index] = updateItem;
        }
        state.response = "update";
      });

      builder
      .addCase(redeemPoints.fulfilled, (state, action) => {
        const updateItem = action.payload;
        console.log(updateItem);
        const index = state.customerList.findIndex(
            (item) => item._id === updateItem._id
        );
        if (index !== -1) {
            state.customerList[index] = updateItem;
        }
        state.response = "update";
      });
    },
});

export default CustomerSlice.reducer;
export const { changeStateTrue, changeStateFalse, clearResponse} = CustomerSlice.actions;