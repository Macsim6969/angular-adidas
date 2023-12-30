import {createAction, props, Action} from "@ngrx/store";

export const INCREMENT = "INCREMENT"
export const NEWLANG = 'NEWLANG'
export const NEWCOUNTRY = 'NEWCOUNTRY'

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
