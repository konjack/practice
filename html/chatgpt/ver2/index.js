// Combined JavaScript file with slot integration and dynamic routing

class Router {
	constructor() {
	  this.routes = {};
	  window.addEventListener('hashchange', () => this.renderRoute());
	}
  
	// Register routes
	registerRoute(path, renderCallback) {
	  this.routes[path] = renderCallback;
	}
  
	// Render the current route
	renderRoute() {
	  const path = window.location.hash.replace('#', '') || 'home';
	  const renderCallback = this.routes[path];
	  if (renderCallback) {
		renderCallback();
	  } else {
		console.error(`No route found for path: ${path}`);
	  }
	}
  
	init() {
	  this.renderRoute();
	}
  }
  
  const router = new Router();
  
  // CustomeFrameContent: A parent component using slots
  class CustomeFrameContent extends HTMLElement {
	connectedCallback() {
	  this.innerHTML = `
		<div style="display: flex; height: calc(100vh - 50px);">
		  <slot name="side-bar" style="height: 100%; flex-shrink: 0;"></slot>
		  <slot name="content" style="height: 100%; flex-grow: 1; overflow-y: auto;"></slot>
		</div>
	  `;
	}
  }
  customElements.define('custome-frame-content', CustomeFrameContent);
  
  // CustomeHeader: Static header component
  class CustomeHeader extends HTMLElement {
	connectedCallback() {
	  this.innerHTML = `
		<header style="background-color: #333; color: white; padding: 10px; text-align: center; height: 50px;">
		  <h1 style="margin: 0;">My App Header</h1>
		</header>
	  `;
	}
  }
  customElements.define('custome-header', CustomeHeader);
  
  // HomeView: Content for the home page
  class HomeView extends HTMLElement {
	connectedCallback() {
	  this.innerHTML = `
		<section style="padding: 20px; height: 100%;">
		  <h1>Welcome to the Home Page</h1>
		  <p>This is the main content area for the home page.</p>
		</section>
	  `;
	}
  }
  customElements.define('home-view', HomeView);
  
  // SettingsView: Content for the settings page
  class SettingsView extends HTMLElement {
	connectedCallback() {
	  this.innerHTML = `
		<section style="padding: 20px; height: 100%;">
		  <h1>Settings Page</h1>
		  <p>Manage your application settings here.</p>
		</section>
	  `;
	}
  }
  customElements.define('settings-view', SettingsView);
  
  // HomeSidebar: Sidebar for the home page
  class HomeSidebar extends HTMLElement {
	connectedCallback() {
	  this.innerHTML = `
		<aside style="width: 200px; background: #f4f4f4; padding: 10px; height: 100%; overflow-y: auto;">
		  <ul>
			<li>Home Link</li>
			<li>About Link</li>
		  </ul>
		</aside>
	  `;
	}
  }
  customElements.define('home-sidebar', HomeSidebar);
  
  // SettingsSidebar: Sidebar for the settings page
  class SettingsSidebar extends HTMLElement {
	connectedCallback() {
	  this.innerHTML = `
		<aside style="width: 200px; background: #f4f4f4; padding: 10px; height: 100%; overflow-y: auto;">
		  <ul>
			<li>Option 1</li>
			<li>Option 2</li>
		  </ul>
		</aside>
	  `;
	}
  }
  customElements.define('settings-sidebar', SettingsSidebar);
  
  // TodoApp: Root component to initialize the application
  class TodoApp extends HTMLElement {
	connectedCallback() {
	  this.innerHTML = `
		<custome-frame-header>
		  <custome-header></custome-header>
		</custome-frame-header>
		<custome-frame-content>
		  <home-sidebar slot="side-bar"></home-sidebar>
		  <home-view slot="content"></home-view>
		</custome-frame-content>
	  `;
  
	  const frameContent = this.querySelector('custome-frame-content');
  
	  // Register routes
	  router.registerRoute('home', () => {
		frameContent.innerHTML = `
		  <home-sidebar slot="side-bar"></home-sidebar>
		  <home-view slot="content"></home-view>
		`;
	  });
  
	  router.registerRoute('settings', () => {
		frameContent.innerHTML = `
		  <settings-sidebar slot="side-bar"></settings-sidebar>
		  <settings-view slot="content"></settings-view>
		`;
	  });
  
	  router.init();
	}
  }
  customElements.define('todo-app', TodoApp);
  