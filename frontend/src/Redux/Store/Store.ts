
import { combineReducers, type AnyAction } from "redux"
import userReducer from '../User/userSlice'
import {persistReducer , persistStore} from 'redux-persist'
import { configureStore, type ThunkDispatch } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage'
import otpReducer from '../Otp/OtpSlice'
import adminReducer from '../admin/adminSlice'

const persistConfig = {
    key : "root",
    storage,
    whitelist : ['user','admin','host']
}

const rootReducer = combineReducers ({
    user : userReducer,
    otp  : otpReducer,
    admin : adminReducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = configureStore ({
    reducer : persistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false
    })
})

export const persister = persistStore (store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export {store}