import { configureStore } from "@reduxjs/toolkit";
import customersSlice from "../Features/CustomerSlice";


const store = configureStore({
  reducer: {
    customerKey: customersSlice,
  },
});

export default store;