export class AdminLink extends HTMLElement {
	connectedCallback() {
		this.innerHTML = "<k-link to='admin-page'>管理者ページ</k-link>";
	}
}

export class AdminPage extends HTMLElement {
	connectedCallback() {
		this.innerHTML = "管理者ページ";
	}
}

customElements.define("admin-link", AdminLink);
customElements.define("admin-page", AdminPage);