export type NutritionalInfo = {
  calories: number
  protein: number
  adipose: number
  carbohydrate: number
  fiber: number
  sodium: number
}
export type GeneralBoxes = {
  id: number
  name: string
  price: number
  composition: NutritionalInfo
  ingredient: string
  allergens: string
  imgArr: string[]
  star: number
  quantity: number
  boxQuantity: number
}
