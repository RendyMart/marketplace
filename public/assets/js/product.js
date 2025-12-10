async function addToCart(product_id, qty, price) {

  const response = await fetch('/keranjang', {
    method: "POST", 
    body: JSON.stringify({ product_id, qty, price }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });

  const result = await response.json();

  console.log(result)

  if(result.total_cart) {
    modifyCartCounter(result.total_cart);
  };

  return;
}

async function deleteProduct(product_id) {
  try {
    const result = await fetch('/product', {
      method: "delete",
      body: JSON.stringify({ product_id }),
      headers: {
        'content-type': "application/json"
      }
    });

    const response = await result.json();
    
    window.location.reload();
  } catch (error) {
    console.log(error)
  }
}
async function deleteMessage(message_id) {
  try {
    const result = await fetch('/message', {
      method: "delete",
      body: JSON.stringify({ message_id }),
      headers: {
        'content-type': "application/json"
      }
    });

    const response = await result.json();
    
    window.location.reload();
  } catch (error) {
    console.log(error)
  }
}

function modifyCartCounter(count) {
  const cartCounter = document.getElementById('cart-counter');

  if(+count === 0) {
    return cartCounter.hidden = true;
  }

  cartCounter.hidden = false;
  return cartCounter.textContent = count;
}