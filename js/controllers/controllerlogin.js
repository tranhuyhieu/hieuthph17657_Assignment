function controllerlogin($scope,$http, $rootScope) {
    $scope.login = function() {
      const api='https://621233d201ccdac07434aa06.mockapi.io/api/v1/users';
        $http.get(api) // Gửi 1 request tới API với method: GET
        .then(function(response){
            console.log(response);
            $rootScope.students=response.data;
        })
        var lg = true;
        $rootScope.students.forEach(st => {
            if (st.username == $scope.username) {
                if (st.password == $scope.password) {
                    $rootScope.indexStudent = st.index;
                    $rootScope.id=st.id;
                    $rootScope.student = st;
                    lg = false;
                    return;
                };
            };
        });
        if (lg == true) {
          alert('Đăng nhập thất bại');
        }else{
          alert('Đăng nhập thành công');
          window.location.href = "#index";
        }
    };


}