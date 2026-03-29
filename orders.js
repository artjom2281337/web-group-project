class Pizza {
    name
    basePrice

    constructor(name, basePrice) {
        this.name = name
        this.basePrice = basePrice
    }
}

class SmallPizza extends Pizza {
    size = "S"
    static price_multiplier = 1.0

    constructor(name, price) {
        super(name, price)
        this.price = Math.round(price * SmallPizza.price_multiplier * 100) / 100
    }
}

class MediumPizza extends Pizza {
    size = "M"
    static price_multiplier = 1.3

    constructor(name, price) {
        super(name, price)
        this.price = Math.round(price * MediumPizza.price_multiplier * 100) / 100
    }
}

class LargePizza extends Pizza {
    size = "L"
    static price_multiplier = 1.5

    constructor(name, price) {
        super(name, price)
        this.price = Math.round(price * LargePizza.price_multiplier * 100) / 100
    }
}

const PIZZA_ELEMENT = document.getElementById("pizzas");
const ITEMS = document.getElementById("items")
const TOTAL_PRICE = document.getElementById("total")

// Images and names from https://englishan.com/pizza-names-in-english/
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
const cart = []

const createPizzaElement = (pizza, index) => {
    let pizzaDiv = document.createElement("div");
    pizzaDiv.classList.add("pizza");
    pizzaDiv.innerHTML = `
        <div>
            <h4>${pizza.name}</h4>
            <p>${pizza.price}€</p>
        </div>
        <img src="images/pizza/${pizza.name.replaceAll(" ", "_").toLowerCase()}.png" alt="${pizza.name}">
    `

    pizzaDiv.appendChild(createSizeForm(pizza, index))
    pizzaDiv.appendChild(createAddButton(pizza))

    return pizzaDiv
}

const createSizeForm = (pizza, index) => {
    let sizeForm = document.createElement("form");
    sizeForm.classList.add("sizes")
    sizeForm.innerHTML = `
        <label>
            <input type="radio" name="pizza_size" value="S" ${pizza.size == "S" ? "checked" : null}>
            <span>S<br><span class="width">33cm</span></span>
        </label>
        <label>
            <input type="radio" name="pizza_size" value="M" ${pizza.size == "M" ? "checked" : null}>
            <span>M<br><span class="width">45cm</span></span>
        </label>
        <label>
            <input type="radio" name="pizza_size" value="L" ${pizza.size == "L" ? "checked" : null}>
            <span>L<br><span class="width">55cm</span></span>
        </label>
    `
    
    sizeForm.onchange = () => onPizzaSizeChanged(sizeForm, pizza, index);
    return sizeForm
}

const createAddButton = (pizza) => {
    let button = document.createElement("button")
    button.innerText = "Add to cart"
    button.onclick = () => {
        cart.push(pizza)
        updateCart()
    }
    return button
}


function onPizzaSizeChanged(form, pizza, index) {
    let newPizza
    switch (form.elements["pizza_size"].value) {
        case "S": 
            newPizza = new SmallPizza(pizza.name, pizza.basePrice);
            break;
        case "M": 
            newPizza = new MediumPizza(pizza.name, pizza.basePrice);
            break;
        case "L": 
            newPizza = new LargePizza(pizza.name, pizza.basePrice);
            break;
    }
    replacePizzaElement(newPizza, index)
}


function replacePizzaElement(pizza, index) {
    let old = PIZZA_ELEMENT.children[index]
    PIZZA_ELEMENT.insertBefore(createPizzaElement(pizza, index), old)
    PIZZA_ELEMENT.removeChild(old)
}

function updateCart() {
    let totalPrice = 0
    ITEMS.innerHTML = ""
    cart.forEach(pizza => {
        let item = document.createElement("div")
        item.classList.add("item")
        item.innerHTML = `
            <h4>${pizza.name} (${pizza.size})</h4>
            <p>${pizza.price}€</p>
        `
        item.onclick = () => {
            cart.splice(cart.indexOf(pizza), 1)
            updateCart()
        }
        ITEMS.appendChild(item)
        totalPrice += pizza.price
    })
    totalPrice = Math.round(totalPrice * 100) / 100
    TOTAL_PRICE.innerText = `${totalPrice}€`
}

pizzas.forEach((pizza, index) => {
    let pizzaDiv = createPizzaElement(pizza, index)
    PIZZA_ELEMENT.appendChild(pizzaDiv)
})