import App from "./app.js";
import { Store, Subscriber } from "./stateManagement/stateManagement.js";

export const store = new Store({ a: 10, b: 20 });
const reRenderApp = new Subscriber(
  () => new App(document.querySelector("#app"))
);
reRenderApp.subscribe(store);
