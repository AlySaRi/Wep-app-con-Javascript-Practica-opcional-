const $ = require("jquery");

export class CoverManager {

    constructor(coverSelector) {
        this.element = $(coverSelector);
    }

    init() {
        // Mover la foto
        this.moveCover();
    }

    moveCover() {
        this.element.on('mousemove', function(event) {
            this.style.backgroundPosition = `${event.pageX * -1/12}px ${event.pageY * -1/12}px`;
        }).on('mouseleave', function() {
            this.style.backgroundPosition = "center center";
        })
    }
}