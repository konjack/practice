import Div from "../elements/Div.js";

let instance;
const ids = {
  name: "user-name",
  email: "user-email"
};
// concern: detail of user(display, getter / setter)
class UserDetail {
  static render() {
    return /* html */ `
      <i class="center extra-large material-symbols-outlined">account_circle</i>
      <div id="${ids.name}" class="middle"></div><br />
      <div id="${ids.email}" class="small"></div><br />
    `;
  }
  static getInstance() {
    if (!instance) instance = new UserDetail();
    return instance;
  }
  constructor() {
    this.elems = {
      name: new Div(`#${ids.name}`),
      email: new Div(`#${ids.email}`)
    };

    // state
    this.userProps = {
      name: "",
      email: ""
    };
  }
  async init() {
    this.userProps = await this.getUserProps();
    this.elems.name.element.textContent = this.userProps.name;
    this.elems.email.element.textContent = this.userProps.email;
  }
  async getUserProps() {
    const resp = await fetch("/component/server/user.json");
    return await resp.json();
  }
}

export const { getInstance, render } = UserDetail;
