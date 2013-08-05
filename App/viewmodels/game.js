define([ 'durandal/app', 'durandal/plugins/router'],
    function (app, router) {

        var searchText = ko.observable("");
        var currentQuestion=ko.observable();
        var questionCount=ko.observable(0);
        var trueFalse=ko.observable(0);
        var choice=ko.observable(0);
        var question = {
            id: ko.observable(),
            content: ko.observable(),
            answer:ko.observable(),
            false1:ko.observable(),
            false2:ko.observable(),
            false3:ko.observable(),
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
            {id:"001", content:"How is malaria spread?", answer:"By mosquito bites", false1:"Eating roadside food", false2:"Through witchcraft and sorcery", false3:"By contaminated water", damage:"10"}, 
            {id:"002", content:"Who is at risk for malaria?", answer:"Everyone!", false1:"People who live in Africa", false2:"Half of the world's population", false3:"People who live in Alaska", damage:"20"}, 
            {id:"003", content:"Who is at most risk for malaria?", answer:"Pregnant women and children", false1:"Old men and women", false2:"Teenagers and adolescents", false3:"Young adults"}, 
            {id:"004", content:"What is the best way to prevent malaria?", answer:"Sleeping under an insecticide-treated bed net", false1:"Washing and bathing thoroughly", false2:"Cooking food in clean locations", false3:"Sleeping outside in the outside air"}, 
            {id:"005", content:"When do malaria-carrying mosquitos usually bite?", answer:"At dawn and dusk", false1:"Noon", false2:"During cool weather", false3:"All the time"}, 
            {id:"006", content:"Adults cannot die from malaria.", answer:"False", false1:"True", false2:"", false3:""}, 
            {id:"007", content:"How often does malaria kill a child?", answer:"Every 45 seconds", false1:"Every 5 minutes", false2:"Every 15 minutes", false3:"Every 30 minutes"}, 
            {id:"008", content:"Fevers from malaria can cause brain damage in younger children.", answer:"True", false1:"False", false2:"", false3:""}, 
            {id:"009", content:"Preventing malaria is cheaper and safer than treating malaria.", answer:"True", false1:"False", false2:"", false3:""}, 
            {id:"010", content:"Fevers from malaria can cause brain damage in younger children.", answer:"True", false1:"False", false2:"", false3:""}, 
            {id:"011", content:"All sicknesses are called malaria.", answer:"False", false1:"True", false2:"", false3:""}, 
            {id:"012", content:"If you suspect you have malaria...", answer:"You should go to a clinic immediately", false1:"You should see a traditional healer", false2:"You should ignore it", false3:"You should take medicine"}, 
            {id:"013", content:"Where do mosquitos lay their eggs?", answer:"In standing water", false1:"In rapidly moving water", false2:"In dry areas", false3:"On the ground"}]);

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
            var content=list()[currentIndex].false2();
            if(content=="")
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
            var content=list()[currentIndex].false2();
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
            user.health(user.health()-20);
            
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
            nextQuestion:nextQuestion
        };



        return vm;

    });