// query all cart item and with the class attribute and loop through
// all the button ans get the product id and actions
// get all the buttons
var updateBtn = document.getElementsByClassName("update-cart")
// loop through all the buttons
for (let i = 0; i < updateBtn.length; i++) {
    updateBtn[i].addEventListener("click", function () {
        var productId = this.dataset.product;
        var action = this.dataset.action;
        console.log("productId:", productId, "action:", action)

        // check for anonymous user
        console.log("USER:", user)
        if (user == "AnonymousUser") {
            addCookieItem(productId, action)
        } else {
            updateUserOrder(productId, action)
        }
    })
}

function addCookieItem(productId, action){
    console.log("Not log in..")
    if (action == "add") {
        if (cart[productId] == undefined) {
            cart[productId] = {"quantity": 1}
        }else{
            cart[productId]["quantity"] += 1
        } 
    }
    if (action == "remove") {
        cart[productId]["quantity"] -= 1
        // check if item is equal to zero
        if (cart[productId]["quantity"] <= 0) {
            console.log("Remove item")
            delete cart[productId]
        } 
    }
    console.log("Cart: ", cart)
    document.cookie = "cart=" + JSON.stringify(cart) + ";domain=;path=/"
    location.reload()
}

function updateUserOrder(productId, action) {
    console.log("User is log in, sending data...")
    // to send this data
    var url = '/update_item/'

    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            // for handling error
            "X-CSRFToken": csrftoken,
        },
        body:JSON.stringify({"productId": productId, "action": action})
    })

    .then((response) => {
        return response.json()
    })

    .then((data) => {
        console.log("data:", data)
        // reload the page
        location.reload()
    })
}