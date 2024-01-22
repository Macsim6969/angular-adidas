import {createAction, props, Action} from "@ngrx/store";
import {ProdsFromService} from "../../interfaces/home.interface";

export const INCREMENT = "INCREMENT"
export const NEWLANG = 'NEWLANG'
export const NEWCOUNTRY = 'NEWCOUNTRY'
export const NEWSHOESDATA = 'NEWSHOESDATA'
export const NEWHOODIESDATA = 'NEWHOODIESDATA'

export const increment = createAction(
  INCREMENT,
  props<{value: number}>()
)

export const newLang = createAction(
  NEWLANG,
  props<{value: string}>()
)

export const newCountry = createAction(
  NEWCOUNTRY,
  props<{value: string}>()
)

export const newShoesData = createAction(
  NEWSHOESDATA,
  props<{value: any}>()
)

export const newHoodiesData = createAction(
  NEWHOODIESDATA,
  props<{value: any}>()
)
