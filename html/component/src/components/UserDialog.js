import Button from "../elements/Button.js";
import Dialog from "../elements/Dialog.js";
import * as UserDetail from "./UserDetail.js";

let instance;
const ids = {
	open: "user-dialog-open",
	close: "user-dialog-close",
	dialog: "user-dialog"
};
// concern: dialog(open, close, display)
class UserDialog extends Dialog {
	static render() {
		// Syntax highlighting
		// https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html
		return /* html */ `
			<button id="${ids.open}" class="right large material-symbols-outlined">
				account_circle
			</button>
			<dialog id="${ids.dialog}">
			<button id="${ids.close}" class="right large material-symbols-outlined">
				close
			</button>
			${UserDetail.render()}
		</dialog>
	`;
	}
	static getInstance() {
		if (!instance) instance = new UserDialog();
		return instance;
	}
	constructor() {
		super(`#${ids.dialog}`);
	}

	init() {
		new Button(`#${ids.open}`).element.addEventListener("click", (event) =>
			this.element.showModal()
		);
		new Button(`#${ids.close}`).element.addEventListener("click", (event) =>
			this.element.close()
		);
		UserDetail.getInstance().init();
		return this;
	}
}

export const { getInstance, render } = UserDialog;
