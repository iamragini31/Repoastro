﻿var OAUTHURL = 'https://accounts.google.com/o/oauth2/auth?';
var VALIDURL = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
var SCOPE = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
/* https://www.googleapis.com/auth/userinfo.email */
var CLIENTID = '512080878411-lt3bsh15ond2690n59f19uospuuah9i8.apps.googleusercontent.com';
var REDIRECT = 'https://localhost:44341/DefaultHome/Default';
var LOGOUT = 'https://localhost:44341/DefaultHome/Default';
var TYPE = 'token';
var _url = OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;
var acToken;
var tokenType;
var expiresIn;
var user;
var loggedIn = false;
$(document).ready(function () {
    debugger
    getamt();
    var tabcontent = $("#hdnFullName").val();
    if (tabcontent != null && tabcontent != undefined && tabcontent != "") {
        $("#Modal").hide();
        $("#Userbtn").show();
        $("#balance").show();
        $("#addcash").show();
        $("#mobprofile").show();
        $("#mobOrders").show();
        $("#mobtransaction").show();
        $("#moblogout").show();
        $("#moblogin").hide();

    }
    else {
        $("#Userbtn").hide();
        $("#Modal").show();
        $("#FullName").text(tabcontent);

    }
})
function RegisterCustomer() {
    debugger
    var checkboxReg = document.getElementById("checkboxReg");
    var CustomerFullname = $("#customername").val();
    var Email = $("#email").val();
    var password = $("#password").val();
    var confirmpassword = $("#confirmpassword").val();
    if (CustomerFullname == "" || CustomerFullname == null || CustomerFullname == undefined) {
        alert("Fullname Required");

    }
    else if (Email == "" || Email == null || Email == undefined) {
        alert("Email Required");

    }
    else if (password == "" || password == null || password == undefined) {
        alert("Password Required");

    }
    else if (confirmpassword == "" || confirmpassword == null || confirmpassword == undefined) {
        alert("Confirm Password Required");

    }
    else if (password != confirmpassword)  {
        alert("Password Do not Match");

    }
    else if (checkboxReg.checked == false) {
        alert("Agree to Terms and Condition");
    }
    else {
        var formdata = new FormData();
        formdata.append('CustomerFullname', CustomerFullname); formdata.append('Email', Email); formdata.append('password', password);
       
        $.ajax({
            url: "/DefaultHome/SaveCustomer",
            type: "POST",
            contentType: false,
            processData: false,
            data: formdata,
            success: function (response) {

                if (response !== 0 && response > 0) {
                    //$scope.StudentRegID = response;
                    alert("Registration successful. Login with the id and password created.");
                    //clearform();
                    //window.location.href = "/DefaultHome/Default";
                    window.location.reload();
                    //$scope.goToTab(2);
                }
                else {

                    alert("This email id is already registered, log in");
                    //window.location.href = "/DefaultHome/Default";
                    window.location.reload();
                    //clearform();
                }
            },
            error: function (err) {

            }
        });
    }
}

function CustomerLogin() {
    debugger
    var checkboxlogin = document.getElementById("checkboxlogin");
    var loginid = $("#loginid").val();
    var loginpassword = $("#loginpassword").val();
    if (loginid == "" || loginid == undefined || loginid == null) {
        alert("User ID Required");
    }
    else if (checkboxlogin.checked == false) {
        alert("Agree to Terms & Condition.");
    }
    else if (loginpassword == "" || loginpassword == undefined || loginpassword == null) {
        alert("Password Required");
    }
    else {
        var formdata = new FormData();
        formdata.append('loginid', loginid); formdata.append('loginpassword', loginpassword);
        $.ajax({
            url: "/DefaultHome/validateLogin",
            type: "POST",
            contentType: false,
            processData: false,
            data: formdata,
            success: function (response) {
                debugger
                if (response.CustomerID != 0) {
                    var Fullname = response.FullName;
                    $("#FullName").text(Fullname);
                  
                   
                    //$("#Modal").hide();
                    //$("#Userbtn").show();


                    $("#loginid").val("");
                    $("#loginpassword").val("");
                    //alert("Login Successfull");
                    //window.location.href="/DefaultHome/Default"
                    window.location.reload();
                }
                else {
                    $("#loginid").val("");
                    $("#loginpassword").val("");
                    alert("Username or Password is incorrect");


                }
            },
            error: function (err) {
                $("#loginid").val("");
                $("#loginpassword").val("");
                alert("Error Occured");
            }
        });
    }
}



    function CheckLogin(id, service,CallCharge) {
        debugger
        var fivemincharge = 5 * CallCharge;
        var walletamt = $("#hdnwallet").val();
        var custid = $("#hdnsession").val();
        if (custid == null || custid == "" || custid == undefined) {
            $("#myModal").show();
            $("#myModal").addClass("in");

            //var header = document.getElementsByName("tabcontent") ;
            //var btns = header.getElementsByClassName("tablink");
            //for (var i = 0; i < btns.length; i++) {
            //    btns[i].addEventListener("click", function () {
            //        var current = document.getElementsByClassName("active");
            //        current[0].className = current[0].className.replace(" active", "");
            //        this.className += " active";
            //    });
            //}
            $("#defaultOpen").addClass('active');
            $("#News").addClass('active');
            $("#News").show();
            document.getElementById("defaultOpen").style.backgroundColor = "#37a4dd";
            //window.location.href = "/DefaultHome/Default";
        }
        else if (walletamt < fivemincharge) {
            window.location.href = "/AddWalletMoney/AddWalletMoney?PanditId=" + id + "&Service=" + service + "&fivemincharge=" + fivemincharge + ""
        }
        else if (walletamt >= fivemincharge && walletamt!=0) {
            window.location.href = "/CallIntakeForm/CallIntakeForm?PanditId=" + id + "&Service=" + service+""
        }
   else {
                //if (service == "1" ) {
                //    window.location.href = "/SelectedPuja/SelectedPuja?ID=" + id + "&Servicename=Pooja"

                //}
                //else if (service == "2") {
                //    window.location.href = "/SelectedPuja/SelectedPuja?ID=" + id + "&Servicename=Services"

                //}
                //else
                if (service == "Chat") {
                    window.location.href = "/CallIntakeForm/CallIntakeForm?PanditId=" + id + "&Service=Chat"

                }
                else if (service == "Call") {
                    window.location.href = "/CallIntakeForm/CallIntakeForm?PanditId=" + id + "&Service=Call"

                }
                //else if (service == "3") {
                //    window.location.href = "/DetailedReportForm/DetailedReportForm?PanditId=" + id + "&Service=Report"

                //}
    }


}
function CheckLoginforservice(panditID,id, service) {
    debugger
    var walletamt = $("#hdnwallet").val();
    var custid = $("#hdnsession").val();
    if (custid == null || custid == "" || custid == undefined) {
        $("#myModal").show();
        $("#myModal").addClass("in");

        //var header = document.getElementsByName("tabcontent") ;
        //var btns = header.getElementsByClassName("tablink");
        //for (var i = 0; i < btns.length; i++) {
        //    btns[i].addEventListener("click", function () {
        //        var current = document.getElementsByClassName("active");
        //        current[0].className = current[0].className.replace(" active", "");
        //        this.className += " active";
        //    });
        //}
        $("#defaultOpen").addClass('active');
        $("#News").addClass('active');
        $("#News").show();
        document.getElementById("defaultOpen").style.backgroundColor = "#37a4dd";
        //window.location.href = "/DefaultHome/Default";
    }
  
    else {
        if (service == "1" ) {
            window.location.href = "/SelectedPuja/SelectedPuja?ID=" + id + "&Servicename=Pooja&panditID=" + panditID+""

        }
        else if (service == "2") {
            window.location.href = "/SelectedPuja/SelectedPuja?ID=" + id + "&Servicename=Services&panditID=" + panditID +""

        }
        
        else if (service == "3") {
            window.location.href = "/DetailedReportForm/DetailedReportForm?ID=" + id + "&Servicename=Report&panditID=" + panditID + ""

        }
    }


}
function logout() {
    debugger
    //var custid = $("#hdnsession").val();
    $.ajax({
        url: "/DefaultHome/logout",
        type: "POST",
        contentType: false,
        processData: false,
        //data: custid,
        success: function (response) {
            debugger
            if (response == 1) {
                
                //alert("Logout Successfull");
                window.location.href = "/DefaultHome/Default";
            //    window.location.reload();
            }
          


            }
        }
    );
  
}

function getamt() {
    var hdnwallamt = $("#hdnwallamt").val();
    var hdnsession = $("#hdnsession").val();
    if ((hdnwallamt == "" || hdnwallamt == undefined) && (hdnsession == "" || hdnsession == undefined)) {
        $("#hdnwalletamt").text(0);
    }
    else {
        $.ajax({
            url: "/DefaultHome/getamt",
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
                $("#hdnwalletamt").text(hdnwallamt);
            },
            error: function (err) {


            }
        });

    }
 
}

function validateEmail() {
    debugger
    var email = $("#email").val();
    var regx = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    if (regx.test(email)) {

    }
    else {
        alert("Please enter a valid email");
    }
}
function validateEmaila() {
    debugger
    var email = $("#loginid").val();
    var regx = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    if (regx.test(email)) {

    }
    else {
    //    alert("Please enter a valid email");
    }
}


function Gmaillogin() {
    debugger
    var win = window.open(_url, "windowname1", 'width=800, height=600');
    var pollTimer = window.setInterval(function () {
        try {
            console.log(win.document.URL);
            if (win.document.URL.indexOf(REDIRECT) != -1) {
                window.clearInterval(pollTimer);
                var url = win.document.URL;
                acToken = gup(url, 'access_token');
                tokenType = gup(url, 'token_type');
                expiresIn = gup(url, 'expires_in');

                win.close();
                
                validateTokenlogin(acToken);
            }
        }
        catch (e) {

        }
    }, 500);
}

function GmailRegister() {
    debugger
    var win = window.open(_url, "windowname1", 'width=800, height=600');
    var pollTimer = window.setInterval(function () {
        try {
            console.log(win.document.URL);
            if (win.document.URL.indexOf(REDIRECT) != -1) {
                window.clearInterval(pollTimer);
                var url = win.document.URL;
                acToken = gup(url, 'access_token');
                tokenType = gup(url, 'token_type');
                expiresIn = gup(url, 'expires_in');

                win.close();
                
                validateTokenregister(acToken);
            }
        }
        catch (e) {

        }
    }, 500);
}
function gup(url, name) {
    namename = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\#&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    if (results == null)
        return "";
    else
        return results[1];
}

function validateTokenlogin(token) {
    debugger
    getUserInfologin();
    $.ajax(

        {

            url: VALIDURL + token,
            data: null,
            success: function (responseText) {


            },

        });

}
function validateTokenregister(token) {
    debugger
    getUserInforegister();
    $.ajax(

        {

            url: VALIDURL + token,
            data: null,
            success: function (responseText) {


            },

        });

}
function getUserInfologin() {
    debugger

    $.ajax({

        url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + acToken,
        data: null,
        success: function (resp) {
            debugger
            user = resp;
          
            
            //$('#uname').html('Welcome ' + user.name);
            //$('#uemail').html('Email: ' + user.email)
       

            $.ajax({

                url: '/DefaultHome/GoogleLogin/',

                type: 'POST',
                data: {
                    email: user.email,
                    name: user.name
                },
                success: function (response) {
                    if (response.CustomerID != 0) {
                        var Fullname = response.FullName;
                        $("#FullName").text(Fullname);
                        $('#userimg').attr('src', user.picture);

                        //$("#Modal").hide();
                        //$("#Userbtn").show();


                        $("#loginid").val("");
                        $("#loginpassword").val("");
                        //alert("Login Successfull");
                        //window.location.href="/DefaultHome/Default"
                        window.location.reload();
                    }
                    else {
                        $("#loginid").val("");
                        $("#loginpassword").val("");
                        alert("User not found");


                    }
                    /*window.location.href = "/Home/Index/";*/
                },



            });
        },


    })




}

function getUserInforegister() {
    debugger

    $.ajax({

        url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + acToken,
        data: null,
        success: function (resp) {
            debugger
            user = resp;
           
            
            //$('#uname').html('Welcome ' + user.name);
            //$('#uemail').html('Email: ' + user.email)
            $('#userimg').attr('src', user.picture);

            $.ajax({

                url: '/DefaultHome/SaveCustomerGmail/',

                type: 'POST',
                data: {
                    email: user.email,
                    name: user.name
                },
                success: function (response) {
                    debugger
                    if (response !== 0 && response > 0) {
                        //$scope.StudentRegID = response;
                        alert("Registration successful. Login with  Gmail.");
                        //clearform();
                        //window.location.href = "/DefaultHome/Default";
                        window.location.reload();
                        //$scope.goToTab(2);
                    }
                    else {

                        alert("This email id is already registered, log in");
                        //window.location.href = "/DefaultHome/Default";
                        window.location.reload();
                        //clearform();
                    }
                },



            });
        },


    })




}