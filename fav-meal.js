const rowEle = document.getElementById('fav-meal-container');

window.addEventListener("load", () => {
  console.log(JSON.parse(localStorage.getItem('favorites')));

  const favMeals = JSON.parse(localStorage.getItem('favorites')) || [];

  if(favMeals.length){
    updateMeals(favMeals);
  }else{
    const colEle = document.createElement('div');
    colEle.classList.add('col', 'text-center');
    colEle.textContent = 'OOPS!! No Meals Found!';

    rowEle.append(colEle)
  }
});

function removeMeal(meal){
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const index = favorites.findIndex(fav => fav.idMeal === meal.idMeal);
  
  if (index !== -1) {
    favorites.splice(index, 1);
    updateMeals(favorites);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function updateMeals(meals){
  rowEle.textContent = '';
  meals.forEach(meal => {
    const colElement = document.createElement('div');
    const clickCard = document.createElement('div');
    const mealName = document.createElement('div');
    const mealImg = document.createElement('img');
    const favBtn = document.createElement('button');

    clickCard.style.cursor = 'pointer';
    colElement.classList.add('col', 'col-sm-6', 'col-lg-3', 'mb-4');
    mealName.classList.add('meal-name', 'my-2', 'd-flex', 'justify-content-between', 'align-items-center');

    mealName.textContent = meal.strMeal;
    mealImg.src = meal.strMealThumb;
    mealImg.classList.add('img-fluid', 'rounded');
    favBtn.classList.add('btn', 'p-0', 'border-0', 'text-white', 'remove-btn');
    favBtn.innerHTML = `<i class="fa-regular fa-trash-can fav-icon"></i>`;

    clickCard.addEventListener('click', (event) => {
      const clickedContainer = event.currentTarget;
      const removeBtn = event.target.closest('.remove-btn');

      if (removeBtn) {
        event.preventDefault();
        removeMeal(meal);
      } else {
        const clickedMeal = clickedContainer.querySelector('.meal-name')
        location.href = `/single-meal.html?mealName=${clickedMeal.textContent}`;
      }

    })

    mealName.append(favBtn)
    clickCard.append(mealImg, mealName);
    colElement.append(clickCard);
    rowEle.append(colElement);
  });
}
