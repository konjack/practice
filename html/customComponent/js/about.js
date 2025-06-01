export class AboutPage extends HTMLElement {
	connectedCallback() {
		this.innerHTML = "自己紹介";
	}
}

customElements.define("about-page", AboutPage);