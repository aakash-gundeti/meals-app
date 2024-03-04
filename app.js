//elements
const searchInput = document.getElementById('search');
const mealsContainer = document.getElementById('meal-listing');
const searchResults = document.getElementById('listing-header');
const rowElement = document.createElement('div');

rowElement.classList.add('row');
mealsContainer.append(rowElement);

//get meals function to fetch the data
async function getMeals(mealName){
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName ?? ''}`;

  const res = await fetch(url);
  const result = await res.json();
  const meals = result.meals;
  console.log('meals',meals);

  //empty the existing results to append the new results
  if(meals){
    rowElement.textContent = '';
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    meals.forEach(meal => {

      const colElement = document.createElement('div');
      const clickCard = document.createElement('div');
      const mealName = document.createElement('div');
      const mealImg = document.createElement('img');
      const favBtn = document.createElement('button');
  
      clickCard.style.cursor = 'pointer';
      colElement.classList.add('col', 'col-sm-6', 'col-lg-3','mb-4');
      mealName.classList.add('meal-name','my-2', 'd-flex', 'justify-content-between', 'align-items-center');

      mealName.textContent = meal.strMeal;
      mealImg.src = meal.strMealThumb;
      mealImg.classList.add('img-fluid', 'rounded');
      favBtn.classList.add('btn', 'p-0', 'border-0','text-white', 'favorite-btn');
      const isFavorite = favorites.some(fav => fav.idMeal === meal.idMeal);
      if (isFavorite) {
        favBtn.innerHTML = `<i class="fa-regular fa-heart fav-icon fa-solid"></i>`;
      } else {
        favBtn.innerHTML = `<i class="fa-regular fa-heart fav-icon"></i>`;
      }
      

      clickCard.addEventListener('click', (event) => {
        const clickedContainer = event.currentTarget;
        const favoriteBtn = event.target.closest('.favorite-btn');
        
        if(favoriteBtn){
          event.preventDefault();
          const favIcon = favoriteBtn.querySelector('.fav-icon');
          favIcon.classList.toggle('fa-solid');
          
          favoriteMeal(meal);
        } else {
          const clickedMeal = clickedContainer.querySelector('.meal-name')
          location.href = `/meals-app/single-meal.html?mealName=${clickedMeal.textContent}`;
        }

      })
  
      mealName.append(favBtn)
      clickCard.append(mealImg,mealName);
      colElement.append(clickCard);
      rowElement.append(colElement);
    });
  }else{
    const colEle = document.createElement('div');
    colEle.classList.add('col','text-center');
    colEle.textContent = 'OOPS!! No Meals Found!';

    rowElement.append(colEle)
  }
}

function favoriteMeal(meal){
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const index = favorites.findIndex(fav => fav.idMeal === meal.idMeal);
  if(index !== -1){
    favorites.splice(index, 1);
  }else{
    favorites.push(meal);
  }
  localStorage.setItem('favorites',JSON.stringify(favorites));
}
// search functionality for meals
searchInput.addEventListener('input',() => {
  console.log(searchInput.value);
  if(searchInput.value != ''){
    searchResults.textContent = `Search results for: ${searchInput.value}`
  }else{
    searchResults.textContent = 'Latest Meals';
  }
  getMeals(searchInput.value);
});

getMeals();
