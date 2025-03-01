import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { reducers } from "./combineReducer";

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(logger);
    },
    devTools: true,
});