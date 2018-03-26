const $ = require("jquery");

export class FooterManager {
    constructor(footerSelector, topSelector) {
        this.element = $(footerSelector);
        this.topSelector = topSelector;
    }

    init() {

        this.element.on('click', () => {
            $("html, body").animate({
                scrollTop: $(this.topSelector).offset().top
            }, 800, function() {
                // esta función es opcional
            });
        });
    }
}