class CustomeComponent extends HTMLElement {
	constructor() {
		super();
		console.log('インスタンス化された？');
		const shadow = this.attachShadow({mode:'open'});
		shadow.innerHTML = `
            <style>
                p {
                    color: blue;
                    font-size: 1.2em;
                }
            </style>
            <p>Hello, Custom Component!</p>
        `;
	}

	connectedCallback() {
		if(this.count === undefined) {
			this.count = 0;
		}
		console.log(`要素が${this.count++}回追加されたよ。`);
	}

	disconnectedCallback() {
		console.log('削除されたよ');
	}
}



customElements.define('custome-component', CustomeComponent);