const throttle = (cb, delay) => {
  let throttleStatus = null
  let storedEvent = null

  return function throttleCallback(event){
    // if throttle free
    storedEvent = event;
    let shouldHandleEvent = !throttleStatus

    if(shouldHandleEvent){
      cb(storedEvent)
    
      storedEvent = null;

      throttleStatus = setTimeout(()=>{
        throttleStatus = null
        if(storedEvent){
          throttleCallback(storedEvent)
        }
      }, delay)
    }

  }
}