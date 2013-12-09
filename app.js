
var page = require('webpage').create(),
	ansi = require('ansi-styles'),
	moment = require('moment'),
	now = moment(),
    server = 'https://onlineapps.lau.edu.lb/pkmslogin.form',
    data = 'username=DonDereck.Haddad&Password=YOURPASSWORDHERE&login-form-type=pwd&logonID=';

var automata = function(){
	console.log(ansi.red.open+"POST: Login you in..."+ansi.red.open)
	page.open(server, 'post', data, function (status) {
	    if (status !== 'success') {
	        console.log('Unable to post!');
	    } else {
	        console.log(ansi.green.open+"Login succesful..."+ansi.green.open);
	        var timesheet = 'https://onlineapps.lau.edu.lb/fa_timesheets/stdtimesheet.aspx';
	        console.log(ansi.red.open+"Requesting Timesheets Page..."+ansi.red.open)
			page.customHeaders = {
			    'Origin': 'https://onlineapps.lau.edu.lb',
			    'Content-Type': 'application/x-www-form-urlencoded',
			    'Referer': 'https://onlineapps.lau.edu.lb/fa_timesheets/stdtimesheet.aspx',
			    'Host':'onlineapps.lau.edu.lb'
			};
			page.onInitialized = function() {
			    page.customHeaders = {};
			};
			
			page.onError = function(msg, trace){
	        		//do nothing.
	        }

	        page.open(timesheet,"post","", function (status){
	        	console.log(ansi.green.open+"Request Page succesful..."+ansi.green.open)
		        var __VIEWSTATE = page.evaluate(function() {
	    			return document.getElementById("__VIEWSTATE").value;
	  				});
		        var __EVENTTARGET = "btnAdd",
		        	__EVENTARGUMENT = "",
		        	__LASTFOCUS = "",
					txtcomments="",
					dayName = now.format('dddd');

				if(dayName === 'Monday' || dayName === 'Wednesday' || dayName === 'Friday'){
					var txtFromHours="17:00",
	        			txtToHours="23:00",
	        			txtHours="6:00";
				}
				else if (dayName === 'Tuesday' || dayName === 'Thursday'){
					var txtFromHours="09:00",
	        			txtToHours="18:00",
	        			txtHours="9:00";	
				}
					
		        var txtSuperName = page.evaluate(function() {
		        	return document.getElementById("txtSuperName").value;
		        })	

		        var txtDept = page.evaluate(function() {
		        	return document.getElementById("txtDept").value;
		        })	


		        var txtOffice = page.evaluate(function() {
		        	return document.getElementById("txtOffice").value;
		        })

		        var txtfromDate = page.evaluate(function() {
		        	return document.getElementById("txtfromDate").value;
		        })

		        var txtToDate = page.evaluate(function() {
		        	return document.getElementById("txtToDate").value;
		        })

		        var txtgrantedHours = page.evaluate(function() {
		        	return document.getElementById("txtgrantedHours").value;
		        })	        

		        var txtTotalHours = page.evaluate(function() {
		        	return document.getElementById("txtTotalHours").value;
		        })	        	        

		        var txtTotHoursToDate = page.evaluate(function() {
		        	return document.getElementById("txtTotHoursToDate").value;
		        })	        	    

		        var timesheetData = '__EVENTTARGET='+ escape(__EVENTTARGET) +
		        					'&__EVENTARGUMENT='+ escape(__EVENTARGUMENT) + 
		        					'&__VIEWSTATE=' + escape(__VIEWSTATE) +
		        					'&__LASTFOCUS=' + escape(__LASTFOCUS) +
		        					'&txtSuperName=' + escape(txtSuperName) +
		        					'&txtDept=' + escape(txtDept) +
		        					'&txtOffice=' + escape(txtOffice) +
		        					'&txtfromDate=' + escape(txtfromDate) +
		        					'&txtToDate=' + escape(txtToDate) +
		        					'&txtgrantedHours=' + escape(txtgrantedHours) +
		        					'&txtTotalHours=' + escape(txtTotalHours) +
		        					'&txtTotHoursToDate=' + escape(txtTotHoursToDate) +
		        					'&txtFromHours=' + escape(txtFromHours) +
		        					'&txtToHours=' + escape(txtToHours) +
		        					'&txtHours=' + escape(txtHours) +
		        					'&txtcomments=' + escape(txtcomments);

		        console.log(ansi.red.open+'POST: Submitting Timesheets...'+ansi.red.open);
		        page.open(timesheet,"post",timesheetData, function (status){
		        	console.log(status);
		        })		

		    });
	    }
	});
}

//Repeat this every 24 hours.
setInterval(automata, 86400000);
