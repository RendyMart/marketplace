const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

async function updateQty(cartId, type) {
  const qty = document.getElementById(`qty-${cartId}`);
  const totalPrice = document.getElementById('total-price');
  const cartMinusButton = document.getElementById(`cart-min-${cartId}`);
  const cartItemDetail = document.getElementById(`detail-item-total-${cartId}`);
  const cartItemPrice = document.getElementById(`detail-item-price-${cartId}`);

  try {
    const result = await fetch(`/keranjang/${cartId}`, {
      method: "put",
      headers: {
        'content-type': 'Application/json'
      }, 
      body: JSON.stringify({ type })
    });

    if (type === "plus") {
      cartMinusButton.hidden = false;
    }
  
    const response = await result.json();

    const cart = response.cart.find(cart => +cart.id === +cartId);
    const newQuantity = cart.quantity;
    const newCartPrice = cart.price;

    qty.value = newQuantity;
    totalPrice.textContent = formatter.format(response.total_price);
    cartItemDetail.textContent = `${cart.name} x${cart.quantity}`;
    cartItemPrice.textContent = formatter.format(newCartPrice);

    if(+newQuantity === 1) {
      cartMinusButton.hidden = true
    };

    return;
  } catch (error) {
    console.log(error)
  }
};

async function deleteCart(cartId) {
  const cartItem = document.getElementById(`cart-item-${cartId}`);
  const cartItemDetail = document.getElementById(`detail-item-total-${cartId}`);
  const cartItemPrice = document.getElementById(`detail-item-price-${cartId}`);
  const totalPrice = document.getElementById('total-price');

  try {
    const result = await fetch(`/keranjang/${cartId}`, {
      method: "delete",
      headers: {
        'content-type': 'application/json'
      }
    })

    const response = await result.json();

    cartItem.remove();
    cartItemDetail.remove();
    cartItemPrice.remove();

    totalPrice.textContent = formatter.format(response.total_price);

    return modifyCartCounter(response.total_cart);
  } catch (error) {
    console.log(error)
  }
}

async function createOrder(total_price, cart) {
  // console.log(cart);

  // return
  try {
    const result = await fetch('/order', {
      method: "post",
      body: JSON.stringify({ total_price, cart }),
      headers: {
        'content-type': "application/json"
      }
    });

    const response = await result.json();

    console.log("response: ", response)

    window.location.href = `/order/${response.order_id}`;
  } catch (error) {
    console.log(error);
  }
}

function openProductImage(path) {
  alert(path)
  return window.open(path, "_blank")
}

function modifyCartCounter(count) {
  const cartCounter = document.getElementById('cart-counter');

  if(+count === 0) {
    return cartCounter.hidden = true;
  }

  cartCounter.hidden = false;
  return cartCounter.textContent = count;
};

async function logout() {
  await fetch('/logout')

  return this.location.href = "/"
}