//根據 fortawesome 官網提供的圖標 對應的名稱是哪一個，在 solid、regular、brands處導入對應的。
//之後在 library.add 處添加
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
// library.add(fas,far,fab)
export function getFontAwesome() :void{
    library.add(fas, far, fab )
}