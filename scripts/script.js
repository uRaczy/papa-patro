const makeMenu = async () => {
  const pizzasList = await fetchPizzas;
  
}

const fetchPizzas = new Promise((resolve, reject) => {
  fetch('https://raw.githubusercontent.com/alexsimkovich/patronage/main/api/data.json')
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(err => console.error(err));
});

getList();