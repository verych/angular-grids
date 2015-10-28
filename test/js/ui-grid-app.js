var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.pagination']);

app.controller('MainCtrl', [
'$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {

    var paginationOptions = {
        pageNumber: 1,
        pageSize: 25,
        sort: null,
        sortColumn: null
    };

    var updateInterval = setInterval(function () {
        if (!$scope.autoUpdater) return;

        var url;
        url = 'http://localhost/fakedatagrid/Update.ashx?user=1&page=' + paginationOptions.pageNumber + '&pageSize=' + paginationOptions.pageSize + '&sort=' + paginationOptions.sort + '&sortColumn=' + paginationOptions.sortColumn + '&filter1=' + $scope.filterValue1 + '&filter2=' + $scope.filterValue2;

        $http.get(url)
        .success(function (data) {
            updateElements($scope.gridOptions.data, data);
        });
    }, 1000);

    var updateElements = function (elements, data) {
        //update
        for (var i = 0; i < data.update.length; i++) {
            for (var j = 0; j < elements.length; j++) {
                if (data.update[i].id == elements[j].id) {
                    elements[j] = data.update[i];
                }
            }
        }
        //delete
        for (var i = 0; i < data.delete.length; i++) {
            for (var j = elements.length - 1; j >= 0; j--) {
                if (data.delete[i].id == elements[j].id) {
                    elements.splice(j, 1);
                }
            }
        }
        //add
        for (var i = 0; i < data.add.length; i++) {
            for (var j = elements.length - 1; j >= 0; j--) {
                if (data.add[i].id == elements[j].id) {
                    elements.splice(j, 1);
                }
            }
            elements.push(data.add[i]);
        }
    };

    $scope.filter = function () {
        getPage();
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
  //      url = 'http://localhost:55419/Handler1.ashx?user=1&page=' + paginationOptions.pageNumber + '&pageSize=' + paginationOptions.pageSize + '&sort=' + paginationOptions.sort + '&sortColumn=' + paginationOptions.sortColumn + '&filter1=' + $scope.filterValue1 + '&filter2=' + $scope.filterValue2;
        url = 'http://localhost/fakedatagrid/Handler1.ashx?user=1&page=' + paginationOptions.pageNumber + '&pageSize=' + paginationOptions.pageSize + '&sort=' + paginationOptions.sort + '&sortColumn=' + paginationOptions.sortColumn + '&filter1=' + $scope.filterValue1 + '&filter2=' + $scope.filterValue2;

        $http.get(url)
        .success(function (data) {
            $scope.gridOptions.totalItems = data.recordsFiltered;
            var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
            $scope.gridOptions.data = data.data;
        });
    };

    getPage();
}
]);