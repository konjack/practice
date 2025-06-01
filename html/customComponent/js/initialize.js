import { HomePage } from "./home.js";
import { AboutPage } from "./about.js";
import { ContactPage } from "./contact.js";
import { AdminPage } from "./admin.js";

/**
 * コンポーネント名とコンポーネントクラスのマッピング
 */
export const components = {
	"home-page": HomePage,
	"about-page": AboutPage,
	"contact-page": ContactPage,
	"admin-page": AdminPage,
};


/**
 * 初期描画用のコンポーネントを返す
 * falseを返すと初期描画を行わない
 */
export function initializeView() {
	return new HomePage();
}

