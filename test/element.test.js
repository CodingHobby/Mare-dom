const dom = require('../src/mare-dom')
require('browser-env')()
let el
let input
let e

describe('Select', function () {
	it('Selects an element from the DOM', function () {
		let el = new dom.Element('p', 'Hello').id('hello')
		it('Selects an element from the DOM', function () {
			expect(dom.select('#hello')).toEqual(el)
		})
	})
})
describe('Element', function () {
	beforeEach(function () {
		el = new dom.Element('p', 'Hello!')
	})

	describe('Attributes', function() {
		it('Sets an element\'s attribute to a certain attribute', function() {
			el.attr('id', 'hello')
			el.render()
			expect(el.el).toEqual(document.getElementById('hello'))
		})
	})

	describe('Content', function () {
		it('Gets an element\'s content', function () {
			expect(el.content()).toEqual('Hello!')
		})

		it('Sets an element\'s content', function () {
			el.content('Stuff')
			expect(el.content()).toEqual('Stuff')
		})
	})

	describe('Id', function () {
		it('Gets an element\'s id', function () {
			expect(el.id()).toEqual("")
		})

		it('Sets an element\'s id', function () {
			el.id('stuff')
			expect(el.id()).toEqual('stuff')
		})
	})

	describe('Relationships', function () {
		describe('Parent', function () {
			it('Gets an element\'s parent', function () {
				expect(el.parent()).toEqual(document.body)
			})

			it('Sets an element\'s parent', function () {
				let parent = new dom.Element('div').render()
				el.render()
				el.parent(parent.toNode())
				expect(el.parent()).toEqual(parent.toNode())
			})
		})

		describe('Add Child', function () {
			it('Adds a child to the ChildrenNode list', function () {
				let parent = new dom.Element('div').render()
				el.render()
				parent.addChild(el)

				expect(parent.children().indexOf(el)).not.toEqual(-1)
			})
		})

		describe('Remove Child', function () {
			it('Removes a child from the ChildrenNode list and DOM', function () {
				let parent = new dom.Element('div').render()
				el.render()
				parent.addChild(el)
				parent.removeChild(el)
				expect(parent.children().indexOf(el)).toEqual(-1)
			})
		})

		describe('Children', function () {
			it('Returns the children of an element', function () {
				let parent = new dom.Element('div').render()
				el.render()
				parent.addChild(el)
				expect(parent.children()).toEqual([el])
			})
		})
	})

	describe('Styling', function () {
		describe('Class list', function () {
			it('Returns an array', function () {
				expect(el.classes() instanceof Array).toBe(true)
			})
			it('Returns an element\'s class list', function () {
				el.el.classList.add('class')
				expect(el.classes()).toEqual(['class'])
			})
		})

		describe('Add class', function () {
			it('Adds a class to an element', function () {
				el.addClass('class')
				expect(el.classes().indexOf('class')).not.toEqual(-1)
			})

			it('Accepts a dynamic number of arguments', function () {
				el.addClass('class', 'otherClass')
				expect(el.classes()).toEqual(['class', 'otherClass'])
			})

			it('Accepts an array as an argument', function () {
				el.addClass(['class', 'otherClass'])
				expect(el.classes()).toEqual(['class', 'otherClass'])
			})

			it('Accepts hybrid arguments', function () {
				el.addClass('class', ['otherClass', 'anotherClass'])
				expect(el.classes()).toEqual(['class', 'otherClass', 'anotherClass'])
			})
		})

		describe('Remove Class', function () {
			beforeEach(function () {
				el.addClass('class', 'otherClass')
			})

			it('Removes a class from an element', function () {
				el.removeClass('class')
				expect(el.classes().indexOf('class')).toBe(-1)
			})

			it('Accepts a dynamic number of arguments', function () {
				el.removeClass('class', 'otherClass')
				expect(el.classes().length).toBe(0)
			})

			it('Accepts an Array as an argument', function () {
				el.removeClass(['class', 'otherClass'])
				expect(el.classes().length).toBe(0)
			})

			it('Accepts hybrid arguments', function () {
				el.removeClass('class', ['otherClass'])
				expect(el.classes().length).toBe(0)
			})
		})

		describe('Toggle Class', function () {
			beforeEach(function () {
				el.addClass('class1', 'class2')
			})

			it('Toggles the classes on an element', function () {
				el.toggleClass('class1')
				expect(el.classes().indexOf('class1')).toBe(-1)

				el.toggleClass('class1')
				expect(el.classes().indexOf('class1')).not.toBe(-1)
			})

			it('Accepts a dynamic number of arguments', function () {
				el.toggleClass('class1', 'class2')
				expect(el.classes()).toEqual([])

				el.toggleClass('class1', 'class2')
				expect(el.classes()).toEqual(['class1', 'class2'])
			})

			it('Accepts different Argument Types', function () {
				el.toggleClass(['class1', 'class2'])
				expect(el.classes()).toEqual([])

				el.toggleClass(['class1'], 'class2')
				expect(el.classes()).toEqual(['class1', 'class2'])
			})

			describe('Style', function () {
				it('Sets an element\'s style based on an object', function () {
					const padding = '10px 20px 10px 20px'
					el.style({ padding })
					expect(el.el.style.padding).toEqual(padding)
				})
			})
		})
	})
})

describe('Input', function () {
	beforeEach(function () {
		input = new dom.Element('input', 'Hello!')
	})

	describe('Constructor', function () {
		it('Gives the value used in input creation', function () {
			expect(input.el.value).toEqual('Hello!')
		})
	})

	describe('Value', function () {
		it('Gets an input\'s value', function () {
			expect(input.value()).toEqual(input.el.value)
		})

		it('Sets an input\'s value', function () {
			input.value('Hey!')
			expect(input.value()).toEqual('Hey!')
		})
	})

	describe('Event listeners', function () {
		beforeEach(function () {
			let input = new dom.Element('button', 'Hello')
		})

		it('Creates an event listener for an element', function () {
			input.on('click', function () {
				input.content('Stuff')
			})
			input.el.click()
			expect(input.content()).toEqual('Stuff')
		})
	})
})
