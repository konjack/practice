class EventHandlerElement extends HTMLElement {
	get is() {
		// tagName, yu still uppercase?
		return (this.getAttribute('is') || this.tagName)
			.toLowerCase();
	}

	// The element itself is the event handler.
	// https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventListener-handleEvent
	// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
	handleEvent(event) {
		const { target, type } = event;
		
		// Compute an interesting attribute.
		const attribute = `${this.is}-${type}`;
		
		// Find closest element with the attribute, if any.
		const fromEl = target.closest(`[${attribute}]`);
		
		// Get the attribute's value, if any.
		const method = fromEl && fromEl.getAttribute(attribute);

		// Check if the attribute's value is a method name.
		if (method && typeof this[method] === 'function') {
			// Execute the method.
			return this[method](event, fromEl);
		}
	}
}

class DemoFooElement extends EventHandlerElement {
	constructor() {
		super();
		
		// This element handles clicks and mouse movement.
		this.addEventListener('click', this);
		this.addEventListener('mousemove', this);
	}

	doFoo(event, fromEl) {
		console.log('foo', event.type, fromEl.id);
	}
}

class DemoBarElement extends EventHandlerElement {
	constructor() {
		super();

		// This element only handles clicks.
		this.addEventListener('click', this);
	}

	doBar(event, fromEl) {
		console.log('bar', event.type, fromEl.id);
	}
}

customElements.define('demo-foo', DemoFooElement);
customElements.define('demo-bar', DemoBarElement);