export class HomePage extends HTMLElement {
	connectedCallback() {
		this.innerHTML = "ホーム";
	}
}

customElements.define("home-page", HomePage);