// 添加className
export function addClass(el, className) {
  if (hasClass(el, className)) return
    // console.log(hasClass(el, className))
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

// 是否有className
export function hasClass(el, className) {
  console.log(el.className)
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
// setAttribute创建或改变某个新属性。
export function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  // console.log(name, val)
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}

let elementStyle = document.createElement('div').style

// IIFE
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  console.log(elementStyle)
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }
  console.log(style)
  console.log(vendor + style.charAt(0).toUpperCase() + style.substr(1))
  // 拼接 eg：webkitTransform
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}