function controllerdangky($scope, $http) {
    const api='https://621233d201ccdac07434aa06.mockapi.io/api/v1/users';
    $http.get(api) // Gửi 1 request tới API với method: GET
    .then(function(response){
        console.log(response);
        $scope.students=response.data;
    })
    $scope.onSubmitForm=function(event){
        event.preventDefault();
        console.log($scope.student);
        $http.post(api,$scope.student)
        .then(function(response){
            console.log(response);
        });
        alert('Đăng ký thành công');
        window.location.href = "#dangnhap";
    }
    
  };
  app.directive("checkPassword", function(){
    return{
        require:'ngModel',
        link: function(scope, element, attr, controller){
            const validate=function(value){
              var pass = scope.student.password;
                if(value==pass){
                    controller.$setValidity("check_pwd",true);
                }else{
                    controller.$setValidity("check_pwd",false);
                }
                return value;
            }
            controller.$parsers.push(validate);
        }
    };
});