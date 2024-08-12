const themeColor = ['primary', 'success', 'warning', 'danger', 'error', 'info']
const setColor = (colorGroup) => {
    const colors = {}
    colorGroup.forEach(name => {
        colors[`el-${name}`] = `var(--el-color-${name})`
        colors[`el-${name}-light-3`] = `var(--el-color-${name}-light-3)`
        colors[`el-${name}-light-5`] = `var(--el-color-${name}-light-5)`
        colors[`el-${name}-light-7`] = `var(--el-color-${name}-light-7)`
        colors[`el-${name}-light-8`] = `var(--el-color-${name}-light-8)`
        colors[`el-${name}-light-9`] = `var(--el-color-${name}-light-9)`
        colors[`el-${name}-dark-2`] = `var(--el-color-${name}-dark-2)`
    })
    return colors
}

export const getElementPlusThemColor = () => {
    const colors = {}
    Object.assign(colors, setColor(themeColor))
    return colors
}

/*
此為 讓 tailwindcss 的 顏色 ，可以使用 element-plus 產生出來的顏色來使用。
但是，因為我們 element-plus 採用 自動導入，所以若 "整個" 網頁都沒有使用 element的元件的話，那顏色就不會導入進去，也會導致tailwind即使取得顏色，也是沒有顏色變化的
目前解決此問題的方式為
法I : 全局配置一個 Element-plus 的元件
法II : 有使用 Element-plus 的元件 頁面，隨便一個頁面就好，在router配置上不使用懶加載的方式 import

*/