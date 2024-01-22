export interface MenuList {
  name: string
  route: string
}

export interface MenListMenu {
  image: string
  name: string
  route: string
}
export interface MenuListMenuShoper {
  ['list-item']: string
  filter: string
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
  sizes: string[]
}
