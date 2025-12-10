async function sendMessage() {
  const payload = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    text: document.getElementById("text").value,
  }

  const htmlMessage = document.getElementById("message-response");
  
  try {
    const result = await fetch('/message', {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        'content-type': "application/json"
      }
    });

    const response = await result.json();

    htmlMessage.hidden = false;
    htmlMessage.textContent = response.message;
  } catch (error) {
    htmlMessage.hidden = false;
    htmlMessage.textContent = "Tidak bisa mengirim pesan saat ini, coba lagi beberapa saat";

    console.log(error)
  }
}