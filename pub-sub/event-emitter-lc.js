class EventEmitter {
  constructor(){
      this.events = {}
  }

  /**
   * @param {string} eventName
   * @param {Function} callback
   * @return {Object}
   */
  subscribe(eventName, callback) {
      if(eventName in this.events){
          this.events[eventName].push(callback)
      } else{
          this.events[eventName] = [callback]
      }

      return {
          unsubscribe: () => {
              this.events[eventName] = this.events[eventName].filter(cb => cb !== callback)
              return
          }
      };
  }
  
  /**
   * @param {string} eventName
   * @param {Array} args
   * @return {Array}
   */
  emit(eventName, args = []) {
      if(!this.events[eventName]) return []

      return this.events[eventName].map(event => event(...args))        
  }
}


 const emitter = new EventEmitter();

 // Subscribe to the onClick event with onClickCallback
 function onClickCallback() { return 99 }
 const sub = emitter.subscribe('onClick', onClickCallback);

 emitter.emit('onClick'); // [99]
 sub.unsubscribe(); // undefined
 emitter.emit('onClick'); // []
