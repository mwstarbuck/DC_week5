let addStoreBtn = document.getElementById('addStoreBtn')
let storeTxtBox = document.getElementById('storeTxtBox')
let storesUL = document.getElementById('storesUL')
let stores = []
// create database
let database = firebase.database()

// create a child node on the root called stores
let storesRef = database.ref("stores")



// create a child node on users node
// ====== CODE STARTS HERE ======
// let storeRef = storesRef.child("store")
// set properties on user node
// storeRef.set({
//     name: "Target",
//     loc: "Houston"
// })

addStoreBtn.addEventListener('click', function () {
    // console.log(storeTxtBox.value)
    let name = storeTxtBox.value

    // push function allows to create unique/auto id
    let storeRef = storesRef.push({
        name: name
    })
    // Adding items to store -- best way?
    storeRef.child("item").set({
        name: "banana",
        price: 0.70
    })
    console.log(storeRef)

})
// ===== Using 'value' in the .on function =======
// database.ref("stores")
//     .on('value', function (snapshot) {

//         // shows all keys and values of snapshot object
//         console.log(snapshot.val())
//         //
//         for (key in snapshot.val()) {
//             console.log(snapshot.val()[key])
//         }
//         let stores = []
//         snapshot.forEach((childSnapshot) => {
//             stores.push(childSnapshot.val())
//             console.log(stores)

//         })
//         displayStores()
//     })
// =================================================


database.ref("stores")
    .on("child_added", function (snapshot) {
        // prints key 
        console.log(snapshot.key)

        // add store data to new store obj properties
        let store = new Store(snapshot.key, snapshot.val().name)
        // adding store obj to my stores array
        stores.push(store)
        console.log(stores)
        //displaying the stores in html
        displayStores()
    })
database.ref("stores")
    .on("child_removed", function (snapshot) {
        stores = stores.filter((store) => {
            return store.key != snapshot.key
        })
        displayStores()
    })

function displayStores() {

    //code here
    let storeLIItems = stores.map((store) => {
        return `<li>
                    <div class="storeBox">
                        <h4>${store.name}</h4>
                        <button class="addItemBtn">Add Item</button>
                        <input class="addItemTxtBox" type="text">
                        <button id="${store.key}" class="delBtn" onclick="deleteStore('${store.key}')">Delete</button>
                    <div>
                </li>`
    })
    storesUL.innerHTML = storeLIItems.join('')
}

function deleteStore(key) {
    database.ref("stores").child(key)
        .remove()
}