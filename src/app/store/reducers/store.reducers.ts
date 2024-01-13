import {createReducer, on} from "@ngrx/store";
import {StoreInterface} from "../model/store.model";
import {increment, newCountry, newLang, newShoesData} from "../actions/store.actions";

export const store: StoreInterface = {
  count: 0,
  hl: 'en',
  country: 'US',
  load: false,
  dataList: []
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
  on(newShoesData, (state, action) =>{
    return {...state, dataList: action.value}
  })
)

