export default class Element {
	constructor(tagName, query) {
	  this.element = query
		? document.querySelector(query)
		: document.createElement(tagName.toLowerCase());
	}
  }
  