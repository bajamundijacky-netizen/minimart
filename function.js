let products = [
  { id: 1, name: "🍛Omega pasta", price: 101, desc: "Hot delicious pasta"},
  { id: 2, name: "🍞Bread", price: 59, desc: "Sweet bread"},
  { id: 3, name: "🍜Instant noodles", price: 30, desc: "Fast delicious meal"},
  { id: 4, name: "🥚Egg", price: 15, desc: "Fresh egg." },
  { id: 5, name: "🥫Mega sardines", price: 24, desc: "Fresh premium sardines"},
  { id: 6, name: "🧃Juice pack", price: 12, desc: "creamy fruit juice"},
];

let cart = [];

function displayProducts() {
  let container = document.getElementById("productList");
  container.innerHTML = "";

  products.forEach((p) => {
    let div = document.createElement("div");
    div.className = "product";

    let inCart = cart.find((item) => item.id === p.id);

    div.innerHTML = `
                <p> ${p.name}</p>
                <small>${p.desc}</small>
                <p>Price: ₱${p.price}</p>
                <button onclick="addToCart(${p.id})" ${inCart ? "disabled" : ""}>
                    ${inCart ? "Already in cart" : "Add to 🛒"}
                </button>
            `;

    container.appendChild(div);
  });
}

function addToCart(id) {
  let existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty++; 
  } else {
    let product = products.find(p => p.id === id);

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
    });
  }

  updateCart();
}

function updateCart() {
  let cartDiv = document.getElementById("cartItems");
  let total = 0;

  if (cart.length === 0) {
    cartDiv.innerHTML = "Cart is empty";
  } else {
    cartDiv.innerHTML = "";

    cart.forEach((item) => {
      let subtotal = item.price * item.qty;
      total += subtotal;

      let div = document.createElement("div");

      div.innerHTML = `
                    <p>${item.name} - ₱${item.price}</p>
                    <p>Qty: 
                        <button onclick="changeQty(${item.id}, -1)">➖</button>
                        ${item.qty}
                        <button onclick="changeQty(${item.id}, 1)">➕</button>
                    </p>
                    <p>Subtotal: ₱${subtotal}</p>
                    <button onclick="removeItem(${item.id})">Remove</button>
                    <hr>
                `;

      cartDiv.appendChild(div);
    });
  }

  document.getElementById("total").innerText = total;
  document.getElementById("cartCount").innerText = cart.length;

  displayProducts();
}

function changeQty(id, change) {
  let item = cart.find((i) => i.id === id);

  item.qty += change;

  if (item.qty <= 0) {
    cart = cart.filter((i) => i.id !== id);
  }

  updateCart();
}

function removeItem(id) {
  cart = cart.filter((i) => i.id !== id);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

displayProducts();