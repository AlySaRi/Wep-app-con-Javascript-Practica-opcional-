const $ = require("jquery");

export class MealsService {

    constructor(url) { // "/meals/"
        this.url = url;
    }

    list(successCallback , errorCallback ) {
        $.ajax({
            url: this.url,
            /*method: "get", 
            -->(No hace falta ponerlo si es "get", porque lo coje por defecto, pero si hay que ponerlo si es "post")*/
            success: successCallback,
            error: errorCallback
        });
    }

    save(meal, successCallback , errorCallback) {
        if (meal.id) {
            this.update(meal, successCallback , errorCallback );
        } else {
            this.create(meal, successCallback , errorCallback );
        }
    }

    create(meal, successCallback , errorCallback) {
        $.ajax({
            url: this.url,
            method: "post",
            data: meal,
            success: successCallback,
            error: errorCallback
        });
    }

    getDetail(mealId, successCallback , errorCallback) {
        $.ajax({
            url: `${this.url}${mealId}`,
            /*method: "get", 
            -->(No hace falta ponerlo si es "get", porque lo coje por defecto, pero si hay que ponerlo si es "post")*/
            success: successCallback,
            error: errorCallback
        });
    }

    update(meal, successCallback , errorCallback) {
        $.ajax({
            url: `${this.url}${meal.id}`,
            method: "put", //para actualizar
            data: meal,
            success: successCallback,
            error: errorCallback
        });
    }

    delete(mealId, successCallback , errorCallback) {
        $.ajax({
            url: `${this.url}${mealId}`,
            method: "delete", //para borrar
            success: successCallback,
            error: errorCallback
        });
    }
}