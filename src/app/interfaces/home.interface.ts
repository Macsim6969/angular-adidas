export interface MenuList {
  name: string
  route: string
}

export interface MenListMenu {
  image: string
  name: string
  route: string
}

export interface ProdsFromService {
  id:number
  categ: string
  category: string
  descriptions: {
    image: string
    name: string
    text: string
  }
  details: string[]
  galleryDop: [{
    info: string[]
  }]
  imageURL: string[]
  imageURL_hover: string
  name: string
  desc: string
  price: number
  tage: string
  sizes: string[]
  activeColor?: number
  activeSize?: any
  favouriteClothes?: boolean
}

export interface Popup{
  addToBags: string
  addToFavourite: string
  removeFromFavourites: string
}
