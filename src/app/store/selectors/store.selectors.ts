import {StoreInterface} from "../model/store.model";


export const storeSelectorLang = (store: {store: StoreInterface}) => store.store.hl;
export const storeSelectorCountry = (store: {store: StoreInterface}) => store.store.country;
export const storeSelectorShoesData = (store: {store: StoreInterface}) => store.store.dataList;
export const storeSelectorHoodiesData = (store: {store: StoreInterface}) => store.store.hoodiesList

export const storeSelectorClothesData = (store: {store: StoreInterface}) => store.store.clothes

export const storeSelectorFavourites = (store: {store: StoreInterface}) => store.store.favouriteClothes
