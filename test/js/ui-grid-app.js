var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.pagination']);

app.controller('MainCtrl', [
'$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {

    var paginationOptions = {
        pageNumber: 1,
        pageSize: 25,
        sort: null,
        sortColumn: null
    };

    $scope.gridOptions = {
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        useExternalPagination: true,
        useExternalSorting: true,
        columnDefs: [
          { name: 'name' },
          { name: 'gender', enableSorting: true },
          { name: 'company', enableSorting: false }
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                if (sortColumns.length == 0) {
                    paginationOptions.sort = null;
                    paginationOptions.sortColumn = null;
                } else {
                    paginationOptions.sort = sortColumns[0].sort.direction;
                    paginationOptions.sortColumn = sortColumns[0].field;
                }
                getPage();
            });
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                paginationOptions.pageNumber = newPage;
                paginationOptions.pageSize = pageSize;
                getPage();
            });
        }
    };

    var getPage = function () {
        var url;
        url = 'http://localhost/fakedatagrid/Handler1.ashx?user=1&page=' + paginationOptions.pageNumber + '&pageSize=' + paginationOptions.pageSize + '&sort=' + paginationOptions.sort + '&sortColumn=' + paginationOptions.sortColumn;

        $http.get(url)
        .success(function (data) {
            $scope.gridOptions.totalItems = data.recordsTotal;
            var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
            $scope.gridOptions.data = data.data;
        });
    };

    getPage();
}
]);