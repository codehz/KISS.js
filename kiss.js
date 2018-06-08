'use strict'

function parseName(name) {
  const [s1, r1] = name.split('#')
  if (r1) {
    const ret = document.createElement(s1)
    const [s2, ...r2] = r1.split('.')
    ret.id = s2
    for (let clazz of r2)
      ret.classList.add(clazz)
    return ret
  } else {
    const [s2, ...r2] = s1.split('.')
    const ret = document.createElement(s2)
    for (let clazz of r2)
      ret.classList.add(clazz)
    return ret
  }
}
async function process(el, ret) {
  if (ret == null || ret == undefined) {
    return
  } else if (ret instanceof HTMLElement) {
    el.appendChild(ret)
  } else if (typeof ret == 'string') {
    el.textContent = ret
  } else if (ret[Symbol.iterator]) {
    for (let item of ret) {
      await process(el, item)
    }
  } else if (typeof ret == 'number') {
    el.textContent = ret + ''
  } else if (typeof ret.then == 'function') {
    await process(el, await ret);
  } else if (typeof ret == 'function') {
    switch (ret[Symbol.toStringTag]) {
    case 'AsyncGeneratorFunction':
      for await (const item of ret()) {
        await process(el, item)
      }
      break;
    default:
      await process(el, ret(el))
    }
  }
}
export function ce(name, ...rest) {
  const el = typeof name == 'object' ? name : parseName(name)
  while (el.firstChild) el.firstChild.remove();
  (async () => {
    for (let p of rest) {
      await process(el, await p)
    }
  })()
  return el;
}
export function discard(fn) {
  return function (...args) {
    fn.call(this, ...args)
    return;
  }
}
export function on(event, fn) {
  return discard(el => el.addEventListener(event, fn))
}
export function attr(obj) {
  return discard(el => {
    for (const [k, v] of Object.entries(obj)) {
      el[k] = v
    }
  })
}