import { initializeView, components } from "./initialize.js";
/** 
 * 指定可能な属性:
 * - to: このリンクがクリックされた時の遷移先のコンポーネント名で、k-contentコンポーネント内に描画する（innerHTMLする）
 */
class KLink extends HTMLElement {
	connectedCallback() {
		const componentName = this.getAttribute("to");

		/** コンポーネント名が指定されているか確認 */
		if (componentName) {
			this.addEventListener("click", () => {
				const kContent = document.querySelector("k-content");
				kContent.innerHTML = "";
				
				/** コンポーネントが存在するか確認 */
				if (components[componentName]) {
					const kComponent = new components[componentName]();
					kContent.appendChild(kComponent);
				} else {
					console.error(`${componentName}コンポーネントが見つかりません`);
				}
			});
		} else {
			console.error("k-linkコンポーネントにto属性が指定されていません");
		}
	}
}

class KContent extends HTMLElement {
	connectedCallback() {
		this.innerHTML = "";
		this.initialize();
	}

	initialize() {
		const initialize = this.getAttribute("initialize");
		if (initialize === "on") {
			const kComponent = initializeView();
			if (kComponent) {
				this.appendChild(kComponent);
			}
		}
	}
}

customElements.define("k-link", KLink);
customElements.define("k-content", KContent);