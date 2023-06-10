import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { persistStore, persistReducer } from "redux-persist";
import createRootReducer from "./reducers";
import { applyMiddleware, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import rootSaga from "./sagas";
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const persistConfig = {
    key: "root",
    storage: storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ["user"],
    blacklist: [],
};

const persistedReducer = persistReducer(
    persistConfig,
    createRootReducer(history)
);

export const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(routerMiddleware(history), sagaMiddleware)
    )
);

export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);