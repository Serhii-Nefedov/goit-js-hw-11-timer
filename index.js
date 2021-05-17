//Плагин это класс CountdownTimer, экземпляр которого создает новый таймер с настройками.
 
class CountdownTimer {
  constructor(obj) {
    this.selector = obj.selector;
    this.targetDate = obj.targetDate;
    this.DELAY = 1000;
    this.intervalId = null;
  }
  
  pad(value) {
    return String(value).padStart(2, '0');
}

  onStartTimer() {
    this.intervalId = setInterval(() => {
      const time = this.targetDate - Date.now();
      console.log(time);
      if (time < 0) {
        clearInterval(this.intervalId);
        return;
      }
      const { days, hours, mins, secs } = this.getTime(time);
      this.getRefs().days.textContent = days;
      this.getRefs().hours.textContent = hours;
      this.getRefs().mins.textContent = mins;
      this.getRefs().secs.textContent = secs;
    }, this.DELAY);
  }
  getRefs() {
    const container = document.querySelector(this.selector);
    return {
      days: container.querySelector('[data-value="days"]'),
      hours: container.querySelector('[data-value="hours"]'),
      mins: container.querySelector('[data-value="mins"]'),
      secs: container.querySelector('[data-value="secs"]'),
    };
  }
  getTime(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('May 31, 2022'),
}).onStartTimer()

