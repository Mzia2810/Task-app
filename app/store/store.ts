import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import { buildGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import visitSlice from "./visitSlice";
import { persistStore,persistReducer, } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import gallerySlice from "./gallerySlice";

const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
}
const rootReducer = combineReducers({
    visit: visitSlice,
    gallery:gallerySlice,
})

const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:['persist/PERSIST', 'persist/REHYDRATE'],
            serializableCheck:false,
        },
    }),

});

export const persistor = persistStore(store)


export default store;