'use strict';
var app = angular.module('showcase', ['datatables']);
app.controller('ServerSideProcessingCtrl', ServerSideProcessingCtrl);

function ServerSideProcessingCtrl(DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
            // Either you specify the AjaxDataProp here
            // dataSrc: 'data',
            //url: 'http://localhost:55419/Handler.ashx',
            url: 'http://localhost/fakedatagrid/Handler.ashx',
            type: 'GET'
        })
     // or here
     .withDataProp('data')
        .withOption('processing', true)
        .withOption('serverSide', true)
        .withPaginationType('full_numbers');
    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('firstName').withTitle('First name'),
        DTColumnBuilder.newColumn('lastName').withTitle('Last name')
    ];
}