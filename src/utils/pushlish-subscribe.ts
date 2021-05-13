const Event = (function Event() {
    const clientList: string[] = []
  
    const listen = function listen (key: string, fn: any) {
      if (!clientList[key]) {
        clientList[key] = []
      }
      console.log(typeof (fn))
      clientList[key].push(fn)
    }
  
    const trigger = function trigger(this: { listen: (key: string, fn: any) => void; trigger: (key: string, obj: any) => void; remove: (key: string, fn: any) => void }, key: string, obj: any) {
    //   const key = Array.prototype.shift.call(arguments)
      const fns = clientList[key]
      console.log(fns)
      if (!fns || fns.length === 0) {
        return
      }
  
      for (let i = 0; i < fns.length; i += 1) {
        const fn = fns[i]
        fn.call(this, obj)
      }
    }
  
    const remove = function remove(key: string, fn: any) {
      const fns = clientList[key]
      if (!fns) {
        return
      }
  
      if (!fn) {
        fns.length = 0
      } else {
        for (let len = fns.length - 1; len >= 0; len -= 1) {
          const fn1 = fns[len]
          if (fn1 === fn) {
            fns.splice(len, 1)
          }
        }
      }
    }
  
    return {
      listen,
      trigger,
      remove
    }
  })()
export default Event