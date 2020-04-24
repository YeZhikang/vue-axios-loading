/**
 * 返回一个对象是否为DOM元素 || 字符串是否对应了一个DOM元素
 * @param val
 * @returns {{dom: HTMLElement, isDom: Boolean}}
 */
export function returnDom(val) {
    let isDom;
    if (typeof HTMLElement === 'object') isDom = (val instanceof HTMLElement)
    else{
        val = document.querySelector(val)
        isDom = !!val
    }
    return { isDom, dom: val }
}
