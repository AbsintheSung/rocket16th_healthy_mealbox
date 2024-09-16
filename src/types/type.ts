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

//營養師方案 資料型別
export type NutritionistPlan = {
  id: number
  nutritionistName: string
  nutritionistImg: string
  nutritionistSeniority: string
  caseType: number
  caseName: string
  caseThumbnail: string
  caseDescription: string
  boxes: number[]
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

//購物車價錢資訊 型別
export type CartInfo = {
  prize: number;
  freightFree: boolean;
  expirationDate: string;
};

//會員資料型別
// export type MemberInfo = {
//   id: number | null
//   userImg: string | null
//   name: string | null
//   account: string | null
//   permission: string | null
//   phoneNumber: string | null
//   birthDate: string | null
//   gender: number | null // 0: 男生 1:女 2:其他
//   city: string | null
//   area: string | null
//   address: string | null
//   createTime: string | null
// }
export type MemberInfo = {
  id: number
  userImg: string
  name: string
  account: string
  permission: string
  phoneNumber: string
  birthDate: string
  gender: number  // 0: 男生 1:女 2:其他
  city: string
  area: string
  address: string
  createTime: string
}

// 定義 GeneralBoxes訂單 型別
export type GeneralBoxesOrder = {
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
  description?: string
  menuDescription?: string
  imgArr: string[]
  star: number
  quantity: number
  boxQuantity: number
  createTime?: string
}

// 定義 CustomizeBoxes訂單 型別
export type CustomizeBoxesOrder = {
  id: number
  userId: number
  name: string
  price: number
  template: string
  starch: number[] // 澱粉類
  mainMeal: number[] // 主餐
  sideDishes: number[] // 配菜
  remark: string
  composition: {
    calories: number
    protein: number
    adipose: number
    carbohydrate: number
    fiber: number
    sodium: number
  }
  allergens: string
  imgSrc: string
  boxQuantity: number
}

// 定義 CartOrder 型別
export type CartOrder = {
  id: number
  userId: number
  caseType: number
  customizeBoxes: CustomizeBoxesOrder[]
  generalBoxes: GeneralBoxesOrder[]
  price: number
  freightFree: boolean
  expirationDate: string // ISO 日期格式
}

// 定義 Order 型別
export type Order = {
  id: number // 訂單 id
  userId: number // 會員 id
  orderNumber: string // 訂單號碼
  orderStatus: 'paid' | 'unpaid' // 付款狀態
  orderPrice: number // 含運費的總價
  shippingRegion: string // 送貨地區
  shippingMethod: '新竹貨運' | '超商冷凍宅配' // 送貨方式
  paymentMethod: 'onlinePayment' | 'cashOnDelivery' // 付款方式
  senderName: string // 寄貨者名稱
  senderEmail: string // 寄貨者電子信箱
  senderPhoneNumber: string // 寄貨者電話號碼
  senderBirthday: string // 寄貨者生日 (ISO 日期格式)
  orderNotes: string // 訂單備註
  recipientName: string // 收貨者名稱
  recipientPhoneNumber: string // 收貨者電話
  recipientCity: string // 收貨者城市
  recipientArea: string // 收貨者地區
  recipientAddress: string // 收貨者詳細地址
  createTime: string // 訂單建立時間 (ISO 日期格式)
  cartOrder: CartOrder // 購物車訂單資料
}

//定義自定義菜單型別
export type customMenu = {
  id: number;
  dishesType: "mainMeal" | "sideDishes" | "starch";
  name: string;
  price: number;
  grams: number;
  img: string;
  composition: {
    calories: number;
    protein: number;
    adipose: number;
    carbohydrate: number;
    fiber: number;
    sodium: number;
  };
  allergens: string;
  quantity: number;
};


//自定義餐盒列表 型別
export type customMealBox = {
  id: number;
  name: string;
  price: number;
  template: string;
  starch: number[]; // 澱粉，裡面只裝id
  mainMeal: number[]; // 主食，裡面只裝id
  sideDishes: number[]; // 配菜 裡面只裝id
  remark: string;
  composition: {
    calories: number;
    protein: number;
    adipose: number;
    carbohydrate: number;
    fiber: number;
    sodium: number;
  };
  allergens: string;
  imgSrc: string;
  createTime: string;
};