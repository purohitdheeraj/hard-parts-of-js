class PubSub{
  constructor(){
    this.events = {}
  }

  subscribe(eventName, callback){
    if(eventName in this.events){
      this.events[eventName].push(callback)
    }else{
      this.events[eventName] = [callback]
    }
  }

  publish(eventName, args=[]){
    if(!Array.isArray(this.events[eventName])) return []

    return this.events[eventName].forEach(event => {
      return event(args)
    })

  }

  unsubscribe(eventName, callback){
    if(Array.isArray(this.events[eventName])){
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback)
      return;
    }
  }
}


const emitter = new PubSub()

let cb = (greeting)=> console.log(`hare krishna ${greeting}`)

emitter.subscribe('emit', cb)

emitter.publish('emit', "hare rama")

emitter.unsubscribe('emit', cb)

console.log(emitter.publish('emit', 'radhe shyam'))