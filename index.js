// assigning constant variables with api url and html elements
const QUOTE_SERVER_URL = "https://food-quote-api.vercel.app/api/foodquote"
const QUOTE_ELEMENT = document.getElementById("food-quote")
const QUOTE_AUTHOR_ELEMENT_START = '<br><span id="food-quote-author">'
const QUOTE_AUTHOR_ELEMENT_END = '</span>'
// fetches with api url, receives json data with quote and returns the quote with author to the page
fetch(QUOTE_SERVER_URL).then(response => {
    response.json().then(body => {
        QUOTE_ELEMENT.innerHTML = `${body.quote}${QUOTE_AUTHOR_ELEMENT_START}${body.author}${QUOTE_AUTHOR_ELEMENT_END}`
    }).finally(() => QUOTE_ELEMENT.style.opacity = '1')
})