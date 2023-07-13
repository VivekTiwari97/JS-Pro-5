const productContainer = document.getElementById('productContainer');
const cartContainer = document.getElementById('cartContainer');
const cartItemsContainer = document.getElementById('cartItems');
const cartItems = [];

// Function to add a product to the cart
function addToCart(product) {
  // Check if the product is already in the cart
  const existingItem = cartItems.find(item => item.id === product.id);

  if (existingItem) {
    // If the product is already in the cart, increase the quantity
    existingItem.quantity++;
  } else {
    // If the product is not in the cart, add it with quantity 1
    const newItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    };
    cartItems.push(newItem);
  }

  // Render the cart UI
  renderCartUI();
}

// Function to render the cart UI
function renderCartUI() {
  cartItemsContainer.innerHTML = '';

  cartItems.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cartItem');

    const image = document.createElement('img');
    image.src = item.image;
    cartItem.appendChild(image);

    const name = document.createElement('div');
    name.classList.add('name');
    name.textContent = item.title;
    cartItem.appendChild(name);

    const price = document.createElement('div');
    price.classList.add('price');
    price.textContent = `$${item.price}`;
    cartItem.appendChild(price);

    const quantity = document.createElement('div');
    quantity.textContent = `Qty: ${item.quantity}`;
    cartItem.appendChild(quantity);

    cartItemsContainer.appendChild(cartItem);
  });
}

// Fetch products from the API
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');

      const image = document.createElement('img');
      image.src = product.image;
      productDiv.appendChild(image);

      const title = document.createElement('div');
      title.classList.add('title');
      title.textContent = product.title;
      productDiv.appendChild(title);

      const price = document.createElement('div');
      price.classList.add('price');
      price.textContent = `$${product.price}`;
      productDiv.appendChild(price);

      const addToCartBtn = document.createElement('button');
      addToCartBtn.textContent = 'Add to Cart';
      addToCartBtn.addEventListener('click', () => addToCart(product));
      productDiv.appendChild(addToCartBtn);

      productContainer.appendChild(productDiv);
    });
  })
  .catch(error => {
    console.error('Error:', error);
    productContainer.innerHTML = '<p>An error occurred while fetching product data.</p>';
  });
