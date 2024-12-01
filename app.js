// Base API URL
const API_URL = "https://fakestoreapi.com/products";

// Cart data
let cart = [];

// Fetch and render products
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();

        renderProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Render products on the page
function renderProducts(products) {
    const productList = document.querySelector(".product");

    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product";

        productCard.innerHTML = `  
         <div class="card" data-aos="fade-up" style="width: 18rem;">
        <img src="${product.image}" class="card-img-top" alt="..." width=" 80%" height="150px">
        <div class="card-body">
          <h5 class="card-title">$${product.price}|${product.rating.rate}★★★</h5>
          <p class="card-text">${product.title}</p>
          <a href="#" class="btn btn-primary" onclick="seemore(${product.id})">seemore</a>
         <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
        </div>
    
      </div>
        `;

        productList.appendChild(productCard);
    });
}

// Add to cart
function addToCart(productId, productName, productPrice) {
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }
    Swal.fire({
        title: "Your cart add successfuly!",
        text: "Good Job",
        icon: "success"
      });
    renderCart();
}

// Render cart
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const checkoutButton = document.getElementById("checkout-button");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        checkoutButton.disabled = true;
        return;
    }

    cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
           <div class="cartit">
            <h6>Name :</h6> <p>${item.name} </p>
            <h6>Price :</h6> <p>$${item.price.toFixed(2)}</p>
            <h6>Quantity :</h6><p> ${item.quantity}</p>
           </div>
        `;
        cartItems.appendChild(cartItem);
    });

    checkoutButton.disabled = false;
}

// Checkout functionality
document.getElementById("checkout-button").addEventListener("click", () => {
    alert("Checkout successful!");
    cart = [];
    renderCart();
});

// Initialize
fetchProducts();

function seemore(id) {
  var data = localStorage.setItem("card",id);
  console.log(data);
  window.location = "seemore.html"
}