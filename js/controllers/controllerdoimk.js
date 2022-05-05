function controllerdoimk($scope, $http, $rootScope) {
    const api='https://621233d201ccdac07434aa06.mockapi.io/api/v1/users';
    $http.get(api) // Gửi 1 request tới API với method: GET
    .then(function(response){
        console.log(response);
        $rootScope.students=response.data;
    })
    
    $scope.change = function() {
if ($rootScope.student.password == $scope.oldpassword) {
    if ($rootScope.student.password == $scope.studentN.password){
        alert('Mật khẩu mới trùng với mật khẩu cũ')
    } else {
        $rootScope.student.password = $scope.studentN.password;
        $rootScope.students[$rootScope.id-1] = angular.copy($rootScope.student);
        const editeApi = api + '/' + $rootScope.id;
        $http.put(editeApi,$rootScope.students)
        .then(function (response) {
            console.log(response);
            const sv = $rootScope.students;
            alert("Đổi mật khẩu thành công thành công");
        });
        window.location.href = "#index";
    }
} else {
    alert('Mật khẩu cũ không đúng!');
}
$scope.oldpassword ="";
$scope.studentN.password ="";
$scope.xacnhan = "";
}
};
app.directive("checkPassword", function(){
    return{
        require:'ngModel',
        link: function(scope, element, attr, controller){
            const validate=function(value){
              var pass = scope.studentN.password;
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