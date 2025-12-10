async function updateOrderStatus(id, status) {
  try {
    const result = await fetch('/admin/order', {
      method: "put",
      body: JSON.stringify({ id, status }),
      headers: {
        "content-type": "application/json"
      }
    });

    const response = await result.json();

    return window.location.href = "/admin"
  } catch (error) {
    console.log("error: ", error)
  }
}

async function createProduct() {
  const formData = new FormData();
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value;
  const image = document.getElementById('image').files[0];

  try {
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category_id", category);
    formData.append("description", description);
    formData.append("image", image);

    const result = fetch('/admin/product', {
      body: formData,
      method: "post"
    })

    const response = (await result).json();

    console.log("response upload product: ", response);

    return window.location.reload();
  } catch (error) {
    console.log(error)
  }
}

async function logout() {
  await fetch('/logout')

  return this.location.href = "/"
}

function toggleProductForm() {
  const form = document.getElementById('product-form');
  const btn = document.getElementById('toggleFormBtn');
  
  if (form.style.display === 'none' || form.style.display === '') {
      form.style.display = 'block';
      btn.textContent = '❌ Batal Tambah Produk';
      form.scrollIntoView({ behavior: 'smooth' });
  } else {
      form.style.display = 'none';
      btn.textContent = '➕ Tambah Produk Baru';
  }
}

function showContent(contentId, element) {
  // Hide all content sections
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => section.classList.remove('active'));

  // Show selected content
  document.getElementById(contentId + '-content').classList.add('active');

  // Update active menu
  const menuItems = document.querySelectorAll('.sidebar-menu a');
  menuItems.forEach(item => item.classList.remove('active'));
  element.classList.add('active');
}

// Add click handlers for approve/reject buttons
document.addEventListener('DOMContentLoaded', function () {
  const approveButtons = document.querySelectorAll('.btn-approve');
  const rejectButtons = document.querySelectorAll('.btn-reject');

  // approveButtons.forEach(button => {
  //   button.addEventListener('click', function () {
  //     if (!this.disabled) {
  //       alert('Pesanan telah disetujui!');
  //       // Here you would typically send an AJAX request to your CodeIgniter controller
  //     }
  //   });
  // });

  // rejectButtons.forEach(button => {
  //   button.addEventListener('click', function () {
  //     if (confirm('Apakah Anda yakin ingin menolak pesanan ini?')) {
  //       alert('Pesanan telah ditolak!');
  //       // Here you would typically send an AJAX request to your CodeIgniter controller
  //     }
  //   });
  // });

  // Add click handler for payment proof images
  const paymentImages = document.querySelectorAll('.payment-proof img');
  paymentImages.forEach(img => {
    img.addEventListener('click', function () {
      // Create modal or open in new window
      window.open(this.src, '_blank');
    });
  });
});