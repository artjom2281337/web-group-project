/**
 * Base {@link Pizza} class which serves as a parent class for other pizza types
 */
class Pizza {

    /**
     * @type {String}
     * @member name of the {@link Pizza}
     */
    name

    /**
     * @type {float}
     * @member Base price of the {@link Pizza} (same as the price of {@link SmallPizza})
     */
    basePrice

    /**
     * Constructor for {@link Pizza} object
     * @param {String} name Name of the {@link Pizza}
     * @param {float} basePrice Base price of the {@link Pizza}
     */
    constructor(name, basePrice) {
        this.name = name
        this.basePrice = basePrice
    }
}

/**
 * Child class of {@link Pizza}. Represents small pizzas with diameter of 33cm.
 * Extends {@link Pizza} class.
 */
class SmallPizza extends Pizza {
    
    /**
     * @type {float}
     * @member Base price gets multiplied by this to reach {@link price}
     */
    static price_multiplier = 1.0

    /**
     * @type {String}
     * @member Symbolizes size of the {@link Pizza}
     */
    size

    /**
     * Constructor for {@link SmallPizza}
     * @param {String} name Name of the {@link Pizza}
     * @param {float} price Price of the {@link Pizza}
     */
    constructor(name, price) {

        // Initilaize Pizza object
        super(name, price)
        this.size = "S"

        // Round the price to two decimal pieces
        this.price = Math.round(price * SmallPizza.price_multiplier * 100) / 100
    }
}

/**
 * Child class of {@link Pizza}. Represents medium sized pizzas with diameter of 45cm.
 * Extends {@link Pizza} class.
 */
class MediumPizza extends Pizza {
    
    /**
     * @type {float}
     * @member Base price gets multiplied by this to reach {@link price}
     */
    static price_multiplier = 1.3

    /**
     * @type {String}
     * @member Symbolizes size of the {@link Pizza}
     */
    size

    /**
     * Constructor for {@link MediumPizza}
     * @param {String} name Name of the {@link Pizza}
     * @param {float} price Price of the {@link Pizza}
     */
    constructor(name, price) {

        // Initiliaze Pizza object
        super(name, price)
        this.size = "M"

        // Round the price to two decimal pieces
        this.price = Math.round(price * MediumPizza.price_multiplier * 100) / 100
    }
}

class LargePizza extends Pizza {

    /**
     * @type {float}
     * @member Base price gets multiplied by this to reach {@link price}
     */
    static price_multiplier = 1.5

    /**
     * @type {String}
     * @member Symbolizes size of the {@link Pizza}
     */
    size

    /**
     * Constructor for {@link LargePizza}
     * @param {String} name Name of the {@link Pizza}
     * @param {float} price Price of the {@link Pizza}
     */
    constructor(name, price) {

        // Initiliaze Pizza object
        super(name, price)
        this.size = "L"

        // Round the price to two decimal pieces
        this.price = Math.round(price * LargePizza.price_multiplier * 100) / 100
    }
}