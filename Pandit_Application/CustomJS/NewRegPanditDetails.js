﻿$(document).ready(function () {

    DisplayImage();
    DownloadGovId();

});

function DisplayImage() {

    $.ajax({
        url: "/NewRegisteredPanditDetails/DisplayImage/",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            debugger
            var datares = response;

            document.getElementById("ProfileImage").src = datares;
        },
        error: function (err) {

        }

    });
}


function deleteItem() {
    debugger
    var checkstr = confirm('Are you sure you want to validate the specialist ?');
    if (checkstr == true) {
        $.ajax({
            url: "/NewRegisteredPanditDetails/validateregister/",
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                debugger
                if (data != null) {
                    alert("Validation Done Succesfully");
                    window.location.href = "/NewlyRegisteredPandit/AdminNewApplicant"
                }
                else {
                    alert("Validation Not Done");
                    window.location.href = "/NewlyRegisteredPandit/AdminNewApplicant"
                }

            }
        });
    } else {
        return false;
    }
}

function DownloadGovId() {
    $.ajax({
        url: "/NewRegisteredPanditDetails/GovernmentId/",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            debugger
            if (data !== null) {
                //if ($.fn.dataTable.isDataTable('#tblDocument')) { $('#tblDocument').DataTable().clear().destroy(); }
                debugger
                $.each(data, function (i, item) {
                    debugger
                    var rows = "<tr>"
                        + "<td>" + 1 + "</td>"
                        + "<td>" + item.GovernmentIdFileName + "</td>"
                        + "<td><a href='javascript:;' onclick='DownloadFile(" + item.ID + ")'><i class='fa fa-download' aria-hidden='true'></i></a></td></tr>"
                        + "<tr>"
                        + "<td>" + 2 + "</td>"
                        + "<td>" + item.BioDataFileName + "</td>"
                        + "<td><a href='javascript:;' onclick='DownloadFile1(" + item.ID + ")'><i class='fa fa-download' aria-hidden='true'></i></a></td></tr>"


                    $("#tblDocument tbody").append(rows);
                });
                //$('#tblDocument').DataTable({
                //    'paging': true,
                //    'lengthChange': false,
                //    'searching': true,
                //    'ordering': true,
                //    'info': true,
                //    'autoWidth': false
                //})
            }
        }
    });
}
function DownloadFile(fileId) {
    debugger
    $("#hfGovID").val(fileId);
    $("#btnDownloadGovId")[0].click();
};
function DownloadFile1(fileId1) {
    debugger
    $("#hfGovID1").val(fileId1);
    $("#btnDownloadGovId1")[0].click();
};