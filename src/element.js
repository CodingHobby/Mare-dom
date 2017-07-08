module.exports = class Element {

	/**
	 * Creates an instance of the Element class
	 * 
	 * @param {String} type - The type of the element
	 * @param {String} [html] - The innerHTML of the element
	 * @param {Node} [parent=document.body] - The parent of the element
	 */

	constructor(type, html, parent) {
		// Create the element and set its properties
		this.el = document.createElement(type)
		if (html) {
			// Required for setting value for inputs too
			this.el.innerHTML = html
			this.el.setAttribute('value', html)
		}
		this.parentNode = parent || document.body
		this.childrenNodes = []
	}

	/**
	 * Gets or sets the id of an element
	 * 
	 * @param {String} [id] - the id to assign to the element 
	 *
	 * @return {String|Element} - either the element if an ID is provided or the element's ID if none is provided
	 */

	id(id) {
		if (id) {
			this.el.id = id
			return this
		} else {
			return this.el.id
		}
	}

	/**
	 * Renders the element to the dom
	 * 
	 */
	render() {
		this.parentNode.appendChild(this.el)
		return this
	}


	/**
	 * Gets or sets the inner HTML of an element
	 * 
	 * @param {String} [html] - the innerHTML of the element 
	 * 
	 * @return {String|Element} - either the element if an HTML value is provided or the element's innerHTML if none is provided
	 */

	content(html) {
		if (html !== undefined) {
			this.el.innerHTML = html
			return this
		} else {
			return this.el.innerHTML
		}
	}


	/**
	 * Sets or gets the value of an element
	 * 
	 * @param {String} [val] - the value to assign to an element
	 * 
	 * @return {String|Element} - either the element if a value is provided or the element's value if none is provided
	 */

	value(val) {
		if (val !== undefined) {
			this.el.value = val
			return this
		} else {
			return this.el.value
		}
	}


	/**
	 * Sets and gets a parent for the element
	 * 
	 * @param {Node} [parent] - the parent node for the element
	 * 
	 * @return {Node|Element} - either the Element if a Node is provided or the element's parent if none is provided
	 */

	parent(parent) {
		if (parent) {
			// We have to remove the element from its previous parent, before appending it to another one
			this.parentNode.removeChild(this.el)
			this.parentNode = parent
			this.parentNode.appendChild(this.el)
			return this
		} else {
			return this.parentNode
		}
	}


	/**
	 * Adds a child to an element. Also pushes the element to this element's childrenNodes array
	 * 
	 * @param {Element} el - the element to add as a child to this
	 * 
	 * @return {Element} - this Element
	 */

	addChild(...els) {
		els.forEach(el => {
			if (el instanceof Array) {
				this.addChild(...el)
			} else {
				el.parent(this.el)
				this.childrenNodes.push(el)
			}
		})

		return this
	}


	/**
	 * Removes a child from an element's children array and from the DOM
	 * 
	 * @param {Element} el
	 * 
	 * @return {String|Element} - this Element
	 */

	removeChild(...els) {
		els.forEach(el => {
			if (el instanceof Array) {
				this.removeChild(...el)
			} else {
				this.el.removeChild(el.el)
				this.childrenNodes.splice(this.childrenNodes.indexOf(el), 1)
			}
		})
		return this
	}

	/**
	 * List all the children of an Element
	 * 
	 * @return {Element[]} - an array with all of this Element's children
	 */
	children() {
		return this.childrenNodes
	}

	/**
	 * Converts Element to DOM node 
	 */

	toNode() {
		return this.el
	}

	/**
	 * Adds an event listener to the element
	 * 
	 * @param {String|Event} event - the event to listen for 
	 * @param {function} callback - the callback function for when the event occurs
	 *
	 * @return {Element} - this Element
	 */

	on(event, callback) {
		this.el.addEventListener(event, callback)
		return this
	}

	/**
	 * Returns a list of the element's classes as an array
	 * 
	 * @return {Element} - this Element
	 */
	classes() {
		return Array.prototype.slice.call(this.el.classList)
	}

	/**
	 * Adds a class to an element
	 * 
	 * @param {String} classes
	 * 
	 * @return {Element} - this element
	 */
	addClass(...classes) {
		classes.forEach(className => {
			if (className instanceof Array) {
				this.addClass(...className)
			} else {
				this.el.classList.add(className)
			}
		})
		return this
	}

	/**
	 * Removes a class from an element
	 * 
	 * @param {String} classes 
	 * 
	 * @return {Element} - this Element
	 */
	removeClass(...classes) {
		classes.forEach(className => {
			if (className instanceof Array) {
				this.removeClass(...className)
			} else {
				this.el.classList.remove(className)
			}
		})
		return this
	}

	/**
	 * Toggles a class on an element
	 * 
	 * @param {String} className
	 * 
	 * @return {Element} - this Element
	 */
	toggleClass(...classes) {
		classes.forEach(className => {
			if (className instanceof Array) {
				this.toggleClass(...className)
			} else {
				this.el.classList.toggle(className)
			}
		})
		return this
	}

	/**
	 * Sets an element's style
	 * 
	 * @param {Object} styleObj
	 * 
	 * @return {Element} - this Element
	 */
	style(styleObj) {
		const rules = Object.keys(styleObj)
		rules.forEach(rule => {
			this.el.style[rule] = styleObj[rule]
		})
		return this
	}

	/**
	 * Sets the value for an attribute of this Elment
	 * 
	 * @param {String} attr - the name of the attribute 
	 * @param {String} val - the value to set for the attribute
	 * 
	 * @return {Element} - this Element
	 */
	attr(attr, val) {
		this.el.setAttribute(attr, val)
		return this
	}
}
