export class Store {
  #state;
  #observers = new Set();

  constructor(state) {
    this.#state = state;
    Object.keys(state).forEach((key) =>
      Object.defineProperty(this, key, {
        get: () => this.#state[key],
      })
    );
    console.log(this.#observers);
  }

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.notify();
  }

  addSubscribe(subscriber) {
    this.#observers.add(subscriber);
  }

  notify() {
    this.#observers.forEach((fn) => fn());
  }
}

export class Subscriber {
  #fn;

  constructor(setAction) {
    this.#fn = setAction;
  }

  subscribe(publisher) {
    publisher.addSubscribe(this.#fn);
  }
}
