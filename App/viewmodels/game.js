define([ 'durandal/app', 'durandal/plugins/router'],
    function (app, router) {

        var searchText = ko.observable("");
        var currentQuestion=ko.observable();
        var questionCount=ko.observable(0);
        var trueFalse=ko.observable(0);
        var choice=ko.observable(0);
        var isCorrect=ko.observable(0);
        var question = {
            id: ko.observable(),
            content: ko.observable(),
            answer:ko.observable(),
            choice1:ko.observable(),
            choice2:ko.observable(),
            choice3:ko.observable(),
            damage:ko.observable()
        };

        var question={
            content:ko.observable(),
            choices:ko.observableArray(),
            answer:ko.observable()
        };

        var user={
            id:ko.observable(),
            username:ko.observable(),
            health:ko.observable(100)
        };

        var list = ko.mapping.fromJS([ 
            {id:"001", content:"How is malaria spread?", answer:"By mosquito bites", choice1:"By mosquito bites",choice2:"Eating roadside food", choice3:"Through witchcraft and sorcery", choice4:"By contaminated water", damage:"10"}, 
            {id:"002", content:"Who is at risk for malaria?", answer:"Everyone!", choice1:"People who live in Africa", choice2:"Half of the world's population", choice3:"People who live in Alaska", choice4:"Everyone!", damage:"20"}, 
            {id:"003", content:"Who is at most risk for malaria?", answer:"Pregnant women and children", choice1:"Old men and women", choice2:"Teenagers and adolescents", choice3:"Young adults", choice4:"Pregnant women and children",damage:"10"}, 
            {id:"004", content:"What is the best way to prevent malaria?", answer:"Sleeping under an insecticide-treated bed net", choice1:"Washing and bathing thoroughly", choice2:"Cooking food in clean locations", choice3:"Sleeping outside in the outside air",choice4:"Sleeping under an insecticide-treated bed net",damage:"15"}, 
            {id:"005", content:"When do malaria-carrying mosquitos usually bite?", answer:"At dawn and dusk", choice1:"Noon", choice2:"During cool weather", choice3:"All the time",choice4:"At dawn and dusk",damage:"10"}, 
            
            {id:"006", content:"Adults cannot die from malaria.", answer:"False", choice1:"True", choice2:"False",isTrueFalse:"1"}, 
            
            {id:"007", content:"How often does malaria kill a child?", answer:"Every 45 seconds", choice1:"Every 5 minutes", choice2:"Every 15 minutes", choice3:"Every 30 minutes",choice4:"Every 45 seconds",damage:"10"}, 
            
            {id:"008", content:"Fevers from malaria can cause brain damage in younger children.", answer:"True", choice1:"True", choice2:"False",isTrueFalse:"1"}, 
            {id:"009", content:"Preventing malaria is cheaper and safer than treating malaria.", answer:"True", choice1:"True", choice2:"False",isTrueFalse:"1"}, 
            {id:"010", content:"Fevers from malaria can cause brain damage in younger children.", answer:"True", choice1:"True", choice2:"False",isTrueFalse:"1"}, 
            {id:"011", content:"All sicknesses are called malaria.", answer:"False", choice1:"True", choice2:"False",isTrueFalse:"1"}, 
            
            {id:"012", content:"If you suspect you have malaria...", answer:"You should go to a clinic immediately", choice1:"You should see a traditional healer", choice2:"You should ignore it", choice3:"You should take medicine",choice4:"You should go to a clinic immediately",damage:"10"}, 
            {id:"013", content:"Where do mosquitos lay their eggs?", answer:"In standing water", choice1:"In rapidly moving water", choice2:"In dry areas", choice3:"On the ground",choice4:"In standing water",damage:"10"}]);

        var isBusy = ko.observable(false);
            questionCount=list().length;
        
        //Run when viewmodel is called
        var activate = function () {    
        selectQuestion();        
            return true;
        };
        var selectQuestion=function(){
            choice(getRandomInt(0,12));
            var currentIndex=choice();
            currentQuestion(list()[currentIndex]);
            if(currentQuestion().isTrueFalse)            
            trueFalse(1);   
            else trueFalse(0);   

        };

        var gameLost=function(){
            $("#lostmodal").modal("show");
            //$("#modal-content,#modal-background").toggleClass("active");
        }
        var nextQuestion=function(){
            choice(getRandomInt(0,12));
            currentIndex=choice();
            currentQuestion(list()[currentIndex]);
            var content=list()[currentIndex].choice2();
            if(content=="")
            trueFalse(1);   
            else trueFalse(0); 
        }
        var checkChoice=function(data,id){

            
            var selectedChoice=data();
            var itemId=ko.observable(id);
            var currentIndex=choice();
            var ans=list()[currentIndex].answer();
            if(ans!=selectedChoice)
            {
                var damage=5;
                if(currentQuestion().damage)
                    damage = currentQuestion().damage();
                user.health(user.health()-damage);
                isCorrect(0);
            }
            else isCorrect(1);
            
            health=user.health();
            if(health<=0) gameLost(); 
            else $("#answermodal").modal("show");

        };

        var onCallback = function () {
        };

        //Run when navigating to another view
        var deactivate = function () {
            return list();
        };

        function getRandomArbitary (min, max) {
            return Math.random() * (max - min) + min;
        }
        function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        var goHome=function(){
            router.navigateTo('#/home');
            user.health(100);
        }
        
        var vm = {
            activate: activate,
            deactivate: deactivate,
            list: list,
            currentQuestion:currentQuestion,
            user:user,
            searchText: searchText,
            questionCount:questionCount,
            checkChoice:checkChoice,
            trueFalse:trueFalse,
            goHome:goHome,
            selectQuestion:selectQuestion,
            isCorrect:isCorrect
        };



        return vm;

    });
