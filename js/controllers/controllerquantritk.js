function controllerquantritk($scope, $http) {
    const api='https://621233d201ccdac07434aa06.mockapi.io/api/v1/users';
    $http.get(api) // Gửi 1 request tới API với method: GET
    .then(function(response){
        console.log(response);
        $scope.students=response.data;
    })
        $scope.clear=function(){
            $scope.studentqt={};
            $scope.index=-1;
        }
        $scope.insert=function(){
            $http.post(api,$scope.studentqt)
        .then(function(response){
            console.log(response);
            $scope.students.push(angular.copy($scope.studentqt));
            alert("Thêm thành công");
        });
        }
        $scope.update = function(){
            const editeApi = api + '/' + $scope.id1;
            $http.put(editeApi,$scope.studentqt)
            .then(function (response) {
                console.log(response);
                const sv = $scope.studentqt;
                $scope.students[$scope.index]=angular.copy($scope.studentqt);
                alert("Sửa thành công");
            });
        }

        $scope.onDelete = function (id) {
            const deleteApi = api + '/' + id;
            $http.delete(deleteApi)
                .then(function (response) {
                    console.log(response);
                    const sv = response.data;
                    $scope.students.splice($scope.index,1);
                    $scope.clear();
                    alert("Xóa thành công");
                    
                });
        }
        $scope.cancel=function(){
            if($scope.index==-1){
                $scope.clear();
            }else{
            $scope.edit($scope.index);
            }
        }
        $scope.index=-1;
        $scope.edit=function(index){
            $scope.index=index;
            $scope.studentqt=angular.copy($scope.students[index]);
            $scope.id1=$scope.studentqt.id;
        }
  };
