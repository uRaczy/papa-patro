const makeMenu = async () => {
  const headline = document.querySelector('.pizzas__headline');
  const pizzasList = await fetchPizzas();
  
  if (Array.isArray(pizzasList)) {
    
  }
  else {
    headline.innerHTML = 'Contact us or check our facebook page for more info';
  }
}

const fetchPizzas = () => (
  fetch('https://raw.githubusercontent.com/alexsimkovich/patronage/main/api/data.json')
  .then(res => res.json())
  .then(data => data)
  .catch(err => new Error('An error has occured', err))
);

makeMenu();