
const $ = require("jquery");

import { UIManager } from "./UIManager";

export class MealsListManager extends UIManager {
    constructor (elementSelector, mealsService, pubsub) {
        super(elementSelector);
        this.mealsService = mealsService;
        this.pubsub = pubsub;
    }

    init() {
        this.loadMeals();


        let self = this;
        this.element.on("click", ".delete", function() {
            let mealId =  this.parentNode.dataset.id;

            self.deleteMeal(mealId);
        });

        this.element.on("click", ".picture", function() {
            location.href = "detail.html"
        });

        this.element.on("click", ".fav-count", function() {
            let meal = this.parentNode
            self.likeMeal(meal)
        });

        this.pubsub.subscribe("new-meal", (topic, meal) => {
            this.loadMeals();
        });

        this.pubsub.subscribe("update-meal", (topic, meal) => {
            this.loadMeals();
        });
    }

    loadMeals() {
        this.mealsService.list(meals => {
            if (meals.length === 0) {
                this.setEmpty();
            } else {
                this.renderMeals(meals);  
                this.setIdeal(); 
            } 
        }, error => {
            this.setError();
            console.log("Error al cargar la comida", error);
        });
    }

    renderMeals(meals) {
        let html = "";
                for (let meal of meals) {
                    html += this.renderMeal(meal);
                }
        
                this.setIdealHtml(html)
                
                this.setIdeal();
    }

    renderMeal(meal) {

        let likedClass = "";

        let isLiked = localStorage.getItem(meal.id);

        if(isLiked == "true") {
            likedClass = "liked";
        }

        let picture = meal.picture;

        if (picture === "") {
            picture = "img/comida.jpg";
        }

        return `<article class="meal" data-id="${meal.id}">
        <img class="picture" src="${picture}">
        <div class="name">${meal.name}</div>
        <div class="type">${meal.type}</div>
        <span class="delete">DELETE </span>
        <span class="count"> ${meal.likes_qty} </span>
        <span class="fav-count ${likedClass}">LIKE</span>
        </article>`;
    }

    deleteMeal(mealId) {
        this.setLoading();

        localStorage[mealId] = "false";

        this.mealsService.delete(mealId, success => {
            this.loadMeals();
        }, error => {
            this.setError();
        });
    }

    likeMeal(meal) {
        console.log(meal);
        let mealId = meal.dataset.id;

        this.mealsService.getDetail(mealId, (data) => {
            console.log(data);
            this.incrementMealLike(data);
        });
    }

    incrementMealLike(mealData) {
        let newQty;
        let isLiked = false;

        if(localStorage.getItem(mealData.id) === null 
        || localStorage.getItem(mealData.id) === "false") {
            newQty = parseInt(mealData.likes_qty) + 1;
            isLiked = true;
        } else {
            newQty = parseInt(mealData.likes_qty) - 1;
            isLiked = false;
        }

        mealData.likes_qty = newQty;

        let meal = mealData;

        this.mealsService.update(meal, (data) => {

            this.updateWebStorage(data, isLiked);
            this.pubsub.publish("update-meal", data);
        });
    }

    updateWebStorage(meal, isLiked) {

        if(isLiked == true) {
            localStorage[meal.id] = "true";
        } else {
            localStorage[meal.id] = "false";
        }
    }
}