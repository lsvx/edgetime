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
     
            // Find the initial hand angles.
            var time = new Date(),
                hours = time.getHours(),
                realHours = time.getHours();
            // Adjust the hours for 12-hour format.
            hours = hours % 12;
            if (hours === 0) {
                hours = 12;
            }
            // Set the initial angles for clock hands.
            this.secondAngle = time.getSeconds() * 6;
            this.minuteAngle = time.getMinutes() * 6 + (this.secondAngle / 60);
            this.hourAngle = (hours * 30) + (this.minuteAngle / 12);

            // Make the clock tick every second.
            this.tick(new Date(), time);
        };

        this.init();
    };

    edgetime.prototype.tick = function(time, last) {
        // Calculate the angles for clock hands.
        this.secondAngle += (time - last) / 1000 * 6;
        this.minuteAngle += (time - last) / 1000 / 60 * 6;
        this.hourAngle += (time - last) / 1000 / 60 / 60 * 30;
        this.dateAngle = ((time.getDate() - 1) + (time.getHours() - 12 + 1) / 24) * -10;

        // Draw the clock.
        this.draw();

        // Call itself so that the clock keeps ticking.
        setTimeout((function(_this) {
            return function() {_this.tick(new Date(), time);};
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
