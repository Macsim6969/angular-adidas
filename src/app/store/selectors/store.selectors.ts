import {StoreInterface} from "../model/store.model";


export const storeSelectorLang = (store: {store: StoreInterface}) => store.store.hl;
export const storeSelectorCountry = (store: {store: StoreInterface}) => store.store.country;
export const storeSelectorShoesData = (store: {store: StoreInterface}) => store.store.dataList;
export const storeSelectorHoodiesData = (store: {store: StoreInterface}) => store.store.hoodiesList
