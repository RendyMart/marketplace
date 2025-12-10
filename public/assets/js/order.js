function onCLickTab(type) {
  const qris = document.getElementById("qris");
  const mandiri = document.getElementById("mandiri");
  const qrisSection = document.getElementById('qris-section');
  const mandiriSection = document.getElementById('mandiri-section');

  if(type === "qris") {
    qris.classList.add("active");
    mandiri.classList.remove("active");

    qrisSection.hidden = false;
    mandiriSection.hidden = true;
  } else {
    mandiri.classList.add("active");
    qris.classList.remove("active");

    qrisSection.hidden = true;
    mandiriSection.hidden = false;
  }
}

async function onUploadPayment(orderId) {
  const cartCounter = document.getElementById('cart-counter');
  const address = document.getElementById('order-address');
  const image = document.getElementById('payment-image');
  const formData = new FormData();
 
  if(address.value.trim().length === 0 || image.files.length === 0) {
    alert("Alamat pengiriman & Bukti pembayaran harus diisi");

    return;
  };

  formData.append("address", document.getElementById('order-address').value);
  formData.append("payment_image", document.getElementById('payment-image').files[0]);

  try {
    const result = await fetch(`/order/${orderId}`, {
      method: "post",
      body: formData,
    });
  
    const response = await result.json(result)
    
    cartCounter.hidden = true

    window.location.href = `/order/${orderId}`
  } catch (error) {
    console.log(error)
  }



 
}