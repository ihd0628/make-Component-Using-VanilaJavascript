import Component from "../core/Component.js";

export default class Items extends Component {
  setup() {
    this.$state = {
      items: ["item1", "item2"],
    };
  }

  templete() {
    const { items } = this.$state;
    return `
        <h1>컴포넌트 연습</h1>
        <ul>
        ${items
          .map(
            (item, index) =>
              `<li>${item}</li><button data-index='${index}' class='deleteBtn'>삭제</button>`
          )
          .join("")}
        </ul>
        <button class='addBtn'>추가</button>
    `;
  }

  setEvent() {
    this.addEvent("click", ".addBtn", ({ target }) => {
      const { items } = this.$state;
      this.setState({ items: [...items, `itme${items.length + 1}`] });
    });

    this.addEvent("click", ".deleteBtn", ({ target }) => {
      const { items } = this.$state;
      items.splice(target.dataset.index, 1);
      this.setState({ items });
    });
  }
}
