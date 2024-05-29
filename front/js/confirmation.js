
const test = () => {
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const queryId = urlParams.get('orderId');

const orderId = document.getElementById("orderId")
orderId.innerHTML(queryId);
}
test();