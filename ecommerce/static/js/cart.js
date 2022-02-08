// query all cart item and with the class attribute and loop through
// all the button ans get the product id and actions
// get all the buttons
var updateBtn = document.getElementsByClassName("update-cart")
// loop through all the buttons
for (let i = 0; i < updateBtn.length; i++) {
    updateBtn[i].addEventListener("click", function () {
        var productId = this.dataset.product;
        var action = this.dataset.action;
        // console.log("productId:", productId, "action:", action)

        // check for anonymous user
        // console.log("USER:", user)
        if (user == "AnonymousUser") {
            console.log("Not log in")
        } else {
            updateUserOrder(productId, action)
        }
    })
}

function updateUserOrder(productId, action) {
    // console.log("User is log in, sending data...")
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
        // console.log("data:", data)
        // reload the page
        location.reload()
    })
}