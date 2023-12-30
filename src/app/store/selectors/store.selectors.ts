import {createSelector} from "@ngrx/store";
import {StoreInterface} from "../model/store.model";


export const storeSelectorsCount =(store: {store: StoreInterface}) => store.store.count;
export const storeSelectorLang = (store: {store: StoreInterface}) => store.store.hl;
export const storeSelectorCountry = (store: {store: StoreInterface}) => store.store.country;
