// load product
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("col",);
    div.innerHTML = `
      <div class="m-3 single-product">
          <div class="card border-0 h-100">
              <img
              src="${image}" class="img-fluid product-image" />
              <div class="card-body text-center">
                <h6 class="card-title">${product.title}</h6>
                <div><b>Category:</b> ${product.category}</div>
                <div class="rating-star">
                  <span class="fw-bold">${product.rating.rate}</span>
                  ${calCulateRatingStar(product.rating.rate, product.rating.count)}
                  <span class="text-muted"> (${product.rating.count} person)</span>
                </div>
                <h class="mt-3 fw-bold">Price: $ ${product.price}</h>
              </div
          </div>
          <div class="card-footer d-flex justify-content-center">
              <button onclick="addToCart('${product.id}', '${product.price}')" id="addToCart-btn" class="btn primary-color me-2"><i class="fas fa-cart-plus"></i> Add to cart</button>

              <button onclick="displayProductDetails(${product.id})" id="details-btn" class="btn bg-white border-secondary" data-bs-toggle="modal" data-bs-target="#productModal">
              <i class="far fa-eye"></i> Details</button>  
          </div>
          
      </div>
    `
    document.getElementById("all-products").appendChild(div);

  }
};

// add to cart
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

// get input value
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  // const converted = parseInt(element);
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = (total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", (priceConverted * 0.2).toFixed(2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", (priceConverted * 0.3).toFixed(2));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", (priceConverted * 0.4).toFixed(2));
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// modalConent
const displayProductDetails = (id) => {
  const modalDialog = document.getElementsByClassName('modal-dialog')[0]
  modalDialog.textContent = '';
  url =  `https://fakestoreapi.com/products/${id}`
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const modalConent = `
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${data.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ${data.description}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary"><i class="far fa-heart"></i> Add to favorite</button>
          </div>
        </div>
      `
      modalDialog.innerHTML = modalConent;
    });
  
  
}

// calculate star icon form value
const calCulateRatingStar = (rate) => {
  let fullStar = parseInt(rate);
  let decPart = parseInt((rate + "").split(".")[1]) || 0;

  let star = '';
  for (let i = 0; i<fullStar; i++){
    star += '<i class="fas fa-star"></i> ';
  }
  if (decPart < 8 && decPart > 2){
    star += '<i class="fas fa-star-half-alt"></i> ';
    fullStar += 1;
  }
  else if(decPart > 7){
    star += '<i class="fas fa-star"></i> ';
    fullStar += 1;
  }
  for (let j = fullStar; j < 5; j++) {
    star += '<i class="far fa-star"></i> ';
  }
  return star;
}
