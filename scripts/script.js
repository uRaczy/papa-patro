const makeMenu = async () => {
  const headline = document.querySelector('.pizzas__headline');
  const pizzasList = await fetchPizzas();
  const pizzasListParent = document.querySelector('.pizzas__list');
  
  if (Array.isArray(pizzasList)) {
    pizzasList.forEach((element) => {
      const pizza = makePizza(element);
      pizzasListParent.appendChild(pizza);
    })
  }
  else {
    headline.innerHTML = 'Zadzwoń aby sprawdzić naszą ofertę';
  }
}

const makePizza = ({id, title, price, image, ingredients}) => {
  // setting up elements
  const pizzaLi = document.createElement('li');
  const imageDiv = document.createElement('div');
  const infoDiv = document.createElement('div');
  const titleElement = document.createElement('h3');
  const ingredientsElement = document.createElement('p');
  const summaryDiv = document.createElement('div');
  const priceElement = document.createElement('p');
  const cartButton = document.createElement('button');

  // adding class names to elements
  pizzaLi.classList.add('pizzaList__element');
  imageDiv.classList.add('element__image');
  infoDiv.classList.add('element__info');
  titleElement.classList.add('info__title');
  ingredientsElement.classList.add('info__ingredients');
  summaryDiv.classList.add('element__summary');
  priceElement.classList.add('summary__price');
  cartButton.classList.add('summary__toCart');

  // adding values and nodes to elements
  imageDiv.style.backgroundImage = `url(${image})`;
  titleElement.appendChild(document.createTextNode(title));
  ingredientsElement.appendChild(document.createTextNode(ingredients.toString()));
  priceElement.appendChild(document.createTextNode(`${price}0 zł`));
  cartButton.appendChild(document.createTextNode('Zamów'));
  cartButton.onclick = () => {
    addToCart(id, title, price);
  };

  // Stitching elements together
  infoDiv.appendChild(titleElement);
  infoDiv.appendChild(ingredientsElement);

  summaryDiv.appendChild(priceElement);
  summaryDiv.appendChild(cartButton);

  pizzaLi.appendChild(imageDiv);
  pizzaLi.appendChild(infoDiv);
  pizzaLi.appendChild(summaryDiv);

  return pizzaLi;
}

const fetchPizzas = () => (
  fetch('https://raw.githubusercontent.com/alexsimkovich/patronage/main/api/data.json')
  .then(res => res.json())
  .then(data => data)
  .catch(err => new Error('An error has occured', err))
);

const cart = [];

const addToCart = (id, title, price) => {
  const cartListElement = document.querySelector('.cart__list');

  const product = {
    "id": id,
    "title": title,
    "price": price,
    "quantity": 1
  }

  const found = cart.some(element =>
    element.id === product.id
  )
  
  if (!found) {
    cart.push(product);
  }
  else {
    const index = cart.findIndex(element =>
      element.id === product.id
    )
    cart[index].quantity++;
    cart[index].price = parseFloat((product.price * cart[index].quantity).toFixed(2));
  }
  updateCart();
}

const updateCart = () => {
  const cartUl = document.querySelector('.cart__list');
  
  while(cartUl.firstChild) {
    cartUl.removeChild(cartUl.firstChild);
  }

  if(cart.length >= 0) {
    document.querySelector('.cart__headline').style.visibility = "hidden";
  }
  if(cart.length <= 0) {
    document.querySelector('.cart__headline').style.visibility = "visible";
  }

  cart.forEach(element => {
    const cartLi = document.createElement('li');
    const titleElement = document.createElement('h3');
    const quantityElement = document.createElement('p');
    const priceElement = document.createElement('p');
    const deleteButton = document.createElement('button');
    
    cartLi.classList.add('cartList__element')
  
    titleElement.appendChild(document.createTextNode(element.title));
    quantityElement.appendChild(document.createTextNode(element.quantity));
    priceElement.appendChild(document.createTextNode(`${element.price} zł`));
    deleteButton.appendChild(document.createTextNode('Usuń'));
    deleteButton.onclick = () => {
      deleteElement(element.id);
    }
  
    cartLi.appendChild(titleElement);
    cartLi.appendChild(quantityElement);
    cartLi.appendChild(priceElement);
    cartLi.appendChild(deleteButton);
  
    cartUl.appendChild(cartLi);
  })

  const total = document.createElement('p');

  total.classList.add('cartList__total');

  const totalValue = cart.map(item => item.price).reduce((prevVal, currentVal) => {
    return prevVal + currentVal;
  }, 0);

  total.appendChild(document.createTextNode(`ŁĄCZNIE: ${totalValue.toFixed(2)} zł`));

  cartUl.appendChild(total);

  if (cart.length <= 0) {
    cartUl.removeChild(total);
  }
};

const deleteElement = (id) => {
  const index = cart.findIndex(element =>
    element.id === id
  );
  cart[index].price = parseFloat((cart[index].price - (cart[index].price / cart[index].quantity)).toFixed(2));
  cart[index].quantity--;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCart();
}

makeMenu();