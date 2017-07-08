# Mare.dom.js

This library is an easy peasy dom manipulation library, which borrows concepts from different ones, such as [p5.js](https://p5js.org) and [yo-yo](https://npmjs.com/package/yo-yo).

In the beginning this was supposed to be a [Marejs](https://npmjs.org/package/marejs), although it is completely indipendent.

I wrote all the unit tests for it using Facebook's [Jest](https://npmjs.org/package/jest) and [browser-env](https://npmjs.org/package/browser-env) for simulating the DOM in the unit tests.

It should be pretty easy to use: all you gotta do is install it and include it in your files! Here's how:

```javascript
const { Element } = require('mare-dom')

let element = new Element('p', 'Hello, World!')
```

Here is how the library works:

---

At the core of the library is the possibility of creating `Element` objects, which are then automatically rendered to the DOM (this means that the page needs to be loaded before you can create an `Element`):

```javascript
const dom = require('mare-dom')
const Element = dom.Element

let element = new Element('p', 'Hello, World', document.body)
```

The constructor takes three arguments: the type of the element, its content (HTML works, too) and its parent element (the library automatically assumes you want to append to the document.body element)

At this point, an HTML element is created and appended to the parent you passed in or the document body.

The Element also has other default functions:

- `content(html)` : Sets an element's HTML content. If no parameter is passed, the function just returns the element's HTML content

- `value(value)` : Sets an input's value. If no parameter is passed, the function just returns the input's value

- `id(string)` : Sets the element's ID to a string. If no parameter is passed, the function just returns the element's id

- `parent(Node)` : Sets the element's parent node. If no parameter is passed, the function just returns the element's parent node

- `addChild(Element)` : Adds a child to the element's children array and also renders it as a child of the DOM element

- `removeChild(Element)` : Removes a child from the element's children list and also removes it from the DOM

- `children()` : Returns a list with all the children nodes of an element

- `toNode()` : Returns the JavaScript DOM Objects associated with the Element

- `on(event, callback)` : Adds an event listener for a certain type of event and executes a callback when the event happens

---

Remember that contributions are welcomed, and that, by any means, you should Fork and Star the repo, if you like it! Have fun with this little lib of mine!