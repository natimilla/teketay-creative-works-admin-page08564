import { configureStore } from "@reduxjs/toolkit";
import Display from "./Display";
const store=configureStore({
   reducer:{display:Display}
})
export default store;