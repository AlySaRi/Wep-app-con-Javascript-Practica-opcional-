const $ = require("jquery");

import { UIManager } from "./UIManager";

export class MealFormManager extends UIManager {

    constructor(elementSelector, mealsService, pubsub) {
        super(elementSelector);
        this.mealsService = mealsService;

        this.pubsub = pubsub;
    }
    
    init() {
        this.setupSubmitEventHandler();
    }

    setupSubmitEventHandler() {
        this.element.on("submit", () => {
            //Validar los datos y enviarlos
            this.validateAndSendData();
            return false;
        });
    }

    validateAndSendData() {
        if (this.isValid()) {
            //Envia los datos
            this.send();
        }
    }

    send() {

        this.setLoading();

        const meal = {
            name: this.element.find("#name").val(),
            type: this.element.find("#type").val(),
            picture:this.element.find("#picture").val()
        }

        this.mealsService.save(meal, success => {
            //console.log("canción guardada");
            this.resetForm();
            this.setIdeal();
            this.pubsub.publish("new-meal", meal);

        }, error => {
            this.setErrorHtml("Se ha producido un error al guardar la comida en el servidor");
            this.setError();
        });

    }

    resetForm() {
        this.element[0].reset(); //Resetea el formulario
    }

    isValid() {
        const inputs = this.element.find("input");
        for (let input of inputs) {
            if(input.checkValidity() == false) {
                const errorMessage = input.validationMessage;
                input.focus();

                this.setErrorHtml(errorMessage);
                this.setError();
                return false;
            }
        }

        this.setIdeal();

        return true;
    }

    enableFormControls() {
        this.element.find("input, button").attr("disabled", false);
    }

    disableFormControls() {
        this.element.find("input, button").attr("disabled", true);
    }

    setError() {
        super.setError();
        this.enableFormControls();
    }

    setIdeal() {
        super.setIdeal();
        this.enableFormControls();
    }

    setLoading() {
        super.setLoading();
        this.disableFormControls();
    }

}