// Function to add a product to the cart
let cart = JSON.parse(localStorage.getItem("cart"));
const addToCart = () => {
 
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const queryId = urlParams.get('id');

  if (typeof Storage !== "undefined") {
    // Check if cart already exists in LocalStorage
    if (localStorage.getItem("cart") === null) {
      // If cart doesn't exist, create a new empty cart
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }

  fetch("http://localhost:3000/api/products/"+ queryId)
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not okay");
    }
    return response.json();
  })
  .then(product => {
  const product_id = product._id;
  const product_color = document.getElementById("colors").value;
  const product_quantity = parseInt(document.getElementById("quantity").value);
  if (product_color == "") {
    return alert("You need to select a color to add item to cart");
  }
  if (product_quantity <= 0) {
    return alert(
      "Your quantity needs to be more than zero to add item to cart"
    );
  }
  if (product_quantity > 100) {
    return alert("Your product quantity cannot exceed 100");
  }
 
    let existingItemIndex = cart.findIndex(
      (item) => item.id === product_id && item.color === product_color
    );
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += product_quantity;
    }
    else {
    cart.push({
      id: product_id,
      color: product_color,
      quantity: product_quantity,
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Item added to cart successfully!");
})
.catch(error => {
  console.error("Error fetching product's id: ", error);
});
};

const addToCartButton = document.getElementById("addToCart");

function clearCart() {
  // Check if LocalStorage is supported
  if (typeof(Storage) !== "undefined") {
      // Remove the cart key from LocalStorage
      localStorage.removeItem("cart");
      console.log("Cart cleared successfully!");
  } else {
      // LocalStorage not supported, handle error
      console.error("LocalStorage is not supported in this browser.");
  }
}
// Add click event listener to the button
addToCartButton.addEventListener("click", function () {
  // Call the addToCart function with desired parameters
  addToCart(); // Example parameters, you can replace these with your actual data
});
