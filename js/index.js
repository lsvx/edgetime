(function(){
    // A helper function to rotate dom elements to a specified angle.
    var rotate = function( el, deg ) {

        $( el ).css({
                "-webkit-transform": "rotate(" + deg + "deg)",
                "-moz-transform": "rotate(" + deg + "deg)",
                "-ms-transform": "rotate(" + deg + "deg)",
                "-o-transform": "rotate(" + deg + "deg)",
                "transform": "rotate(" + deg + "deg)"
            });

    };

    var edgetime = function() {

        this.init = function() {
            // Fill the list items for dates and rotate them.
            $.each( $( "li" ), function( index ) {
                // Set the inner HTML of the list items to the numbers from 1-31.
                $( this ).html( index < 31 ? index + 1 : 1 );
                // Rotate the dates.
                rotate( this, index * 10 );

            });

            // Grab a new date.
            var time = new Date();

            // Save a reference to the hours, both adjusted for 12-hour format and
            // actual hours.
            var hours = time.getHours(),
                realHours = time.getHours();

            // Adjust the hours for 12-hour format.
            if ( hours >= 13 ) {
                hours -= 12;
            } else if ( hours === 0 ) {
                hours = 12;
            }

            // Calculate the angles for clock hands.
            this.secondAngle = time.getSeconds() * 6;
            this.minuteAngle = time.getMinutes() * 6 + ( this.secondAngle / 60 );
            this.hourAngle = ( hours * 30 ) + ( this.minuteAngle / 12 );
            this.dateAngle = ( ( time.getDate() - 1 ) + ( realHours - 12 + 1 ) / 24 ) * -10;

            // Draw the clock.
            this.draw();

            // Make the clock tick every second.
            setTimeout( (function( _this ) {
                return function() { _this.tick.call( _this ); };
            })( this ), 1000 );
        };

        this.init();

    };

    edgetime.prototype.tick = function() {
        this.secondAngle += 6;
        this.minuteAngle += 1 / 10;
        this.hourAngle += 1 / 600;
        this.dateAngle -= 1 / ( 10 * 24 * 60 * 60 );

        if ( this.dateAngle <= 31 * -10 ) {
            this.dateAngle = 0;
        }

        this.draw();

        // Call itself so that the clock keeps ticking.
        setTimeout( (function( _this ) {
            return function() { _this.tick.call( _this ); };
        })( this ), 1000 );

    };

    edgetime.prototype.draw = function() {
        rotate( "#second", this.secondAngle );
        rotate( "#minute", this.minuteAngle );
        rotate( "#hour", this.hourAngle );
        rotate( "#datewheel", this.dateAngle );
    };

    new edgetime();

})();
