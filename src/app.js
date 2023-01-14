import Items from "./components/Items.js";

export default class App {
  constructor() {
    const $app = document.getElementById("app");
    new Items($app);
  }
}
