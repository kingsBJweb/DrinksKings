function renderDrinks(list){
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  list.forEach(d => {
    grid.innerHTML += `
      <div class="card-drink">
        <img src="${d.img}" style="width:100%; border-radius:10px;">
        <h3>${d.name}</h3>
        <p>${d.category}</p>
        <strong>R$ ${d.price}</strong>
      </div>
    `;
  });
}

function filter(type){
  if(type === "all"){
    renderDrinks(drinks);
  } else {
    renderDrinks(drinks.filter(d => d.category === type));
  }
}

window.onload = () => {
  renderDrinks(drinks);
};
