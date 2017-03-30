(function(){
    // A helper function to rotate dom elements to a specified angle.
    var rotate = function(el, deg) {
        // If the `el` paramenter is a string, find the first element matching
        // that selector.
        if (Object.prototype.toString.call(el) === '[object String]') {
            el = document.querySelector(el);
        }

        el.style.cssText = [
            '-webkit-transform: rotate(' + deg + 'deg);',
            '-moz-transform: rotate(' + deg + 'deg);',
            '-ms-transform: rotate(' + deg + 'deg);',
            '-o-transform: rotate(' + deg + 'deg);',
            'transform: rotate(' + deg + 'deg);'
        ].join(' ');
    };

    var edgetime = function() {
        this.init = function() {
            // Fill the list items for dates and rotate them.
            for (var i = 0, lis = document.getElementsByTagName('li'); i < lis.length; i++) {
                // Set the inner HTML of the list items to the numbers from
                // 1-31 plus an extra `1` so you can see the transition from
                // `31` to `1` properly.
                lis[i].innerHTML = i < 31 ? i + 1 : 1;
                // Rotate the dates.
                rotate(lis[i], i * 10);
            }
     
            // Make the clock tick every second.
            this.tick();
        };

        this.init();
    };

    edgetime.prototype.tick = function() {
        // Grab a new date.
        var time = new Date();

        // Save a reference to the hours, both adjusted for 12-hour format and
        // actual hours.
        var hours = time.getHours(),
            realHours = time.getHours();

        // Adjust the hours for 12-hour format.
        if (hours >= 13) {
            hours -= 12;
        } else if (hours === 0) {
            hours = 12;
        }

        // Calculate the angles for clock hands.
        this.secondAngle = time.getSeconds() * 6;
        this.minuteAngle = time.getMinutes() * 6 + (this.secondAngle / 60);
        this.hourAngle = (hours * 30) + (this.minuteAngle / 12);
        this.dateAngle = ((time.getDate() - 1) + (realHours - 12 + 1) / 24) * -10;

        // Draw the clock.
        this.draw();

        // Call itself so that the clock keeps ticking.
        setTimeout((function(_this) {
            return function() {_this.tick.call( _this );};
        })(this), 1000);
    };

    edgetime.prototype.draw = function() {
        rotate('#second', this.secondAngle);
        rotate('#minute', this.minuteAngle);
        rotate('#hour', this.hourAngle);
        rotate('#datewheel', this.dateAngle);
    };

    new edgetime();
})();
