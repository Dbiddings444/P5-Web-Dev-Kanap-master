
const displayProductInfo = () => {

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const queryId = urlParams.get('id');

    fetch("http://localhost:3000/api/products/"+ queryId)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not okay");
        }
        return response.json();
      })
      .then(product => {

        const product_img = document.querySelector(".item__img");
        product_img.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
        const product_name = document.getElementById("title");
        product_name.innerHTML = product.name;
        const product_price = document.getElementById("price");
        product_price.innerHTML = product.price;
        const product_description = document.getElementById("description");
        product_description.innerHTML = product.description;
        const product_colors = document.getElementById("colors");
        product.colors.forEach(option => {
          product_colors.innerHTML +=
            `<option value="${option}">${option}</option>`;
        });
      })
      .catch(error => {
        console.error("Error fetching products: ", error);
      });
  };
displayProductInfo();