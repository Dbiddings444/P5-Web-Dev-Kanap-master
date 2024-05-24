let cart = JSON.parse(localStorage.getItem("cart")) || [];


function removeFromCart(itemColor, itemId) {
  const newCart = cart.filter((item) => item.color !== itemColor && item.id !==itemId);
  localStorage.setItem("cart", JSON.stringify(newCart));
  cart = newCart;
}

function updateQuantity(itemId, newQuantity) {
  const itemIndex = cart.findIndex((item) => item.id === itemId); // finding index of item being changed
  if (itemIndex !== -1) { 
    cart[itemIndex].quantity = parseInt(newQuantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Quantity has been successfully updated!");
  }
}

const displayCart = () => {
  // Collect the cart from LocalStorage
  let totalPrice = 0;
  let totalQuantity = 0 ;
  const cartTotal = document.getElementById("totalPrice")
  const cartQuantity = document.getElementById("totalQuantity")


  // Display the cart on the cart page
  cart.forEach((product) => {
    // Create elements for each item
    let color = product.color;
    let quantity = product.quantity;
    const Cartitem = document.getElementById("cart__items");
    fetch("http://localhost:3000/api/products/" + product.id)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not okay");
        }
        return response.json();
      })
      .then((item) => {
        // Ensure item.price is a number before adding it to totalPrice
        if (!isNaN(item.price)) {
          totalPrice += parseFloat(item.price) * quantity;
        }
        // if (!isNaN(quantity)) {
        //     totalQuantity += quantity;
        //   }
        Cartitem.innerHTML += `
        <article class="cart__item" data-id=${product.id} data-color=${color}>
        <div class="cart__item__img">
          <img src=${item.imageUrl} alt=${item.altTxt}>
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${item.name}</h2>
            <p>${color}</p>
            <p>€${item.price}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Quantity : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${quantity}>
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Delete</p>
            </div>
          </div>
        </div>
      </article> `;
})
      .catch((error) => {
        console.error("Error fetching products: ", error);
      });

 });
 cartTotal.innerHTML=totalPrice;
 cartQuantity.innerHTML=totalQuantity;
};
displayCart();

const cartItemsContainer = document.getElementById("cart__items");
cartItemsContainer.addEventListener("change", function(event) {
    if (event.target.classList.contains("itemQuantity")) {
        const itemId = event.target.closest(".cart__item").dataset.id;
        const newQuantity = event.target.value;
        updateQuantity(itemId, newQuantity);
    }
});
cartItemsContainer.addEventListener("click", function(event) {
  if (event.target.classList.contains("deleteItem")) {
      const itemColor = event.target.closest(".cart__item").dataset.color;
      const itemId = event.target.closest(".cart__item").dataset.ic;
      event.target.closest(".cart__item").remove();
      removeFromCart(itemColor, itemId);
  }
});