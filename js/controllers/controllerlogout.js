function controllerlogout($rootScope, $http) {
$rootScope.dangxuat = function() {
    $rootScope.student = null;
    $rootScope.indexStudent = -1;
    alert('Đăng xuất!');
    window.location.href = "#index";
    }
};