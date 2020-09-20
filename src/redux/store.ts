import { createStore, Store } from "redux";
import { FullState, rootReducer } from "./reducers";

function setupStore(): Store<FullState> {
	return createStore(rootReducer);
}

export default setupStore();
