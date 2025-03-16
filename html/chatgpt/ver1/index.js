// todo-app.js
class TodoApp extends HTMLElement {
	connectedCallback() {
	  window.addEventListener('hashchange', () => this.updatePage());
	  this.updatePage(); // 初期描画
	}
  
	updatePage() {
	  const currentPage = window.location.hash.replace('#', '') || 'home';
	  this.querySelector('custome-side-bar').setAttribute('page', currentPage);
	  this.querySelector('cutome-content').setAttribute('page', currentPage);
	}
  }
  customElements.define('todo-app', TodoApp);
  
  // custome-side-bar.js
  class CustomeSideBar extends HTMLElement {
	static get observedAttributes() {
	  return ['page'];
	}
  
	attributeChangedCallback(name, oldValue, newValue) {
	  if (name === 'page') {
		this.render(newValue);
	  }
	}
  
	render(page) {
	  this.innerHTML = '';
	  if (page === 'settings') {
		this.innerHTML = `<ul><li>Option 1</li><li>Option 2</li></ul>`;
	  } else {
		this.innerHTML = `<ul><li>Home Link</li><li>About Link</li></ul>`;
	  }
	}
  }
  customElements.define('custome-side-bar', CustomeSideBar);
  
  // cutome-content.js
  class CutomeContent extends HTMLElement {
	static get observedAttributes() {
	  return ['page'];
	}
  
	attributeChangedCallback(name, oldValue, newValue) {
	  if (name === 'page') {
		this.render(newValue);
	  }
	}
  
	render(page) {
	  this.innerHTML = '';
	  if (page === 'settings') {
		this.innerHTML = `<h1>Settings Page</h1>`;
	  } else {
		this.innerHTML = `<h1>Welcome to the Home Page</h1>`;
	  }
	}
  }
  customElements.define('cutome-content', CutomeContent);
  

  // custome-header.js
class CustomeHeader extends HTMLElement {
	connectedCallback() {
	  this.render();
	}
  
	render() {
	  this.innerHTML = `
		<header style="background-color: #333; color: white; padding: 10px; text-align: center;">
		  <h1>My App Header</h1>
		</header>
	  `;
	}
  }
  customElements.define('custome-header', CustomeHeader);
  