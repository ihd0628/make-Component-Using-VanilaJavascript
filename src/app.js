import Items from "./components/Items.js";
import Component from "./core/Component.js";
import ItemAppender from "./components/ItemAppender.js";
import ItemFilter from "./components/ItemFilter.js";
import { observable } from "./stateManagement/observer.js";
import { store } from "./store.js";

export default class App extends Component {
  setup() {
    this.$state = {
      isFilter: 0,
      items: [
        {
          seq: 1,
          contents: "item1",
          active: false,
        },
        {
          seq: 2,
          contents: "item2",
          active: true,
        },
      ],
    };
  }

  templete() {
    return `
      <header data-component = 'item-appender'></header>
      <main data-component = 'items'></main>
      <footer data-component = 'item-filter'></footer>
      중앙 상태 관리 a : ${store?.a}</br>
      중앙 상태 관리 b : ${store?.b}</br>
    `;
  }

  mounted() {
    const { filteredItems, addItem, deleteItem, toggleItem, filterItem } = this;
    const $itemAppender = this.$target.querySelector(
      '[data-component="item-appender"]'
    );
    const $items = this.$target.querySelector('[data-component="items"]');
    const $itemFilter = this.$target.querySelector(
      '[data-component="item-filter"]'
    );
    new ItemAppender($itemAppender, {
      addItem: addItem.bind(this),
    });
    new Items($items, {
      filteredItems,
      deleteItem: deleteItem.bind(this),
      toggleItem: toggleItem.bind(this),
    });
    new ItemFilter($itemFilter, {
      filterItem: filterItem.bind(this),
    });
  }

  get filteredItems() {
    const { isFilter, items } = this.$state;
    return items.filter(({ active }) => {
      return (
        (isFilter === 1 && active) ||
        (isFilter === 2 && !active) ||
        isFilter === 0
      );
    });
  }

  addItem(contents) {
    const { items } = this.$state;
    const seq = Math.max(0, ...items.map((v) => v.seq)) + 1;
    const active = false;
    this.setState({
      items: [...items, { seq, contents, active }],
    });
    store.setState({ b: 400 });
  }

  deleteItem(seq) {
    const items = [...this.$state.items];
    items.splice(
      items.findIndex((v) => v.seq === seq),
      1
    );
    this.setState({ items });
  }

  toggleItem(seq) {
    const items = [...this.$state.items];
    const index = items.findIndex((v) => v.seq === seq);
    items[index].active = !items[index].active;
    this.setState({ items });
  }

  filterItem(isFilter) {
    this.setState({ isFilter });
  }
}
