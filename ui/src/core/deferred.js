export default class Deferred {
    promise;then;reject;resolve;catchError;
    constructor(){
        this.promise = new Promise((function(resolve, reject) {
            this.resolve = resolve;
            this.reject = reject;
          }).bind(this));

          this.then = this.promise.then.bind(this.promise);
          this.catchError = this.promise.catch.bind(this.promise);
    }

  };
