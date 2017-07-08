const Element = require('./element')

module.exports = {
	Element,
	select: function (selector) {
		console.log('selecting')
		let el = document.querySelector(selector)
		console.log('removing child')
		document.body.removeChild(el)
		console.log('creating element')
		let out = new Element(el.nodeName, el.value || el.innerHTML)
		console.log('id')
		if (el.id) {
			out.id(el.id)
		}
		console.log('classes')
		let classes = Array.prototype.slice.call(el.classList)
		out.addClass(classes)
		console.log('children')
		let children = Array.prototype.slice.call(el.childNodes).map(element => {
			return new Element(element.parentNode.nodeName, element.value || element.innerHTML)
		})
		
		out.addChild(children)
		console.log('return')
		return out
	}
}