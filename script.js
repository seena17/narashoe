const products = [
    { id: 1, name: 'Kobe Protro 8', price: 4199000, image: 'image/kobeshoe.jpg' },
    { id: 2, name: 'Nike Precision 7', price: 2999000, image: 'image/precision7.jpg' },
    { id: 3, name: 'Luka 3 PF', price: 1900000, image: 'image/luka3pf.jpg' },
    { id: 4, name: 'Luka 2', price: 2199000, image: 'image/jordanairnikeluka2.jpg' },
    { id: 5, name: 'Kobe Protro 8', price: 3990000, image: 'image/protroijo.jpg' },
    { id: 6, name: 'MB 01', price: 4000000, image: 'image/mb1.jpg' },
    { id: 7, name: 'Kobe Bryant 10', price: 5600000, image: 'image/kb10.jpg' },
    { id: 8, name: 'Ardiles Abraham Damar', price: 5500000, image: 'image/ad.jpg' },
    { id: 9, name: 'Nike Zoom Freak', price: 4999000, image: 'image/zoom.jpg' },
    { id: 10, name: 'Kobe Bryant 5 X Ray', price: 4700000, image: 'image/kb5x.jpg' },
    { id: 11, name: 'Kobe Bryant A.D', price: 7800000, image: 'image/kbad.jpg' },
    { id: 12, name: 'Kobe Bryant 9', price: 5900000, image: 'image/kb9.jpg' },
  ];

  const cart = [];

  function renderProducts() {
    const container = document.getElementById('product-list');
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.animation = 'fadeInUp 0.7s ease forwards';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>Rp${product.price.toLocaleString()}</p>
        <button class="btn" onclick="addToCart(${product.id})">Beli</button>
      `;
      container.appendChild(card);
    });
  }

  function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
  }

  function updateCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';
    cart.forEach(item => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `<h3>${item.name}</h3><p>Rp${item.price.toLocaleString()}</p>`;
      cartContainer.appendChild(div);
    });
  }

  function generateReceipt(nama, alamat, telepon, ukuran) {
    const receipt = document.getElementById('receipt');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const items = cart.map(item => `- ${item.name}: Rp${item.price.toLocaleString()}`).join('<br>');
    receipt.innerHTML = `
      <h2>Struk Pemesanan</h2>
      <p><strong>Nama:</strong> ${nama}</p>
      <p><strong>Alamat:</strong> ${alamat}</p>
      <p><strong>Telepon:</strong> ${telepon}</p>
      <p><strong>Ukuran:</strong> ${ukuran}</p>
      <p><strong>Produk:</strong><br>${items}</p>
      <p><strong>Total:</strong> Rp${total.toLocaleString()}</p>
    `;
    receipt.style.display = 'block';
    document.getElementById('download-btn').style.display = 'inline-block';
  }

  function downloadPDF() {
    const receiptContent = document.getElementById('receipt').innerText;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFont('helvetica');
    doc.text(receiptContent, 10, 10);
    doc.save('Struk Nara Shoe.pdf');
  }

  function showSection(id) {
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
    document.getElementById(id).style.display = 'block';
  }

  document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const nama = document.getElementById('nama').value;
    const alamat = document.getElementById('alamat').value;
    const telepon = document.getElementById('telepon').value;
    const ukuran = document.getElementById('ukuran').value;
    generateReceipt(nama, alamat, telepon, ukuran);
    alert('Pesanan berhasil diproses! Struk tersedia di bawah.');
    this.reset();
  });

  function getFormattedDate() {
    const today = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return today.toLocaleDateString('id-ID', options);
  }
  

  renderProducts();
  showSection('produk'); // default tampil halaman produk

  function generateReceipt(nama, alamat, telepon, ukuran) {
    const receipt = document.getElementById('receipt');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const items = cart.map(item => `<div class="produk-item">• ${item.name} - Rp${item.price.toLocaleString()}</div>`).join('');
    const tanggal = getFormattedDate();
  
    receipt.innerHTML = `
      <h2>Struk Pemesanan Nara Shoe</h2>
      <p><strong>Tanggal:</strong> ${tanggal}</p>
      <p>--------------------------------------</p>
      <p><strong>Nama:</strong> ${nama}</p>
      <p><strong>Alamat:</strong> ${alamat}</p>
      <p><strong>Telepon:</strong> ${telepon}</p>
      <p><strong>Ukuran Sepatu:</strong> ${ukuran}</p>
      <p><strong>Produk Dipesan:</strong><br>${items}</p>
      <p class="total">Total: Rp${total.toLocaleString()}</p>
    `;
  
    receipt.style.display = 'block';
    document.getElementById('download-btn').style.display = 'inline-block';
  }

  const music = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-btn');

  function toggleMusic() {
    if (music.paused) {
      music.play();
      musicBtn.textContent = '⏸️ Hentikan Musik';
    } else {
      music.pause();
      musicBtn.textContent = '▶️ Putar Musik';
    }
  }