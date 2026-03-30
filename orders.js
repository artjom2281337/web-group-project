// Get elements for DOM manipulation.
const PIZZA_ELEMENT = document.getElementById("pizzas"); // Holds all the pizza elements.
const ITEMS = document.getElementById("items"); // Holds the pizzas the user wants to order.
const TOTAL_PRICE = document.getElementById("total"); // Holds the total price of the order.

/**
 * @type {Array<Pizza>}
 * List of available {@link Pizza}s.
 * 
 * Images and names from https://englishan.com/pizza-names-in-english/
 */
const pizzas = [
    new SmallPizza("Quatro Formaggi", 18.99), 
    new SmallPizza("Pepperoni", 18.99), 
    new SmallPizza("BBQ Chicken", 23.99),
    new SmallPizza("Hawaii", 19.99),
    new SmallPizza("Meat Lovers", 23.99),
    new SmallPizza("Veggie", 17.99),
    new SmallPizza("Supreme", 22.99),
    new SmallPizza("White", 20.99),
    new SmallPizza("Pesto", 21.99),
    new SmallPizza("Mushroom", 20.99),
    new SmallPizza("Sausage", 20.99),
    new SmallPizza("Spinach and Feta", 19.99)
]

/**
 * @type {Array<Pizza>}
 * List of {@link Pizza}s user wants to order.
 */
const cart = []

/**
 * Creates individual {@link HTMLElement}s for showing {@link Pizza} options the pizzeria is offering.
 * @param {Pizza} pizza {@link Pizza} object for which this {@link HTMLElement} is.
 * @param {int} index Index of the {@link HTMLElement} in {@link PIZZA_ELEMENT}.
 * @returns {HTMLElement} with all the {@link Pizza} information.
 */
const createPizzaElement = (pizza, index) => {

    // Create div with class 'pizza'
    let pizzaDiv = document.createElement("div");
    pizzaDiv.classList.add("pizza");

    // Add information about pizza and correct image
    pizzaDiv.innerHTML = `
        <div>
            <h4>${pizza.name}</h4>
            <p>${pizza.price}€</p>
        </div>
        <img src="images/pizza/${pizza.name.replaceAll(" ", "_").toLowerCase()}.png" alt="${pizza.name}">
    `

    // Add child elements
    pizzaDiv.appendChild(createSizeForm(pizza, index))
    pizzaDiv.appendChild(createAddButton(pizza))

    // Return completed HTMLElement
    return pizzaDiv
}

/**
 * Creates {@link HTMLElement} for choosing the size of {@link Pizza}.
 * @param {Pizza} pizza {@link Pizza} to choose the size of.
 * @param {int} index Index of the {@link Pizza} in {@link PIZZA_ELEMENT} .
 * @returns {HTMLElement} for choosing the size.
 */
const createSizeForm = (pizza, index) => {

    // Create form element with class sizes.
    let sizeForm = document.createElement("form");
    sizeForm.classList.add("sizes");

    // Possible sizes
    let sizes = {"S": "33cm", "M": "45cm", "L": "55cm"}

    // Add the radio buttons for different sizes.
    // The button correspoding to the pizza size will be checked, initially S.
    for (const size in sizes) {
        sizeForm.innerHTML += `
            <label>
                <input type="radio" name="pizza_size" value=${size} ${pizza.size == size ? "checked" : null}>
                <span>${size}<br><span class="width">${sizes[size]}</span></span>
            </label>
        `
    }
    
    // Callback when user changes their choice.
    sizeForm.onchange = () => onPizzaSizeChanged(sizeForm, pizza, index);

    // Return element for choosing sizes.
    return sizeForm
}

/**
 * Creates {@link HTMLElement} button for adding {@link Pizza} to the {@link cart}.
 * @param {Pizza} pizza {@link Pizza} to add to the {@link cart}. 
 * @returns {HTMLElement} button
 */
const createAddButton = (pizza) => {

    // Create button with text 'Add to cart'
    let button = document.createElement("button")
    button.innerText = "Add to cart"

    // Click callback -> Adds pizza to the cart and updates cart
    button.onclick = () => {
        cart.push(pizza)
        updateCart()
    }

    // Return completed button
    return button
}

/**
 * Removes the old {@link HTMLElement} and replaces it with a new one in its place.
 * @param {Pizza} pizza {@link Pizza} whose size has changed.
 * @param {int} index Index of the old {@link HTMLElement} that should be replaced by the new one.
 * @return {void}
 */
const replacePizzaElement = (pizza, index) => {
    
    // Get the old HTMLElement
    let old = PIZZA_ELEMENT.children[index]
    
    // Insert the new HTMLElement before the old one
    PIZZA_ELEMENT.insertBefore(createPizzaElement(pizza, index), old)
    
    // Remove the old HTMLElement so it looks like the new one is in its place
    PIZZA_ELEMENT.removeChild(old)
}

/**
 * Used as a callback for when the user changes the size of a {@link Pizza}.
 * @param {HTMLFormElement} form Form containing the selected size. 
 * @param {Pizza} pizza {@link Pizza} for which the size has changed. 
 * @param {Index} index Inde of the {@link Element} in the {@link PIZZA_ELEMENT} which should change.
 * @returns {void}
 */
function onPizzaSizeChanged(form, pizza, index) {
    
    // New pizza object
    let newPizza

    // Match the new size
    switch (form.elements["pizza_size"].value) {
        case "S": // Create small pizza
            newPizza = new SmallPizza(pizza.name, pizza.basePrice);
            break;
        case "M": // Create medium pizza
            newPizza = new MediumPizza(pizza.name, pizza.basePrice);
            break;
        case "L": // Create large pizza
            newPizza = new LargePizza(pizza.name, pizza.basePrice);
            break;
    }

    // Replace the HTMLElement with the old pizza size for a new one
    replacePizzaElement(newPizza, index)
}

/**
 * Used as a callback when the user adds a new {@link Pizza} to the {@link cart}.
 * @return {void}
 */
function updateCart() {

    // Reset total price and cart content
    let totalPrice = 0
    ITEMS.innerHTML = ""

    // Loop through all the pizzas in the list
    cart.forEach(pizza => {

        // Create div element with class item
        let item = document.createElement("div")
        item.classList.add("item")

        // Insert pizza information
        item.innerHTML = `
            <h4>${pizza.name} (${pizza.size})</h4>
            <p>${pizza.price}€</p>
        `

        // Click callback
        item.onclick = () => {
            cart.splice(cart.indexOf(pizza), 1) // Remove the pizza on which the user clicked
            updateCart() // Update the cart content (recalculate the total and remove the deleted pizza)
        }

        // Add pizza information to the content
        ITEMS.appendChild(item)

        // Add up the price of the pizza
        totalPrice += pizza.price
    })

    // Show the total price rounded to two decimal places
    totalPrice = Math.round(totalPrice * 100) / 100
    TOTAL_PRICE.innerText = `${totalPrice}€`
}

// Loop through all the available pizzas
pizzas.forEach((pizza, index) => {

    // Create and add new HTMLElement for holding the pizza information
    let pizzaDiv = createPizzaElement(pizza, index)
    PIZZA_ELEMENT.appendChild(pizzaDiv)
})