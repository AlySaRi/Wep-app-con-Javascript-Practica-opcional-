window.$ = window.jQuery = require("jquery");

import { MealsService } from "./MealsService";
import { MealsListManager } from "./MealsListManager";
import { MealFormManager } from "./MealFormManager";

import Pubsub from "pubsub-js";

const mealsService = new MealsService("http://localhost:3200/meals/");
const mealsListManager = new MealsListManager(".meals-list", mealsService, Pubsub);

mealsListManager.init();

const mealFormManager = new MealFormManager (".meal-form", mealsService, Pubsub);

mealFormManager.init();

// Plantilla 2 --------------------------------------------

import { CoverManager } from "./CoverManager";
import { FooterManager } from "./FooterManager";

const coverManager = new CoverManager("#title-img-animated");
coverManager.init();

const footerManager = new FooterManager(".web-footer", "#title-img-animated");
footerManager.init();