define([ 'durandal/app', 'durandal/plugins/router'],
    function (app, router) {

        var searchText = ko.observable("");
        var currentQuestion=ko.observable();
        var questionCount=ko.observable(0);
        var trueFalse=ko.observable(0);
        var choice=ko.observable(0);
        var isCorrect=ko.observable(0);
        var answered=0;
        var question = {
            id: ko.observable(),
            content: ko.observable(),
            answer:ko.observable(),
            choice1:ko.observable(),
            choice2:ko.observable(),
            choice3:ko.observable(),
            damage:ko.observable()
        };
        var questionToAsk=ko.observableArray();
        var user={
            id:ko.observable(),
            username:ko.observable(),
            health:ko.observable(100)
        };

        var OriginalQuestions = ko.mapping.fromJS([ 
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
            {id:"013", content:"Where do mosquitos lay their eggs?", answer:"In standing water", choice1:"In rapidly moving water", choice2:"In dry areas", choice3:"On the ground",choice4:"In standing water",damage:"10"},
            {id:"014", content:"Which organism causes malaria?", answer:"Female Anopheles Mosquito", choice1:" Rex Mosquito", choice2:"Aedes Mosquito", choice3:"Female Anopheles Mosquito",choice4:"Culex Mosquito",damage:"10"},

            {id:"015", content:"At what time(s) of the day is this organism active?.", answer:"During the night and at dusk", choice1:"Afternoon", choice2:"During the night and at dusk", choice3:"Morning",choice4:"All of the above",damage:"10"},

            {id:"016", content:" Who is most likely to be affected by malaria?", answer:"Children under 5 years", choice1:"Children under 5 years", choice2:"Women", choice3:"Men",choice4:" All of the above",damage:"10"},

            {id:"017", content:"This is almost always the most common symptom of malaria.", answer:"Fever", choice1:"Fever", choice2:"Jaundice", choice3:"Diarrhoea",choice4:"Chest Pains",damage:"10"},

            {id:"018", content:"How would you know with certainty that a patient has malaria?", answer:"By conducting a blood test", choice1:"When the person has a fever", choice2:"High body temperature", choice3:"Fatigue",choice4:"By conducting a blood test",damage:"10"},
            {id:"019", content:"In case of any malaria symptoms..", answer:"Visit your doctor immediately", choice1:"Wait until you are sure it's malaria", choice2:"Visit your doctor immediately", choice3:"Go get sum drugs at the pharmacy",choice4:"Bath cold water",damage:"10"},
            {id:"020", content:"How many kinds of blood tests are available to detect malaria?", answer:"Two", choice1:"One", choice2:"Two", choice3:"Three",choice4:"Four",damage:"10"},

            {id:"021", content:"What is the best way to prevent malaria?", answer:"Use insecticide treated nets", choice1:"Relocate to less prone malaria areas", choice2:"Use insecticide treated nets", choice3:"Take anti-malarial drugs",choice4:"Visit your doctor regularly",damage:"10"}]);

var isBusy = ko.observable(false);
questionCount=OriginalQuestions().length;

        //Run when viewmodel is called
        var activate = function () {
        answered=0; 
            //loadQuestions();   
            selectQuestion();        
            return true;
        };
        var loadQuestions=function(){
            var i=0;
            while (i < 15) {
                var randomNumber=(getRandomInt(0,questionCount-1)); 
                var chosenQuestion =ko.observable();
                chosenQuestion(OriginalQuestions()[randomNumber]);
                //scrambleChoices(chosenQuestion);       
                questionToAsk.push(chosenQuestion);
                i++;
            }           
        }
        /*
        var scrambleChoices=function(item){
            var choices=ko.observableArray();
            var scrambledChoices=ko.observableArray();
            var count=1;
            //get all choices
            choices.push(item().choice1);
            count++;
            choices.push(item().choice2);
            if(item().choice3){
                count++;
                choices.push(item().choice3);
                count++;
                choices.push(item().choice4);
            }
            
            

            var rand=(getRandomInt(0,3)); 
//scramble the choices
for (var i = 0; i < count; i++) {
    while(scrambledChoices.indexOf(choices()[rand])!=-1){
        rand=(getRandomInt(0,count)); 
    }
    scrambledChoices()[i]=choices()[rand];
};
            //apply the changes
            item().choice1=scrambledChoices()[0];
            item().choice2=scrambledChoices()[1];
            if(item().choice3){
                item().choice3=scrambledChoices()[2];
                item().choice4=scrambledChoices()[3];
            }
        }
*/
        var selectQuestion=function(){
            answered++;
            if(answered>20) {
                gameWon();
                
            }
            choice(getRandomInt(0,14));
            var currentIndex=choice();
            currentQuestion(OriginalQuestions()[currentIndex]);
            if(currentQuestion().isTrueFalse)            
                trueFalse(1);   
            else trueFalse(0);   

        };

        var gameLost=function(){
            $("#lostmodal").modal("show");
            //$("#modal-content,#modal-background").toggleClass("active");
        }

       var gameWon=function(){
            $("#wonmodal").modal("show");
            //$("#modal-content,#modal-background").toggleClass("active");
        }

        /*var nextQuestion=function(){
            choice(getRandomInt(0,12));
            currentIndex=choice();
            currentQuestion(list()[currentIndex]);
            var content=list()[currentIndex].choice2();
            if(content=="")
                trueFalse(1);   
            else trueFalse(0); 
        }*/

        var checkChoice=function(data,id){

            var selectedChoice=data();
            var itemId=ko.observable(id);
            var currentIndex=choice();
            var ans=OriginalQuestions()[currentIndex].answer();
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
            if(answered>=15) {
                gameWon();
                answered=0;
            }

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
            list: questionToAsk,
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
