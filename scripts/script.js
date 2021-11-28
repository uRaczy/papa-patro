const makeMenu = async () => {
  const headline = document.querySelector('.pizzas__headline');
  const pizzasList = await fetchPizzas();
  
  if (Array.isArray(pizzasList)) {
    pizzasList.forEach((element) => {
      const pizza = makePizza(element);
      pizzasList.appendChild(pizza);
    })
  }
  else {
    headline.innerHTML = 'Contact us or check our facebook page for more info';
  }
}

const makePizza = ([id, title, price, image, ingridients]) => {
  // setting up elements
  const pizzaLi = document.createElement('li');
  const imageDiv = document.createElement('div');
  const infoDiv = document.createElement('div');
  const titleElement = document.createElement('h3');
  const ingridientsElement = document.createElement('p');
  const button = document.createElement('button');

  // adding class names to elements
  pizzaLi.classList.add('list__element');
  imageDiv.classList.add('element__image');
  infoDiv.classList.add('element__info');
  titleElement.classList.add('info__title');
  ingridientsElement.classList.add('info__ingridients');
  button.classList.add('element__button');

  // adding values to elements
  imageDiv.backgroundImage = "url(image)";
  titleElement.createTextNode(title);
  ingridientsElement.createTextNode(ingridients);
  button.createTextNode(price);

  // Stitching elements together
  infoDiv.appendChild(titleElement);
  infoDiv.appendChild(ingridientsElement);
  
  pizzaLi.appendChild(imageDiv);
  pizzaLi.appendChild(infoDiv);
  pizzaLi.appendChild(button);

  return pizzaLi;
}

const fetchPizzas = () => (
  fetch('https://raw.githubusercontent.com/alexsimkovich/patronage/main/api/data.json')
  .then(res => res.json())
  .then(data => data)
  .catch(err => new Error('An error has occured', err))
);

makeMenu();