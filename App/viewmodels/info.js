define(function() {
    var welcome = function () {
        this.displayName = 'Welcome to the S.W.A.T Malaria QUIZ!';
        this.description = 'SWAT Malaria (Standing With Africa to Terminate Malaria)';
        this.features = [
            'Feature 1',
            'Feature 2',
            'Feature 3',
            'Feature 4'            
        ];
    };

    welcome.prototype.viewAttached = function (view) {
        //you can get the view after it's bound and connected to it's parent dom node if you want
    };

    return welcome;
});