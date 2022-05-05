const app = angular.module("myApp",['ngRoute']);


app.directive('quizfpoly',function (quizService) {
    return{
        restrict : 'AE',
        scope:{},
        templateUrl: 'tracnghiem.html',
        link: function (scope ,elem ,attr) {
            scope.start = function(){
                scope.quizOver = false ;//Chưa hoàn thành
                scope.id = 1 ;
                scope.inProgress = true ;
                scope.getQuestion();
                scope.countDown = 70;
                    var timer = setInterval(function(){
                    scope.countDown--; 
                    scope.seconds=scope.countDown %60; 
                    scope.minutes=Math.floor(scope.countDown/60);
                    console.log(scope.countDown);
                    document.getElementById('time').innerHTML=scope.minutes+'m:'+scope.seconds+'s';
                    if(scope.countDown==0){
                        scope.quizOver = true;
                        clearInterval(timer);
                        alert('Điểm của bạn là: '+scope.score);
                    }
                },1000);
                
                };
            scope.reset = function () {
                scope.inProgress = false ;
                scope.score = 0 ;
                clearInterval(timer);
            };
            scope.back = function () {
                window.location.href = "index.html";
            };
            scope.getQuestion = function(){
                var quiz = quizService.getQuestion(scope.id);
                if(quiz){
                    scope.question = quiz.Text ;
                    scope.answers = quiz.Answers;
                    scope.answerId = quiz.AnswerId;
                    scope.answerMode = true;
                }else{
                    scope.quizOver = true ;
                    alert('Điểm của bạn là: '+scope.score);
                }
            }
            scope.checkAnswer = function () {
                if(!$('input[name = answer]:checked').length) return ;
                var ans = $('input[name = answer]:checked').val();
                if(ans == scope.answerId){
                    scope.score++;
                    scope.correctAnswer = true ;
                }else{
                    scope.correctAnswer = false ;
                }
                scope.answerMode = false;
            }
            scope.nextQuestion = function(){
                scope.id++;
                scope.getQuestion();
            }
            scope.reset() ;
        }
    }
});




app.service('quizService',function ($http) {
    const api='https://621233d201ccdac07434aa06.mockapi.io/api/v1/questions';
    $http.get(api) // Gửi 1 request tới API với method: GET
    .then(function(response){
        console.log(response);questions=response.data;
    })
    return {
        getQuestion:function(id) {
            var count = questions.length;
            var randomItem = questions[Math.floor(Math.random() * count)];
            if(count > 10){
                count = 10 ;
            }
            if(id < count){
                return randomItem;
            }else{
                return false ;
            }
        }
    } 
})

// app.config(function($routeProvider,$locationProvider){
//     $locationProvider.hashPrefix('');
//     $routeProvider
//     .when('/index',{//duong dan
//         templateUrl:'html/index.html',
//         controller:"controllerlogout"
//     })
//     .when('/gioithieu',{
//         templateUrl:'html/gioithieu.html'
//     })
//     .when('/lienhe',{
//         templateUrl:'html/lienhe.html'
//     })
//     .when('/gopy',{
//         templateUrl:'html/gopy.html'
//     })
//     .when('/hoidap',{
//         templateUrl:'html/hoidap.html'
//     })
//     .when('/danhmuc',{
//         templateUrl:'html/danhmuc.html',
//         controller:"controllerdanhmuc"
//     })
//     .when('/baithi',{
//         templateUrl:'baithi.html'
//     })
//     .when('/dangnhap',{
//         templateUrl:'html/dangnhap.html',
//         controller:"controllerlogin"
//     })
//     .when('/dangky',{
//         templateUrl:'html/dangky.html',
//         controller:"controllerdangky"
//     })
//     .when('/quenmatkhau',{
//         templateUrl:'html/quenmatkhau.html'
//     })
//     .when('/doimatkhau',{
//         templateUrl:'html/doimatkhau.html'
//     })
//     .when('/capnhattk',{
//         templateUrl:'html/capnhattk.html'
//     })
//     .otherwise({
//       templateUrl:'html/index.html'
//     })
// });
// app.controller('controllerlogin', controllerlogin);
// app.controller('controllerdoimk', controllerdoimk);
// app.controller('controllerdangky', controllerdangky);
// app.controller('controllerlogout', controllerlogout);
// app.controller('controllerdanhmuc', controllerdanhmuc);


