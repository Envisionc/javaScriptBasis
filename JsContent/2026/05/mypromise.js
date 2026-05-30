class MyPromise {
    constructor(executor) {
        this.state = 'pending';
        this.value = 'undefined';
        this.reason = 'undefined';
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
    }
    then(onFulfilled, onRejected) {
        if (this.state === 'pending') {
            this.onFulfilledCallbacks.push(onFulfilled);
            this.onRejectedCallbacks.push(onRejected);
        }
        if (this.state === 'fulfilled') {
            onFulfilled(this.value);
        }
        if (this.state === 'rejected') {
            onRejected(this.reason);
        }
    }
    catch(onRejected) {
        return this.then(null, onRejected);
    }
    resolve(value) {
        if (this.state === 'pending') {
            this.state = 'fulfilled';
            this.value = value;
        }
    }
    reject(reason) {
        if (this.state === 'pending') {
            this.state = 'rejected';
            this.reason = reason;
        }
    }
    finally(onFinally) {
        return this.then(onFinally, onFinally);
    }
}