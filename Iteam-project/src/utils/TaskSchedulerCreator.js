let TaskSchedulerCreator = function (intervalMillis, task) {

  let intervalID;

  this.start = function () {
    intervalID = setTimeout(() => {
      task(this.start.bind(this))
    }, intervalMillis);
  };

  this.executeNow = function () {
    clearTimeout(intervalID);
    task(this.start.bind(this))
  };

  this.stop = function () {
    clearTimeout(intervalID)
  }
};

export default TaskSchedulerCreator
