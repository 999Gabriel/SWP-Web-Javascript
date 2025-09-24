# JavaScript Learning Guide - DOM Manipulation & Beyond

## 📚 Table of Contents
- [Quick JavaScript Fundamentals Review](#quick-javascript-fundamentals-review)
- [DOM Manipulation (Current Focus)](#dom-manipulation-current-focus)
- [DOM Selection Methods](#dom-selection-methods)
- [DOM Modification Techniques](#dom-modification-techniques)
- [Event Handling](#event-handling)
- [Advanced DOM Concepts](#advanced-dom-concepts)
- [Best Practices](#best-practices)
- [Practical Examples](#practical-examples)
- [Common Patterns](#common-patterns)
- [Resources for Further Learning](#resources-for-further-learning)

---

## 🔄 Quick JavaScript Fundamentals Review

Before diving into DOM manipulation, here's a quick recap of essential JavaScript concepts:

### Variables & Data Types
```javascript
// Variables
let name = "Gabriel";
const age = 25;
var isLearning = true;

// Data Types
let number = 42;
let string = "Hello World";
let boolean = true;
let array = [1, 2, 3, 4];
let object = { name: "Gabriel", skill: "JavaScript" };
```

### Functions
```javascript
// Function Declaration
function greet(name) {
    return `Hello, ${name}!`;
}

// Arrow Function
const multiply = (a, b) => a * b;

// Function Expression
const add = function(a, b) {
    return a + b;
};
```

### Control Structures
```javascript
// If/Else
if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}

// Loops
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// Array methods
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(num => console.log(num));
numbers.map(num => num * 2);
numbers.filter(num => num > 2);
```

---

## 🌟 DOM Manipulation (Current Focus)

The Document Object Model (DOM) is a programming interface for HTML documents. It represents the page so that programs can change the document structure, style, and content.

### What is the DOM?
- **Tree Structure**: The DOM represents HTML as a tree of nodes
- **Dynamic**: Can be modified with JavaScript
- **Interface**: Bridge between JavaScript and HTML/CSS

```html
<!DOCTYPE html>
<html>
<head>
    <title>DOM Example</title>
</head>
<body>
    <div id="container">
        <p class="text">Hello World</p>
        <button onclick="changeText()">Click me</button>
    </div>
</body>
</html>
```

---

## 🎯 DOM Selection Methods

### Basic Selection Methods

#### 1. getElementById()
```javascript
// Select element by ID
const container = document.getElementById('container');
console.log(container);
```

#### 2. getElementsByClassName()
```javascript
// Select elements by class name (returns HTMLCollection)
const textElements = document.getElementsByClassName('text');
console.log(textElements[0]); // First element with class 'text'
```

#### 3. getElementsByTagName()
```javascript
// Select elements by tag name
const paragraphs = document.getElementsByTagName('p');
const allDivs = document.getElementsByTagName('div');
```

#### 4. querySelector() - Modern Approach
```javascript
// Select first element matching CSS selector
const firstButton = document.querySelector('button');
const containerById = document.querySelector('#container');
const textByClass = document.querySelector('.text');
const complexSelector = document.querySelector('div > p.text');
```

#### 5. querySelectorAll() - Modern Approach
```javascript
// Select all elements matching CSS selector (returns NodeList)
const allButtons = document.querySelectorAll('button');
const allTextElements = document.querySelectorAll('.text');

// Convert NodeList to Array for advanced methods
const buttonsArray = Array.from(allButtons);
```

### Selection Comparison
| Method | Returns | Live/Static | CSS Selectors |
|--------|---------|-------------|---------------|
| `getElementById()` | Element | Static | No |
| `getElementsByClassName()` | HTMLCollection | Live | No |
| `getElementsByTagName()` | HTMLCollection | Live | No |
| `querySelector()` | Element | Static | Yes |
| `querySelectorAll()` | NodeList | Static | Yes |

---

## ✏️ DOM Modification Techniques

### Changing Content

#### 1. innerHTML
```javascript
const element = document.getElementById('container');
element.innerHTML = '<p>New <strong>HTML</strong> content</p>';
```

#### 2. textContent
```javascript
const paragraph = document.querySelector('p');
paragraph.textContent = 'New plain text content';
```

#### 3. innerText
```javascript
const element = document.querySelector('.text');
element.innerText = 'Visible text only';
```

### Changing Attributes

#### setAttribute() and getAttribute()
```javascript
const button = document.querySelector('button');

// Set attribute
button.setAttribute('disabled', 'true');
button.setAttribute('data-action', 'submit');

// Get attribute
const id = button.getAttribute('id');
const dataAction = button.getAttribute('data-action');
```

#### Direct Property Access
```javascript
const input = document.querySelector('input');
input.value = 'New value';
input.placeholder = 'Enter text here';
input.disabled = true;
```

### Changing Styles

#### 1. style Property
```javascript
const element = document.querySelector('.text');
element.style.color = 'red';
element.style.fontSize = '20px';
element.style.backgroundColor = '#f0f0f0';

// CSS properties with hyphens use camelCase
element.style.borderRadius = '5px';
element.style.textAlign = 'center';
```

#### 2. className Property
```javascript
const element = document.querySelector('div');
element.className = 'new-class another-class';
```

#### 3. classList Property (Recommended)
```javascript
const element = document.querySelector('.text');

// Add class
element.classList.add('highlight');
element.classList.add('bold', 'italic'); // Multiple classes

// Remove class
element.classList.remove('old-class');

// Toggle class
element.classList.toggle('active');

// Check if class exists
if (element.classList.contains('highlight')) {
    console.log('Element has highlight class');
}

// Replace class
element.classList.replace('old-class', 'new-class');
```

### Creating and Adding Elements

#### 1. createElement()
```javascript
// Create new element
const newDiv = document.createElement('div');
newDiv.textContent = 'New div content';
newDiv.className = 'new-element';

// Create complex element
const newButton = document.createElement('button');
newButton.textContent = 'Click me';
newButton.setAttribute('type', 'button');
newButton.style.padding = '10px';
```

#### 2. appendChild()
```javascript
const container = document.getElementById('container');
const newParagraph = document.createElement('p');
newParagraph.textContent = 'New paragraph';

container.appendChild(newParagraph);
```

#### 3. insertBefore()
```javascript
const container = document.getElementById('container');
const newElement = document.createElement('span');
newElement.textContent = 'Inserted element';

const referenceElement = container.querySelector('p');
container.insertBefore(newElement, referenceElement);
```

#### 4. insertAdjacentHTML()
```javascript
const element = document.querySelector('.text');

// Insert positions: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
element.insertAdjacentHTML('afterend', '<p>Inserted after element</p>');
```

### Removing Elements

#### 1. removeChild()
```javascript
const container = document.getElementById('container');
const elementToRemove = container.querySelector('p');
container.removeChild(elementToRemove);
```

#### 2. remove() - Modern Method
```javascript
const elementToRemove = document.querySelector('.text');
elementToRemove.remove();
```

---

## 🎪 Event Handling

Events allow JavaScript to respond to user interactions and browser actions.

### Adding Event Listeners

#### 1. addEventListener() - Recommended
```javascript
const button = document.querySelector('button');

// Basic event listener
button.addEventListener('click', function() {
    alert('Button clicked!');
});

// Arrow function
button.addEventListener('click', () => {
    console.log('Button clicked with arrow function');
});

// Named function
function handleClick(event) {
    console.log('Button clicked:', event.target);
}
button.addEventListener('click', handleClick);
```

#### 2. Event Handler Properties
```javascript
const button = document.querySelector('button');
button.onclick = function() {
    alert('Button clicked via property');
};
```

### Common Events

#### Mouse Events
```javascript
const element = document.querySelector('.interactive');

element.addEventListener('click', handleClick);
element.addEventListener('dblclick', handleDoubleClick);
element.addEventListener('mouseenter', handleMouseEnter);
element.addEventListener('mouseleave', handleMouseLeave);
element.addEventListener('mouseover', handleMouseOver);
element.addEventListener('mouseout', handleMouseOut);
```

#### Keyboard Events
```javascript
const input = document.querySelector('input');

input.addEventListener('keydown', function(event) {
    console.log('Key pressed:', event.key);
    console.log('Key code:', event.keyCode);
});

input.addEventListener('keyup', function(event) {
    console.log('Key released:', event.key);
});

// Specific key detection
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        console.log('Enter key pressed');
    }
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // Prevent browser save
        console.log('Ctrl+S pressed');
    }
});
```

#### Form Events
```javascript
const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    console.log('Form submitted');
});

input.addEventListener('focus', function() {
    console.log('Input focused');
});

input.addEventListener('blur', function() {
    console.log('Input lost focus');
});

input.addEventListener('change', function() {
    console.log('Input value changed:', this.value);
});

input.addEventListener('input', function() {
    console.log('Input value changing:', this.value);
});
```

### Event Object
```javascript
button.addEventListener('click', function(event) {
    console.log('Event type:', event.type);
    console.log('Target element:', event.target);
    console.log('Current target:', event.currentTarget);
    console.log('Mouse position:', event.clientX, event.clientY);
    
    // Prevent default behavior
    event.preventDefault();
    
    // Stop event propagation
    event.stopPropagation();
});
```

### Event Delegation
```javascript
// Instead of adding listeners to each button
const container = document.getElementById('container');

container.addEventListener('click', function(event) {
    if (event.target.matches('button')) {
        console.log('Button clicked:', event.target.textContent);
    }
    
    if (event.target.matches('.delete-btn')) {
        event.target.parentElement.remove();
    }
});
```

---

## 🚀 Advanced DOM Concepts

### DOM Traversal

#### Parent/Child Relationships
```javascript
const element = document.querySelector('.child');

// Parent traversal
console.log(element.parentNode);
console.log(element.parentElement);

// Child traversal
const parent = document.querySelector('.parent');
console.log(parent.children); // HTMLCollection of child elements
console.log(parent.childNodes); // NodeList including text nodes
console.log(parent.firstElementChild);
console.log(parent.lastElementChild);
```

#### Sibling Relationships
```javascript
const element = document.querySelector('.middle');

console.log(element.nextElementSibling);
console.log(element.previousElementSibling);
console.log(element.nextSibling); // Includes text nodes
console.log(element.previousSibling); // Includes text nodes
```

### Document Fragments
```javascript
// Efficient way to add multiple elements
const fragment = document.createDocumentFragment();

for (let i = 0; i < 100; i++) {
    const li = document.createElement('li');
    li.textContent = `Item ${i}`;
    fragment.appendChild(li);
}

document.querySelector('ul').appendChild(fragment);
```

### Template Elements
```javascript
// HTML template
const template = document.querySelector('#item-template');
const clone = template.content.cloneNode(true);

// Modify clone
clone.querySelector('.item-name').textContent = 'New Item';
clone.querySelector('.item-price').textContent = '$19.99';

// Add to DOM
document.querySelector('.item-list').appendChild(clone);
```

### Custom Data Attributes
```javascript
// HTML: <div data-user-id="123" data-role="admin">
const element = document.querySelector('div');

// Access data attributes
console.log(element.dataset.userId); // "123"
console.log(element.dataset.role); // "admin"

// Set data attributes
element.dataset.status = 'active';
element.dataset.lastLogin = '2023-12-01';
```

---

## 💡 Best Practices

### 1. Wait for DOM to Load
```javascript
// Method 1: DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // DOM is fully loaded
    console.log('DOM ready');
});

// Method 2: Place scripts at bottom of body
// Method 3: Use defer attribute on script tag
```

### 2. Cache DOM Queries
```javascript
// Bad - queries DOM multiple times
document.getElementById('button').addEventListener('click', function() {
    document.getElementById('output').textContent = 'Clicked';
    document.getElementById('output').style.color = 'red';
});

// Good - cache the element
const button = document.getElementById('button');
const output = document.getElementById('output');

button.addEventListener('click', function() {
    output.textContent = 'Clicked';
    output.style.color = 'red';
});
```

### 3. Use Event Delegation
```javascript
// Bad - adding listener to each item
const items = document.querySelectorAll('.item');
items.forEach(item => {
    item.addEventListener('click', handleItemClick);
});

// Good - single listener on parent
const container = document.querySelector('.container');
container.addEventListener('click', function(event) {
    if (event.target.matches('.item')) {
        handleItemClick(event);
    }
});
```

### 4. Minimize DOM Manipulation
```javascript
// Bad - multiple DOM updates
const list = document.querySelector('ul');
for (let i = 0; i < 100; i++) {
    const li = document.createElement('li');
    li.textContent = `Item ${i}`;
    list.appendChild(li); // DOM update each iteration
}

// Good - batch updates
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
    const li = document.createElement('li');
    li.textContent = `Item ${i}`;
    fragment.appendChild(li);
}
list.appendChild(fragment); // Single DOM update
```

---

## 🛠️ Practical Examples

### Example 1: Interactive To-Do List
```html
<!DOCTYPE html>
<html>
<head>
    <title>To-Do List</title>
</head>
<body>
    <div id="todo-app">
        <input type="text" id="todo-input" placeholder="Add new task...">
        <button id="add-btn">Add Task</button>
        <ul id="todo-list"></ul>
    </div>

    <script>
        const input = document.getElementById('todo-input');
        const addBtn = document.getElementById('add-btn');
        const todoList = document.getElementById('todo-list');

        // Add task function
        function addTask() {
            const taskText = input.value.trim();
            if (taskText === '') return;

            const li = document.createElement('li');
            li.innerHTML = `
                <span class="task-text">${taskText}</span>
                <button class="delete-btn">Delete</button>
            `;

            todoList.appendChild(li);
            input.value = '';
        }

        // Event listeners
        addBtn.addEventListener('click', addTask);
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                addTask();
            }
        });

        // Event delegation for delete buttons
        todoList.addEventListener('click', function(event) {
            if (event.target.matches('.delete-btn')) {
                event.target.parentElement.remove();
            }
        });
    </script>
</body>
</html>
```

### Example 2: Dynamic Content Filter
```html
<!DOCTYPE html>
<html>
<head>
    <title>Content Filter</title>
</head>
<body>
    <input type="text" id="filter-input" placeholder="Filter items...">
    
    <div id="items">
        <div class="item" data-category="electronics">Laptop</div>
        <div class="item" data-category="books">JavaScript Guide</div>
        <div class="item" data-category="electronics">Smartphone</div>
        <div class="item" data-category="books">DOM Manipulation</div>
    </div>

    <script>
        const filterInput = document.getElementById('filter-input');
        const items = document.querySelectorAll('.item');

        filterInput.addEventListener('input', function() {
            const filterText = this.value.toLowerCase();

            items.forEach(item => {
                const itemText = item.textContent.toLowerCase();
                const category = item.dataset.category;

                if (itemText.includes(filterText) || category.includes(filterText)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    </script>
</body>
</html>
```

### Example 3: Dynamic Form Validation
```javascript
const form = document.querySelector('#registration-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');

// Real-time validation
emailInput.addEventListener('blur', function() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(this.value);
    
    toggleValidation(this, isValid, 'Please enter a valid email');
});

passwordInput.addEventListener('input', function() {
    const isValid = this.value.length >= 8;
    toggleValidation(this, isValid, 'Password must be at least 8 characters');
});

confirmPasswordInput.addEventListener('blur', function() {
    const isValid = this.value === passwordInput.value;
    toggleValidation(this, isValid, 'Passwords do not match');
});

function toggleValidation(element, isValid, message) {
    const errorElement = element.nextElementSibling;
    
    if (isValid) {
        element.classList.remove('error');
        element.classList.add('valid');
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
    } else {
        element.classList.remove('valid');
        element.classList.add('error');
        
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            element.parentNode.insertBefore(errorDiv, element.nextSibling);
        }
    }
}
```

---

## 🔄 Common Patterns

### 1. Module Pattern
```javascript
const TodoApp = (function() {
    // Private variables
    let tasks = [];
    
    // Private methods
    function renderTasks() {
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';
        
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <button onclick="TodoApp.toggleTask(${index})">Toggle</button>
                <button onclick="TodoApp.deleteTask(${index})">Delete</button>
            `;
            todoList.appendChild(li);
        });
    }
    
    // Public API
    return {
        addTask: function(text) {
            tasks.push({ text: text, completed: false });
            renderTasks();
        },
        
        toggleTask: function(index) {
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
        },
        
        deleteTask: function(index) {
            tasks.splice(index, 1);
            renderTasks();
        }
    };
})();
```

### 2. Observer Pattern
```javascript
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
    
    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
}

// Usage
const emitter = new EventEmitter();

emitter.on('taskAdded', function(task) {
    console.log('New task added:', task);
    updateUI();
});

emitter.emit('taskAdded', { text: 'Learn DOM', completed: false });
```

### 3. Lazy Loading Pattern
```javascript
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);
```

---

## 📖 Resources for Further Learning

### Documentation
- [MDN Web Docs - DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [W3Schools DOM Tutorial](https://www.w3schools.com/js/js_htmldom.asp)
- [JavaScript.info - DOM](https://javascript.info/document)

### Practice Platforms
- [freeCodeCamp](https://www.freecodecamp.org/)
- [Codecademy](https://www.codecademy.com/learn/introduction-to-javascript)
- [JavaScript30](https://javascript30.com/)

### Advanced Topics to Explore Next
- **Web APIs**: Fetch API, Local Storage, Geolocation
- **Async JavaScript**: Promises, async/await
- **Modern JavaScript**: ES6+ features, modules
- **JavaScript Frameworks**: React, Vue, Angular
- **Node.js**: Server-side JavaScript
- **Testing**: Jest, testing-library

### Tools for Development
- **Browser DevTools**: Chrome/Firefox Developer Tools
- **Code Editors**: VS Code, WebStorm
- **Version Control**: Git, GitHub
- **Package Managers**: npm, yarn

---

## 🎯 Next Steps

1. **Practice DOM manipulation** with the examples provided
2. **Build small projects** using pure JavaScript and DOM
3. **Learn about Web APIs** (Fetch, Storage, etc.)
4. **Explore modern JavaScript frameworks** once comfortable with vanilla JS
5. **Study performance optimization** techniques for DOM operations

Remember: **Practice makes perfect!** Try to build small projects and experiment with different DOM manipulation techniques. The key to mastering JavaScript and the DOM is consistent practice and building real applications.

Happy coding! 🚀