
/**
 * 判断是否为空
 */
export function validatenull(val) {
    if (val instanceof Array) {
        if (val.length === 0) return true;
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === '{}') return true;
    } else {
        if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true;
        return false;
    }
    return false;

};
/**
 * 存储localStorage或sessionStorage
 */
export const setStore = (params) => {
  const {
    name,
    content,
    type,
    datetime
  } = params;
  const obj = {
    dataType: typeof (content),
    content: content,
    type: type,
    datetime: new Date().getTime()
  }
  if (type) window.sessionStorage.setItem(name, JSON.stringify(obj))
  else window.localStorage.setItem(name, JSON.stringify(obj))
}
/**
 * 获取localStorage或sessionStorage
 */
export const getStore = (params) => {
  const {
    name,
    type
  } = params;
  let obj = {},content;
  obj = window.localStorage.getItem(name);
  if (validatenull(obj)) obj = window.sessionStorage.getItem(name);
  if (validatenull(obj)) return;
  obj = JSON.parse(obj);
  if (obj.dataType === 'string') {
    content = obj.content
  } else if (obj.dataType === 'number') {
    content = Number(obj.content)
  } else if (obj.dataType === 'boolean') {
    content = eval(obj.content)
  } else if (obj.dataType === 'object') {
    content = obj.content
  }
  return content
}
/**
 * 删除localStorage,sessionStorage
 */
export const removeStore = (params) => {
    if (params) {
        let {
            name
        } = params
        window.localStorage.removeItem(name)
        window.sessionStorage.removeItem(name)
        return
    }
    window.sessionStorage.clear()
    window.localStorage.clear()
}
