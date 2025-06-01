export class ContactPage extends HTMLElement {
	connectedCallback() {
		this.innerHTML = "お問い合わせ";
	}
}

customElements.define("contact-page", ContactPage);