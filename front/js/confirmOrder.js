const orderForm = document.getElementsByClassName("cart__order__form")
if (orderForm.length > 0) {
 orderForm[0].addEventListener("submit", async function (event) {
  event.preventDefault();
  let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let address = document.getElementById("address").value.trim();
    let city = document.getElementById("city").value.trim();
    let email = document.getElementById("email").value.trim();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      displayErrorMessage("emailErrorMsg", "Invalid email format.");
      return;
    }

    if (!firstName || !lastName || !address || !city || !email) {
      displayErrorMessage("emailErrorMsg", "All fields are required.");
      return;
  }
  
  if (!firstName){
    displayErrorMessage("","")
  } 

    let contact = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    };


    function displayErrorMessage(errId, message) {
      let errorMessageDiv = document.getElementById(errId);
      errorMessageDiv.textContent = message;
    }

    function createItemsArray(cart) {
      let itemsArray = [];

      // Iterate over each item in the cart
      cart.forEach((item) => {
        // Add the new item to the items array
        itemsArray.push(item.id.toString());
      });

      return itemsArray;
    }

    let items = createItemsArray(cart);
    let data = {
      contact: contact,
      productTable: items,
    };
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    debugger

    console.log('Data sent to the server: ' , data);
    await fetch("http://localhost:3000/api/products/order", options)
    .then(response => {
      debugger
        if (!response.ok) {
            throw new Error("Network response was not okay");
        }
        return response.json();
    })
    .then(data => {
        console.log("POST request successful:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
  });
}