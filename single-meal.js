
const singleMealName = document.getElementById('single-meal-name');
const singleMeal = document.getElementById('single-meal');
const rowEle = document.getElementById('row-ele');
const imgContainer = document.getElementById('img-container');
const mealDetails = document.getElementById('meal-details');
const mealInstructions = document.getElementById('meal-instructions');

window.addEventListener("load", () => {
  var url = new URL(window.location.href);
  var c = url.searchParams.get("mealName");
  console.log(c);

  singleMealName.textContent = c;

  getSingleMeal(c);
});

async function getSingleMeal(name){
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;

  const res = await fetch(url);
  const result = await res.json();
  const meals = result.meals;
  console.log('result', meals[0]);

  if(meals){
    meals.forEach((meal)=> {
      const mealImg = document.createElement('img');
      const mealCategory = document.createElement('div');
      const mealArea = document.createElement('div');
      const mealInstructionHeader = document.createElement('h2');
      
    if(meal.strTags){
        const tags = meal.strTags.split(',');
        tags.forEach(tag => {
          const mealTags = document.createElement('span');
  
          mealTags.classList.add('badge', 'bg-primary','me-2','mb-2');
          mealTags.textContent = tag;
  
          mealDetails.append(mealTags);
        })
      }

      mealInstructionHeader.classList.add('meal-instruction-header');
      mealInstructionHeader.textContent = 'Instructions';

      mealCategory.classList.add('meal-category','mb-2');
      mealCategory.textContent = `Category: ${meal.strCategory}`;

      mealArea.classList.add('meal-area','mb-2');
      mealArea.textContent = `Area: ${meal.strArea}`;

      

      mealImg.src = meal.strMealThumb;
      mealImg.classList.add('img-fluid', 'rounded');

      mealInstructions.textContent = meal.strInstructions
      mealInstructions.prepend(mealInstructionHeader);

      imgContainer.append(mealImg);
      mealDetails.append(mealCategory, mealArea);

      // console.log(Object.keys(meal).length);
      // for(let i = 1; i <= Object.keys(meal).length; i++){
      //   const ingredients = 
      // }
    })
  }
}
