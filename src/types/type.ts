//一般餐盒 資料型別
export type GeneralBoxes = {
  id: number
  name: string
  price: number
  composition: { // 營養素組成
    calories: number // 卡路里
    protein: number // 蛋白質
    adipose: number // 脂肪
    carbohydrate: number // 碳水化合物
    fiber: number  // 纖維
    sodium: number  // 鈉含量
  }
  ingredient: string; // 成分
  allergens: string; // 過敏原
  description: string; // 產品說明
  menuDescription: string; // 菜單說明
  imgArr: string[]; // 產品圖片
  star: number; // 評分
  quantity: number; // 庫存量
  createTime: string; // 建立時間 (ISO 日期格式)
}

//單一餐盒 資料型別
export type OneGeneralBox = {
  id: number;
  name: string;
  price: number;
  composition: {
    calories: number
    protein: number
    adipose: number
    carbohydrate: number
    fiber: number
    sodium: number
  };
  ingredient: string;
  allergens: string;
  description: string;
  menuDescription: string;
  imgArr: string[];
  star: number;
  quantity: number;
  createTime: string;
};

//購物車預覽列-獲取使用者一般餐盒購物車 型別
export type CartGeneralMealBoxes = {
  id: number
  name: string
  price: number
  composition: {
    calories: number
    protein: number
    adipose: number
    carbohydrate: number
    fiber: number
    sodium: number
  }
  ingredient: string
  allergens: string
  imgArr: string[]
  star: number
  quantity: number
  boxQuantity: number
}