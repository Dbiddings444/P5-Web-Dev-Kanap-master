let cart = JSON.parse(localStorage.getItem("cart")) || [];

function removeFromCart(itemColor, itemId) {
  const itemIndex = cart.findIndex(
    (item) => item.id === itemId && item.color === itemColor
  ); // finding index of item being changed
  if (itemIndex >= 0 && itemIndex < cart.length) {
    cart.splice(itemIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Item removed successfully");
  } else {
    console.log("Invalid index");
  }
}

function updateQuantity(itemId, itemColor, newQuantity) {
  const itemIndex = cart.findIndex(
    (item) => item.id === itemId && item.color === itemColor
  ); // finding index of item being changed
  if (itemIndex !== -1) {
    cart[itemIndex].quantity = parseInt(newQuantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Quantity has been successfully updated!");
  }
}

const displayCart = () => {
  // Collect the cart from LocalStorage
  let totalPrice = 0;

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = document.getElementById("totalPrice");
  const cartQuantity = document.getElementById("totalQuantity");

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
        if (!isNaN(item.price)) {
          totalPrice += parseFloat(item.price) * quantity;
          console.log(totalPrice);
        }

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

        cartTotal.innerHTML = totalPrice;
        cartQuantity.innerHTML = totalQuantity;
      })
      .catch((error) => {
        console.error("Error fetching products: ", error);
      });
  });
};
displayCart();

const cartItemsContainer = document.getElementById("cart__items");
cartItemsContainer.addEventListener("change", function (event) {
  if (event.target.classList.contains("itemQuantity")) {
    const itemId = event.target.closest(".cart__item").dataset.id;
    const itemColor = event.target.closest(".cart__item").dataset.color;
    const newQuantity = event.target.value;
    updateQuantity(itemId, itemColor, newQuantity);
  }
});
cartItemsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteItem")) {
    const itemColor = event.target.closest(".cart__item").dataset.color;
    const itemId = event.target.closest(".cart__item").dataset.id;
    event.target.closest(".cart__item").remove();
    removeFromCart(itemColor, itemId);
  }
});
