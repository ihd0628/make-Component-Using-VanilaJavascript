import Component from "../core/Component.js";

export default class ItemAppender extends Component {
  templete() {
    return `<input type="text" class="appender" placeholder="아이템 내용 입력" />`;
  }

  setEvent() {
    console.log(this.$props);
    const { addItem } = this.$props;
    this.addEvent("keyup", ".appender", ({ key, target }) => {
      if (key !== "Enter") return;
      addItem(target.value);
    });
  }
}
