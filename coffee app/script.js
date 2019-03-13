let getAndCreateURL = "http://dc-coffeerun.herokuapp.com/api/coffeeorders/"
let buttonGET = document.getElementById("buttonGET")
let buttonPOST = document.getElementById('buttonPOST')
let coffeeBox = document.getElementById('coffeeBox')
let coffeeUL = document.getElementById('coffeeUL')
let emailTxtBox = document.getElementById('emailTxtBox')
let orderTxtBox = document.getElementById('orderTxtBox')
let getByEmailBtn = document.getElementById('getByEmailBtn')
let deleteByEmailBtn = document.getElementById('deleteByEmailBtn')
let deleteTxtBox = document.getElementById('deleteTxtBox')
let getOrderTxtBox = document.getElementById('getOrderTxtBox')

buttonGET.addEventListener('click', function () {

    // console.log(JSON.stringify(paramsToSend))

    // if statement here for GET or POST

    fetch(getAndCreateURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(paramsToSend)
    }).then(function (response) {
        return response.json()
    }).then(function (json) {
        // since get returns an object use Object.keys to use object key (emailAddress) to access elements inside
        console.log(Object.keys(json))
        let keys = Object.keys(json)
        console.log(keys)
        let orders = keys.map(function (key) {
            // console.log(json[key])
            return `<li>
                        <div class="orderBox">
                            <p>email: ${json[key].emailAddress}</p>
                            <p>Order: ${json[key].coffee}</p>
                        </div>       
                    </li>`

        })
        coffeeUL.innerHTML = orders.join("")
    })
})

buttonPOST.addEventListener('click', function () {

    let paramsToSend = { emailAddress: `${emailTxtBox.value}`, coffee: `${orderTxtBox.value}` }

    fetch(getAndCreateURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paramsToSend)
    }).then(function (response) {
        return response.json()
    }).then(function (json) {
        console.log(json)
        console.log(Object.keys(json))

    }).catch(function () {
        console.log("request failed")
    })
})

// let emailURL = "http://dc-coffeerun.herokuapp.com/api/coffeeorders/" + deleteTxtBox.value
// for (const key of Object.keys(obj)) {
//     console.log(key, obj[key]);
// }
// To delete
// http://dc-coffeerun.herokuapp.com/api/coffeeorders/arya@stark.com
deleteByEmailBtn.addEventListener('click', function () {
    let emailURL = "http://dc-coffeerun.herokuapp.com/api/coffeeorders/" + deleteTxtBox.value

    fetch(emailURL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(function (response) {
        return response.json()
    }).then(function (json) {
        console.log(json)
    }).catch(function () {
        console.log("request failed")
    })
})

getByEmailBtn.addEventListener('click', function () {
    let emailURL = "http://dc-coffeerun.herokuapp.com/api/coffeeorders/" + getOrderTxtBox.value
    fetch(emailURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },

    }).then(function (response) {
        return response.json()
    }).then(function (json) {
        console.log(json)
        coffeeUL.innerHTML = `<li>
                                <div class="orderBox">
                                    <p>email: ${json.emailAddress}</p>
                                    <p>Order: ${json.coffee}</p>
                                </div>       
                            </li>`
    }).catch(function () {
        console.log("request failed")
    })


})