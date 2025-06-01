class AppPage extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<header>
				<nav>
					<k-link to="home-page">ホーム</k-link>
					<k-link to="about-page">自己紹介</k-link>
					<k-link to="contact-page">お問い合わせ</k-link>
					<!-- 
					管理者ページ
					管理者フラグが有効になっている従業員にのみ表示。
					-->
					<admin-link></admin-link>
				</nav>
			</header>
			<!-- 
				初期描画用のコンポーネントを描画する。
				初期描画用のコンポーネントは、initialize属性がonになっているコンポーネントを描画する。
				初期描画用のコンポーネントは、initializeView関数で定義されている。
			-->
			<k-content initialize="on"></k-content>
			<footer>フッター</footer>
		`;
	}
}

customElements.define("app-page", AppPage);