define(function() {
    var welcome = function () {

    };

    welcome.prototype.viewAttached = function (view) {
     $('.carousel').carousel({
        auto: true,
        height:200,
        effect:'fade',
        markers: {
            show: true,
            type: 'square',
            position: 'bottom-right'
        }
    });
        //you can get the view after it's bound and connected to it's parent dom node if you want
    };

    return welcome;
});