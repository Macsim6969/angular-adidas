import {createReducer, on} from "@ngrx/store";
import {StoreInterface} from "../model/store.model";
import {
  favouriteClothes,
  increment,
  newClothesData,
  newCountry,
  newHoodiesData,
  newIdUser,
  newLang,
  newShoesData
} from "../actions/store.actions";

export const store: StoreInterface = {
  count: 0,
  hl: 'en',
  country: 'US',
  load: false,
  dataList: [],
  hoodiesList: [],
  clothes: [],
  favouriteClothes: [],
  idUser: null
}

export const storeReducers = createReducer(store,
  on(increment, (state, actions) => {
    return {...store, count: state.count + actions.value}
  }),
  on(newLang, (state, action) => {
    return {...state, hl: action.value}
  }),
  on(newCountry, (state, action) => {
    return {...state, country: action.value}
  }),
  on(newShoesData, (state, action) => {
    return {...state, dataList: action.value}
  }),
  on(newHoodiesData, (state, action) => {
    return {...state, hoodiesList: action.value}
  }),
  on(newClothesData, (state, action) =>{
    return {...state, clothes: action.value}
  }),(
  on(newIdUser, (state, action) => {
    return {...state, idUser: action.value}
  })),
  on(favouriteClothes, (state, action) => {
    return {...state, favouriteClothes: action.value}
  })
)

