const fetchAndDisplayProducts = () => {
  fetch('http://localhost:3000/api/products')
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not okay");
      }
      return response.json();
    })
    .then(products => {
      const item = document.getElementById("items");
      products.forEach(product => {
        item.innerHTML += `
          <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>
        `;
      });
    })
    .catch(error => {
      console.error("Error fetching products: ", error);
    });
};

fetchAndDisplayProducts();
