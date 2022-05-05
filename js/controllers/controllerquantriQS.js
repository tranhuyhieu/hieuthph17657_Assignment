function controllerquantriQS($scope, $http) {
    const api='https://621233d201ccdac07434aa06.mockapi.io/api/v1/questions';
    $http.get(api) // Gửi 1 request tới API với method: GET
    .then(function(response){
        console.log(response);
        $scope.questions=response.data;
    })
        $scope.clear=function(){
            $scope.questionqt={};
            $scope.index=-1;
        }
        $scope.insert=function(){
            $http.post(api,$scope.questionqt)
        .then(function(response){
            console.log(response);
            $scope.questions.push(angular.copy($scope.questionqt));
            alert("Thêm thành công");
        });
        }
        $scope.update = function(){
            const editeApi = api + '/' + $scope.id1;
            $http.put(editeApi,$scope.questionqt)
            .then(function (response) {
                console.log(response);
                $scope.questions[$scope.index]=angular.copy($scope.questionqt);
                alert("Sửa thành công");
            });
        }

        $scope.onDelete = function (id) {
            const deleteApi = api + '/' + id;
            $http.delete(deleteApi)
                .then(function (response) {
                    console.log(response);
                    $scope.questions.splice($scope.index,1);
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
            $scope.questionqt=angular.copy($scope.questions[index]);
            $scope.id1=$scope.questionqt.Id;
        }
  };
