"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiUrl = "https://receitas-server.vercel.app/api";
let arrayAllRecipes = [];
function getReceitas() {
    return __awaiter(this, void 0, void 0, function* () {
        if (arrayAllRecipes.length === 0) {
            console.log('fez novo fetch');
            const request = yield fetch(apiUrl);
            const response = yield request.json();
            arrayAllRecipes = response;
        }
        const recipesInPage = arrayAllRecipes.splice(0, 20);
        renderMultiple(recipesInPage);
        if (recipesInPage.length < 20)
            window.onscroll = null;
        return arrayAllRecipes;
    });
}
getReceitas();
const containerRecipiesGrid = document.getElementById("container-recipies-grid");
function renderMultiple(receitas = arrayAllRecipes) {
    // console.log(receitas);
    for (let i = 0; i < receitas.length; i++) {
        const difficulty = receitas[i].Method.length;
        let difficultyIcon = '<svg style="color:#2bbf2b" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M30 30h-8V4h8zm-6-2h4V6h-4zm-4 2h-8V12h8zm-6-2h4V14h-4zm-4 2H2V18h8z"/></svg>';
        if (difficulty > 3)
            difficultyIcon = '<svg style="color:#f1f148" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M30 30h-8V4h8zm-6-2h4V6h-4zm-4 2h-8V12h8zm-10 0H2V18h8z"/></svg>';
        if (difficulty > 5)
            difficultyIcon = '<svg style="color:#dd2424fc" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M30 30h-8V4h8zm-10 0h-8V12h8zm-10 0H2V18h8z"/></svg>';
        const card = `<div class="recipe-container hidden" id="${receitas[i].url}">
                      <img class="recipe-image" src="${receitas[i].urlImage}" />
                      <div class="recipe-info-container">
                        <h2 id="${receitas[i].url}"><a class="recipe-title">${receitas[i].Name}</a></h2>  
                        <hr class="recipe-info-line">     
                        <div class="recipe-actions">
                              <div class="difficulty">Difficulty: <span class="difficulty-icon">${difficultyIcon}</span></div>
                              <div class="comments"><a href="${receitas[i].url}#commentsFeed" style="color: #E8772E"><svg xmlns="http://www.w3.org/2000/svg" width="1.17em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1792 1536"><path fill="currentColor" d="M896 128q-204 0-381.5 69.5T232.5 385T128 640q0 112 71.5 213.5T401 1029l87 50l-27 96q-24 91-70 172q152-63 275-171l43-38l57 6q69 8 130 8q204 0 381.5-69.5t282-187.5T1664 640t-104.5-255t-282-187.5T896 128zm896 512q0 174-120 321.5t-326 233t-450 85.5q-70 0-145-8q-198 175-460 242q-49 14-114 22h-5q-15 0-27-10.5t-16-27.5v-1q-3-4-.5-12t2-10t4.5-9.5l6-9l7-8.5l8-9q7-8 31-34.5t34.5-38t31-39.5t32.5-51t27-59t26-76q-157-89-247.5-220T0 640q0-174 120-321.5t326-233T896 0t450 85.5t326 233T1792 640z"/></svg></a></div>
                        </div>
                    </div>`;
        if (containerRecipiesGrid)
            containerRecipiesGrid.innerHTML += card;
    }
    containerRecipiesGrid === null || containerRecipiesGrid === void 0 ? void 0 : containerRecipiesGrid.addEventListener("click", (e) => {
        const teste = e.target.parentElement;
        const url = teste === null || teste === void 0 ? void 0 : teste.id;
        if (url)
            renderSingle(url);
    });
    transitionEffect();
}
function renderSingle(recipeUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const main = document.getElementById("main");
        const request = yield fetch(apiUrl);
        const response = yield request.json();
        arrayAllRecipes = response;
        const selectedRecipe = arrayAllRecipes.find((recipe) => {
            return recipe.url == recipeUrl;
        });
        console.log(selectedRecipe);
        if (selectedRecipe) {
            const difficulty = selectedRecipe.Method.length;
            let difficultyIcon = '<svg style="color:#2bbf2b" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M30 30h-8V4h8zm-6-2h4V6h-4zm-4 2h-8V12h8zm-6-2h4V14h-4zm-4 2H2V18h8z"/></svg>';
            if (difficulty > 3)
                difficultyIcon = '<svg style="color:#f1f148" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M30 30h-8V4h8zm-6-2h4V6h-4zm-4 2h-8V12h8zm-10 0H2V18h8z"/></svg>';
            if (difficulty > 5)
                difficultyIcon = '<svg style="color:#dd2424fc" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M30 30h-8V4h8zm-10 0h-8V12h8zm-10 0H2V18h8z"/></svg>';
            const recipe = ` 
                    <div class="full-recipe-container">
                      <div class="full-recipe"> 
                        <div class="title-difficulty">
                          <h1 class="full-recipe-title">${selectedRecipe.Name}</h1>
                          <div class="full-recipe-difficulty">Difficulty: <span class="full-recipe-difficulty-icon">${difficultyIcon}</span></div>
                        </div>
                        <div class="img-ingredients">
                          <img class="full-recipe-image hiddenLeft" src="${selectedRecipe.urlImage}" />
                          <div class="ingredients-wrapper hiddenRight" id="full-recipe-ingredients">
                            <label style="font-size:30px;color:#E8772E">Ingredients:</label> 
                            <label> </label> 
                          </div>
                        </div>
                        <div class="footer-wrapper hidden">
                          <div id="full-recipe-description"><label style="font-size:30px;color:#E8772E">Description:</label> </div>
                          <div id="full-recipe-method"><label style="font-size:30px;color:#E8772E">Method:</label> </div>
                          <div class="full-recipe-footer">
                            <div class="author-link">
                              <h2><a class="recipe-author">Author: ${selectedRecipe.Author}</a></h2>   
                              <a href="${selectedRecipe.url}" class="recipe-original-link">Original Link</a>  
                            </div>
                            <div id="back-button"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="#e8772e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m2 11l7-9v5c11.953 0 13.332 9.678 13 15c-.502-2.685-.735-7-13-7v5l-7-9Z"/></svg></div>
                          </div>
                      </div>  
                    </div>`;
            if (main)
                main.innerHTML = recipe;
            const containerIngredients = document.getElementById("full-recipe-ingredients");
            for (let i = 0; i < selectedRecipe.Ingredients.length; i++) {
                if (containerIngredients)
                    containerIngredients.innerHTML += `<hr><p><label>${selectedRecipe.Ingredients[i]}</label></p>`;
            }
            const containerDescription = document.getElementById("full-recipe-description");
            if (containerDescription)
                containerDescription.innerHTML += `<p><label>${selectedRecipe.Description}</label></p>`;
            const containerMethod = document.getElementById("full-recipe-method");
            for (let i = 0; i < selectedRecipe.Method.length; i++) {
                if (containerMethod)
                    containerMethod.innerHTML += `<p><label>${selectedRecipe.Method[i]}</label></p>`;
            }
            eventListenerHandleBackButtonClick();
            window.onscroll = null;
            transitionEffectSingleRecipe();
        }
    });
}
function clearRender() {
    if (containerRecipiesGrid)
        containerRecipiesGrid.innerHTML = '';
}
window.onscroll = function () {
    if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
        console.log('CHEGOU NO FIM');
        getReceitas();
    }
};
const difficultyFilterSelect = document.getElementById("select-difficulty-filter");
function filterByDifficulty(arrayRecipes = arrayAllRecipes) {
    const selectedDifficulty = difficultyFilterSelect.value.split('/');
    const minMax = selectedDifficulty.map(e => parseInt(e));
    let newArrayRecipes = arrayRecipes;
    if (minMax[0] > 0) {
        newArrayRecipes = newArrayRecipes.filter((recipe) => {
            if (recipe.Method.length > minMax[0] && recipe.Method.length <= minMax[1])
                return true;
        });
    }
    return newArrayRecipes;
}
function filterByIngredients(arrayRecipes = arrayAllRecipes) {
    const ingredients = document.querySelector(".search-ingredients").innerHTML.toLowerCase();
    const arrayIngredients = ingredients.split("/");
    arrayIngredients.pop();
    // console.log(arrayIngredients)
    let newArrayRecipes = arrayRecipes;
    arrayIngredients.forEach((ingredient) => {
        newArrayRecipes = newArrayRecipes.filter((recipe) => {
            let flag = false;
            recipe.Ingredients.forEach((e) => {
                if (e.toLowerCase().includes(ingredient))
                    flag = true;
            });
            return flag;
        });
    });
    return newArrayRecipes;
}
function filterByName(arrayRecipes = arrayAllRecipes) {
    const inputValue = document.querySelector("#search-name-input").value.toLowerCase();
    let newArrayRecipes = arrayRecipes;
    newArrayRecipes = newArrayRecipes.filter((recipe) => {
        return recipe.Name.toLowerCase().includes(inputValue);
    });
    const searchResult = document.querySelector(".search-result");
    searchResult.innerText = newArrayRecipes.length + " results";
    return newArrayRecipes;
}
function addIngredient() {
    const ingredientsLabel = document.querySelector(".search-ingredients");
    const inputValue = document.querySelector("#search-ingredients-input").value.toLowerCase();
    document.querySelector("#search-ingredients-input").value = '';
    ingredientsLabel.innerText += inputValue + "/";
    document.querySelector(".clear-ingredients-button").classList.remove("hide");
}
function clearIngredients() {
    document.querySelector(".search-ingredients").innerHTML = '';
    document.querySelector(".clear-ingredients-button").classList.add("hide");
}
function applyFilters() {
    return __awaiter(this, void 0, void 0, function* () {
        arrayAllRecipes = [];
        let newArrayRecipes = yield getReceitas();
        newArrayRecipes = filterByDifficulty(newArrayRecipes);
        newArrayRecipes = filterByIngredients(newArrayRecipes);
        newArrayRecipes = filterByName(newArrayRecipes);
        arrayAllRecipes = newArrayRecipes;
        clearRender();
        if (arrayAllRecipes.length > 0)
            getReceitas();
    });
}
function reload() {
    window.location.reload();
}
function renderAbout() {
    const main = document.getElementById("main");
    const about = `<div class="full-recipe-container">
                  <div class="about-wrapper">
                    <h1 class="about-title"> What is Gramma's recipes ? </h1>
                    <h2 class="about-text"> Gramma's recipes is a collection of recipes gathered from all over the internet to make it easy for you to search for recipes.
                    We offer a range of recipes with varying difficulties, whether you are beginner, intermediate or advanced chef we have something to challenge your skills.
                    If you are a beginner chef, dont be scared. We have a huge collection of beginner friendly recipes. And as you raise your cooking skill, you may choose more challenging ones.
                    Join us on our pursuit for the best recipies in the world.<br><br>    
                    <p>And as the saying goes: The old pot makes the best food!</p></h2>
                    <div class="about-back-button-wrapper">
                      <div id="back-button"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="#e8772e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m2 11l7-9v5c11.953 0 13.332 9.678 13 15c-.502-2.685-.735-7-13-7v5l-7-9Z"/></svg></div>
                    </div> 
                </div>
  `;
    if (main)
        main.innerHTML = about;
    eventListenerHandleBackButtonClick();
}
function eventListenerHandleDifficultyChange() {
    const selectedDifficulty = document.querySelector("#select-difficulty-filter");
    selectedDifficulty.addEventListener("change", applyFilters);
}
function eventListenerHandleAddIngredientButtonClick() {
    const searchButton = document.querySelector(".add-ingredient-button");
    searchButton.addEventListener("click", addIngredient);
}
function eventListenerHandleClearIngredientsButtonClick() {
    const searchButton = document.querySelector(".clear-ingredients-button");
    searchButton.addEventListener("click", clearIngredients);
}
function eventListenerHandleSearchButtonClick() {
    const searchButton = document.querySelector(".search-button");
    searchButton.addEventListener("click", applyFilters);
}
function eventListenerHandleHomeClick() {
    const homeButton = document.querySelector("#home-link");
    homeButton.addEventListener("click", reload);
}
function eventListenerHandleRecipesClick() {
    const homeButton = document.querySelector("#recipies-link");
    homeButton.addEventListener("click", reload);
}
function eventListenerHandleAboutClick() {
    const homeButton = document.querySelector("#about-link");
    homeButton.addEventListener("click", renderAbout);
}
function eventListenerHandleBackButtonClick() {
    const backbutton = document.querySelector("#back-button");
    backbutton.addEventListener("click", reload);
}
eventListenerHandleAddIngredientButtonClick();
eventListenerHandleClearIngredientsButtonClick();
eventListenerHandleDifficultyChange();
eventListenerHandleSearchButtonClick();
eventListenerHandleHomeClick();
eventListenerHandleRecipesClick();
eventListenerHandleAboutClick();
function transitionEffect() {
    const cardsNaTela = document.querySelectorAll('.recipe-container');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
            else {
                entry.target.classList.remove('show');
            }
        });
    });
    cardsNaTela.forEach((el) => observer.observe(el));
}
function transitionEffectSingleRecipe() {
    const image = document.querySelectorAll('.full-recipe-image');
    const ingredients = document.querySelectorAll('.ingredients-wrapper');
    const footer = document.querySelectorAll('.footer-wrapper');
    console.log(ingredients);
    const observer2 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('showSingle');
            }
            else {
                entry.target.classList.remove('showSingle');
            }
        });
    });
    image.forEach((el) => observer2.observe(el));
    ingredients.forEach((el) => observer2.observe(el));
    footer.forEach((el) => observer2.observe(el));
}
