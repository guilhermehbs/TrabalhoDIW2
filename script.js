function fetchProducts() {
fetch('https://diwserver.vps.webdock.cloud/products')
.then(res => res.json())
.then(data => {
  data = data.products
  renderProducts(data);
});
    };

function renderProducts(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  products.forEach(product => {
    const cardCol = document.createElement('div');
    cardCol.className = 'col-md-3 mt-4';

    const card = document.createElement('div');
    card.className = 'card';

    const cardImg = document.createElement('img');
    cardImg.className = 'card-img-top';
    cardImg.src = product.image;
    cardImg.alt = 'Imagem do produto';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = product.title;

    const cardCategory = document.createElement('p');
    cardCategory.className = 'card-text';
    cardCategory.textContent = `Category: ${product.category}`;

    const cardPrice = document.createElement('p');
    cardPrice.className = 'card-text';
    cardPrice.textContent = `Price: $${product.price}`;

    card.addEventListener('click', function () {
      window.location.href = `detalhes.html?id=${product.id}`;
    });

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardCategory);
    cardBody.appendChild(cardPrice);

    card.appendChild(cardImg);
    card.appendChild(cardBody);

    cardCol.appendChild(card);
    productList.appendChild(cardCol);
  });
}

function fetchProductDetails(productId) {
  return fetch(`https://diwserver.vps.webdock.cloud/products/${productId}`)
    .then(res => res.json())
    .then(data => data)
    .catch(error => {
      console.error('Erro ao buscar os detalhes do produto:', error);
      return null;
    });
}

function renderProductDetails(product) {
  const productDetails = document.getElementById('product-details');
  productDetails.innerHTML = '';

  const productCol = document.createElement('div');
  productCol.className = 'col-md-12 mt-4';

  const card = document.createElement('div');
  card.className = 'card';

  const cardImg = document.createElement('img');
  cardImg.className = 'card-img-top';
  cardImg.src = product.image;
  cardImg.alt = 'Imagem do produto';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const cardTitle = document.createElement('h5');
  cardTitle.className = 'card-title';
  cardTitle.textContent = product.title;

  const cardDescription = document.createElement('div');
  cardDescription.className = 'card-text';
  cardDescription.innerHTML = `Description: ${product.description}`;

  const cardCategory = document.createElement('p');
  cardCategory.className = 'card-text';
  cardCategory.textContent = `Category: ${product.category}`;

  const cardPrice = document.createElement('p');
  cardPrice.className = 'card-text';
  cardPrice.textContent = `Price: $${product.price}`;

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardDescription);
  cardBody.appendChild(cardCategory);
  cardBody.appendChild(cardPrice);

  card.appendChild(cardImg);
  card.appendChild(cardBody);

  productCol.appendChild(card);
  productDetails.appendChild(productCol);
}


function getProductIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

function initializeHomePage() {
  fetchProducts()
    .then(products => {
      renderProducts(products);
    });
}

function initializeProductDetailsPage() {
  const productId = getProductIdFromUrl();
  console.log(productId);

  if (productId) {
    fetchProductDetails(productId)
      .then(product => {
        if (product) {
          renderProductDetails(product);
        } else {
          console.error('Produto não encontrado');
        }
      });
  } else {
    console.error('ID do produto não fornecido');
  }
}

function initializePage() {
  if (window.location.pathname.includes('detalhes.html')) {
    initializeProductDetailsPage();
  } else {
    initializeHomePage();
  }
}

initializePage();
