function modifyCartCounter(count) {
  const cartCounter = document.getElementById('cart-counter');
  cartCounter.textContent = "kontol"

  if(+count === 0) {
    return cartCounter.hidden = true;
  }

  cartCounter.hidden = false;
  return cartCounter.textContent = count;

}

export {
  modifyCartCounter
}