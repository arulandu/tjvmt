export class Timer {
  t: Date
  
  constructor(){
    this.t = new Date()
  }

  time(){
    const tmp = new Date();
    const diff = (tmp.getTime()-this.t.getTime())/1000
    this.t = tmp;
    return diff
  }
}