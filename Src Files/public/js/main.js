function doSomething2()
{
    //demmy function 
    
    $('#answarSecurityQuestionModal').modal('hide');
    
    $('#RecoverPwdModal').modal('show');
}

function doSomething3()
{
    //demmy function , in reality - should check if the email provided is legit:
    //if so - then those step (hide and show) are good, otherwise, shell stay in 
    //the getQuestionAccordingEmailModal with error indicator
    
    $('#getQuestionAccordingEmailModal').modal('hide');
    
    $('#answarSecurityQuestionModal').modal('show');
	
}

//-------------------When submitiing registration form ----------------------------



$(document).ready(function() {
    // Generate a simple captcha
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    $('#captchaOperation').html([randomNumber(1, 100), '+', randomNumber(1, 200), '='].join(' '));

    $('#registerFormRegisterPage').bootstrapValidator({
        message: 'This value is not valid',
        fields: {
            firstname: {
                message: 'Your first name is not valid',
                validators: {
                    notEmpty: {
                        message: 'Your first name is required and can\'t be empty'
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: 'Your first name must be more than 3 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.*\s]+$/,
                        message: 'Your first name can only consist of alphabetical, number, dot and underscore'
                    }
                }
            },
			lastname: {
                message: 'Your last name is not valid',
                validators: {
                    notEmpty: {
                        message: 'Your last name is required and can\'t be empty'
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: 'Your last name must be more than 3 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.*\s]+$/,
                        message: 'Your last name can only consist of alphabetical, number, dot and underscore'
                    }
                }
            },
			
            email: {
                validators: {
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    }
                }
            },
             question: {
                validators: {
                    notEmpty: {
                        message: 'This is required and can\'t be empty'
                    }
                }
            },
            gender: {
                validators: {
                    notEmpty: {
                        message: 'This is required and can\'t be empty'
                    }
                }
            },
            answar: {
                validators: {
                   notEmpty: {
                        message: 'The answar is required and can\'t be empty'
                    },
                    stringLength: {
                        min: 4,
                        max: 15,
                        message: 'The answar must be more than 4 and less than 15 characters long'
                    }
                }
            },
            birthday: {
                validators: {
                   notEmpty: {
                        message: 'The birthday is required and can\'t be empty'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: 'The password is required and can\'t be empty'
                    }
                }
            },
            confirmPassword: {
                validators: {
                    notEmpty: {
                        message: 'The confirm password is required and can\'t be empty'
                    },
                    identical: {
                        field: 'password',
                        message: 'The password and its confirm are not the same'
								}
                }
            },
            captcha: {
                validators: {
                    callback: {
                        message: 'Wrong answer',
                        callback: function(value, validator) {
                            var items = $('#captchaOperation').html().split(' '), sum = parseInt(items[0]) + parseInt(items[2]);
                            return value == sum;
                        }
                    }
                }
            }
        }
    });
});

//======================end of submitting form function==========================


//======================When submitting login form ==========================
//
$(document).ready(function() {
    // Generate a simple captcha
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    $('#captchaOperation').html([randomNumber(1, 100), '+', randomNumber(1, 200), '='].join(' '));

    $('#loginFormLoginPage').bootstrapValidator({
        message: 'This value is not valid',
        fields: {
            email: {
                validators: {
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: 'The password is required and can\'t be empty'
                    }
                }
            }
        }
    });
});



//-------------------When Email for Security Question ----------------------------@danielc

$(document).ready(function() {
    // Generate a simple captcha
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    $('#captchaOperation').html([randomNumber(1, 100), '+', randomNumber(1, 200), '='].join(' '));

    $('#getQuestionAccordingEmailForm').bootstrapValidator({
        message: 'This value is not valid',
        fields: {
            email: {
                validators: {
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    }
                }
            }
        }
    });
});
    
    

//-------------------When Getting Answer for Security Question ----------------------------@danielc

$(document).ready(function() {
    // Generate a simple captcha
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    $('#captchaOperation').html([randomNumber(1, 100), '+', randomNumber(1, 200), '='].join(' '));

    $('#answarSecurityQuestionForm').bootstrapValidator({
        message: 'This value is not valid',
        fields: {
          answer: {
                validators: {
                    notEmpty: {
                        message: 'This is required and can\'t be empty'
                    }
                }
            }
        }
    });
});

//-------------------When entering new password ---------------------------------
$(document).ready(function() {
    // Generate a simple captcha
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    $('#captchaOperation').html([randomNumber(1, 100), '+', randomNumber(1, 200), '='].join(' '));

    $('#RecoverPwdFormRecoverPwdPage').bootstrapValidator({
        message: 'This value is not valid',
        fields: {
            password: {
                validators: {
                    notEmpty: {
                        message: 'The password is required and can\'t be empty'
                    }
                }
            },
            confirmPassword: {
                validators: {
                    notEmpty: {
                        message: 'The confirm password is required and can\'t be empty'
                    },
                    identical: {
                        field: 'password',
                        message: 'The password and its confirm are not the same'
                    }
                }
            },
            captcha: {
                validators: {
                    callback: {
                        message: 'Wrong answer',
                        callback: function(value, validator) {
                            var items = $('#captchaOperation').html().split(' '), sum = parseInt(items[0]) + parseInt(items[2]);
                            return value == sum;
                        }
                    }
                }
            }
        }
    });
});

//-------------------Cleaning Modal on Re-entry----------------------------@danielc
function cleanFormSignIn()
{
    document.getElementById("loginFormLoginPage").reset();
	document.getElementById("failLogin").style.visibility='hidden';
	

}

function cleanRegistration()
{
    document.getElementById("registerFormRegisterPage").reset();
	document.getElementById("userEmailRegisterPage").value ="";
	document.getElementById("userPasswordRegisterPage").value ="";
	document.getElementById("failRegister").style.visibility='hidden';
}

function cleanNewPasswordForm()
{
    document.getElementById("RecoverPwdFormRecoverPwdPage").reset();
}

function cleanSecurityQuestion()
{
    document.getElementById("answarSecurityQuestionForm").reset();
}

function cleanEnterEmailForSecurityForm()
{
    document.getElementById("getQuestionAccordingEmailForm").reset();
}

function cleanControlPanelForm()
{
    document.getElementById("controlPanelForm").reset();
}


function validatePass()
{
     var newPass= $("#changeNewPassword").val();
     var confirmNewPass = $("#changeNewPasswordConfirm").val();

     if(newPass != confirmNewPass)
     {
         console.log("shit heppens");
     }
     
}


    //---------------------- get review delete button hide -------------------
    var overallStars;
    
	$(document).on('click','#getReviewButton',function()
	{
		if(globalReviews.length == 0)
		{
			alert("No one has reviewed this business, you should be the first :)");
		}
		else
		{
			var loc = location.href;
			var splitter = loc.split('#');
			var first = splitter[0];
			var loca = first.concat("#getReview")
			window.location = loca; 
		
		}
		
		
	});
	
	$(document).on('pagebeforeshow','#addReview',function()
	{
		cleanAddReview();
	});
	
	$(document).on('pagebeforeshow','#getReview',function()

	{
		//document.getElementById("reviewerCity").innerHTML = globalReviews[globalReviewsIndex].ReviewDetails.ReviewerFirstName;
		var userId = globalReviews[globalReviewsIndex].ReviewDetails.ReviewerId;
		console.log(userId);
		var userReviewer;
		
		$.ajax({
            type: "GET",
            url: '/user/getUser/'+userId, 
			contentType: "application/json",
            dataType: "json",
              
           success:function(result)
            {
			
				if(result.Status=='Failure')
				{
					alert("bad request, try later");
				}
				
				else
				{
					userReviewer = result;
					document.getElementById("reviewerCity").innerHTML = userReviewer.Address;
					document.getElementById("reviewrEmailGetReviewPage").innerHTML = userReviewer.Email;
					document.getElementById("reviewrBirthdayGetReviewPage").innerHTML = userReviewer.Birthday;
					console.log(JSON.stringify(result));
				}
            }
            ,
            failure:function(err)
            {
				alert(':(');
			}
            
        });
		
		
		if(globalUser._id == globalReviews[globalReviewsIndex].ReviewDetails.ReviewerId)
		{
			$("#myReviewAllowDeleteBuuton").removeClass("disabled");
			$("#myReviewAllowDeleteBuuton").removeClass("hidden");
			
		}
		else
		{
			$("myReviewAllowDeleteBuuton").addClass("disabled");
			$("myReviewAllowDeleteBuuton").addClass("hidden");
			
		}
	
	$(function() {
      
		$('#score-overall').raty({  width:true, hints: ['', '','', '',''], score: globalOverallReviewerRating, readOnly:true});
		$('#score-price').raty({  width:true, hints: ['', '','', '',''], score: globalPriceReviewerRating, readOnly:true});
		$('#score-parking').raty({  width:true, hints: ['', '','', '',''], score: globalParkingReviewerRating, readOnly:true});
		$('#score-quality').raty({  width:true, hints: ['', '','', '',''], score: globalQualityReviewerRating, readOnly:true});

				});
	
	});
 
	$(document).on('click', '#nextReview', function()
	{
	
		if( globalReviewsIndex == globalReviews.length - 1)
		{
			globalReviewsIndex = 0;
		}
		else
		{
			globalReviewsIndex++;
		}
		
		var userId = globalReviews[globalReviewsIndex].ReviewDetails.ReviewerId;
		console.log(userId);
		var userReviewer;
	
		
		$.ajax({
            type: "GET",
            url: '/user/getUser/'+userId, 
			contentType: "application/json",
            dataType: "json",
              
           success:function(result)
            {
			
				if(result.Status=='Failure')
				{
					alert("bad request, try later");
				}
				
				else
				{
					userReviewer = result;
					document.getElementById("reviewerCity").innerHTML = userReviewer.Address;
					document.getElementById("reviewrEmailGetReviewPage").innerHTML = userReviewer.Email;
					document.getElementById("reviewrBirthdayGetReviewPage").innerHTML = userReviewer.Birthday;
					console.log(JSON.stringify(result));
				}
            }
            ,
            failure:function(err)
            {
				alert(':(');
			}
            
        });
		
		
		if(globalUser._id == globalReviews[globalReviewsIndex].ReviewDetails.ReviewerId)
		{
			$("#myReviewAllowDeleteBuuton").removeClass("disabled");
			$("#myReviewAllowDeleteBuuton").removeClass("hidden");
			
		}
		else
		{
			$("#myReviewAllowDeleteBuuton").addClass("disabled");
			$("#myReviewAllowDeleteBuuton").addClass("hidden");
		}
		
		
		populateReviews();
		$(function() {
      
		$('#score-overall').raty({  width:true, hints: ['', '','', '',''], score: globalOverallReviewerRating, readOnly:true});
		$('#score-price').raty({  width:true, hints: ['', '','', '',''], score: globalPriceReviewerRating, readOnly:true});
		$('#score-parking').raty({  width:true, hints: ['', '','', '',''], score: globalParkingReviewerRating, readOnly:true});
		$('#score-quality').raty({  width:true, hints: ['', '','', '',''], score: globalQualityReviewerRating, readOnly:true});

				});
		
	});

	
	
	
	$(document).on('click', '#prevReview', function()
	{
		
		
	
		if( globalReviewsIndex == 0)
		{
			globalReviewsIndex = globalReviews.length - 1;

		}
		else
		{
			globalReviewsIndex--;
		}
		
		var userId = globalReviews[globalReviewsIndex].ReviewDetails.ReviewerId;
		console.log(userId);
		var userReviewer;
		
		$.ajax({
            type: "GET",
            url: '/user/getUser/'+userId, 
			contentType: "application/json",
            dataType: "json",
              
           success:function(result)
            {
			
				if(result.Status=='Failure')
				{
					alert("bad request, try later");
				}
				
				else
				{
					userReviewer = result;
					document.getElementById("reviewerCity").innerHTML = userReviewer.Address;
					document.getElementById("reviewrEmailGetReviewPage").innerHTML = userReviewer.Email;
					document.getElementById("reviewrBirthdayGetReviewPage").innerHTML = userReviewer.Birthday;
					console.log(JSON.stringify(result));
				}
            }
            ,
            failure:function(err)
            {
				alert(':(');
			}
            
        });
	
		
		if(globalUser._id == globalReviews[globalReviewsIndex].ReviewDetails.ReviewerId)
		{
			$("#myReviewAllowDeleteBuuton").removeClass("disabled");
			$("#myReviewAllowDeleteBuuton").removeClass("hidden");
			
		}
		else
		{
			$("#myReviewAllowDeleteBuuton").addClass("disabled");
			$("#myReviewAllowDeleteBuuton").addClass("hidden");
		}
		
		
		populateReviews();
		$(function() {
      
		$('#score-overall').raty({  width:true, hints: ['', '','', '',''], score: globalOverallReviewerRating, readOnly:true});
		$('#score-price').raty({  width:true, hints: ['', '','', '',''], score: globalPriceReviewerRating, readOnly:true});
		$('#score-parking').raty({  width:true, hints: ['', '','', '',''], score: globalParkingReviewerRating, readOnly:true});
		$('#score-quality').raty({  width:true, hints: ['', '','', '',''], score: globalQualityReviewerRating, readOnly:true});

				});
		
	});

	
    
    $(document).ready(function(){
        //$('#myReviewAllowDeleteBuuton').addClass("hidden");

        $('#myReviewAllowDeleteBuuton').click(function() {
            var $this = $(this);

            if ($this.hasClass("hidden")) {
                $(this).removeClass("hidden").addClass("visible");

            } else {
                $(this).removeClass("visible").addClass("hidden");
            }
        });
    });


  $(document).on('click', '#fbTgl', function(){
  		
		toggleFacebook();

    $(this).find('.btn').toggleClass('active');  
    
    if ($(this).find('.btn-primary').size()>0) {
    	$(this).find('.btn').toggleClass('btn-primary');
    }
    
    
    $(this).find('.btn').toggleClass('btn-default');
       
});

	
	
//--------------------------control panel--------------------
$(document).on('pageinit','#controlPanel', function()
{
      $('#changePasswordCPPanelBody').css('height',"200px");
      $('#changeFBStatusCPPanelBody').css('height',"200px");
      $('#changeAddressCPPanelBody').css('height',"200x");
	  
	  var FaceStat = globalUser.EnableFacebookAccess;
	
	if(FaceStat == "Yes")
	{
		if ($('#fbOff').hasClass('btn-primary')) 
		{
				$('#fbTgl').find('.btn').toggleClass('active btn-primary');  
           
		      // $('#fbTgl').find('.btn').toggleClass('btn-default');

		}
	

	}
	else
	{
		
		if ($("#fbOn").hasClass('btn-primary')) 
		{
							$('#fbTgl').find('.btn').toggleClass('active btn-primary');  

		}
	}
	  
});

$(document).on('pagebeforeshow', '#controlPanel', function(){       

    $('#changeFBStatusCPPanelBody').css('height', $('#changePasswordCPPanelBody').css('height'));
    $('#changeAddressCPPanelBody').css('height', $('#changePasswordCPPanelBody').css('height'));
	
	
	
});

//-------------------------add review---------------------------------------


$(function() {
      $.fn.raty.defaults.path = 'lib/img';
   //   $('#addScore-overall').raty({ width:false, hints: ['Poor', 'Bad', 'Ok', 'Good', 'Great'], cancel:true});
	  
	  
	  $('#addScore-overall').raty({
		cancel      : true,
		cancelHint  : 'remove my rating!',
		cancelPlace : 'left',
		click       : function(score, evt) {
		overall = score;
						}
			});
	  
	   $('#addScore-parking').raty({
		cancel      : true,
		cancelHint  : 'remove my rating!',
		cancelPlace : 'left',
		click       : function(score, evt) {
		parking = score;
						}
			});
			 $('#addScore-price').raty({
		cancel      : true,
		cancelHint  : 'remove my rating!',
		cancelPlace : 'left',
		click       : function(score, evt) {
		price = score;
						}
			});
			 $('#addScore-quality').raty({
		cancel      : true,
		cancelHint  : 'remove my rating!',
		cancelPlace : 'left',
		click       : function(score, evt) {
		quality = score;
						}
			});
			
			
			
			$(document).on('click','#addReviewButton',function()
	{
		
		
			var loc = location.href;
			var splitter = loc.split('#');
			var first = splitter[0];
			var loca = first.concat("#addReview")
			window.location = loca; 
		
		
	});
			
	  
	  
	  
     // $('#addScore-parking').raty({width:false, hints: ['Poor', 'Bad', 'Ok', 'Good', 'Great'], cancel:true});
   //  $('#addScore-price').raty({width:false, hints: ['Poor', 'Bad', 'Ok', 'Good', 'Great'], cancel:true });
   //   $('#addScore-quality').raty({width:false, hints: ['Poor', 'Bad', 'Ok', 'Good', 'Great'], cancel:true});
    });
    
    //=======================register function =============================

function validateRegistrationDate()
{
    var dateFrom = "02/05/2013";

    var from = Date.parse(dateFrom);
    var to   = Date.parse(new Date());
     var selectedDate = Date.parse($('#userBirthdayRegisterPage').datepicker('getDate'));
        if((selectedDate <= to && selectedDate >= from))
            alert("date contained");
         else 
        alert ("shit");
}

function submitRegistration()
{
    //sainty check - date is legit?
    validateRegistrationDate();
}


//==================================Find Business layout ====================== 

$(document).on('pagebeforeshow', '#findBusiness', function(){       

   $("#secondResult").removeClass("hidden").addClass("visible");
	 $("#thirdResult").removeClass("hidden").addClass("visible");
	 $("#fourthResult").removeClass("hidden").addClass("visible");
	 $("#secondResultbadge").removeClass("hidden").addClass("visible");
	$("#thirdResultbadge").removeClass("hidden").addClass("visible");
	$("#fourthResultbadge").removeClass("hidden").addClass("visible");
	
	
});


//==================================Business page layout ==================================
    
function InsertInfoToBusinessPage()
{
    //first we should put the image of page at desired place in layout
    var img = document.createElement("img");
    img.src = "http://www.google.com/intl/en_com/images/logo_plain.png";

    var src = document.getElementById("BusinessPageImageOfBusiness");
    src.appendChild(img);
    
}
     
    
    $(function() {
      $.fn.raty.defaults.path = 'lib/img';
      
      /*$('#totalScoreStarBusiness').raty({
        half     : true,
        size     : 24,
        starHalf : 'star-half-big.png',
        starOff  : 'star-off-big.png',
         score: 3,
        readOnly: true,
         hints: ['', '','', '',''],
        starOn   : 'star-on-big.png'
      });*/
      
      $('#overallFromFriendsBusinessPage').raty({  width:true, hints: ['', '','', '',''], score: 3, readOnly:true});
      
      $('#PriceFromFriendsBusinessPage').raty({ width:true, hints: ['', '','', '',''], score: 3, readOnly:true});
      
      $('#ParkingFromFriendsBusinessPage').raty({ width:true, hints: ['', '','', '',''], score: 3, readOnly:true});
      
      $('#QualityFromFriendsBusinessPage').raty({ width:true, hints: ['', '','', '',''], score: 3, readOnly:true});
     });
     
      
    
    
$(document).on('pageinit','#busienssPage', function()
{
    $('#mapHeight').css('height',"300px");
    $('#panelBodyMeetMeUpBusinessPage').css('height',"300px");
    
});
       

	   //LA start
var friendsParkingRate = 0;
var friendsOverallRate = 0;
var friendsPriceRate = 0;
var friendsQualityRate = 0; 
	
function calculateFriendsScoreOfBusiness()
{

		 //first get most updated hase, we should re update hash friend table:
									
																//LA start
												var ind = 0;
												
																	$.ajax({
																			type: "GET",
																			url: '/friends/getHashFriends/'+userId, 
																			contentType: "application/json",
																			dataType: "json",
																			  
																			success:function(result)
																			{
																				//save hash friendsTable();
																				if(result.Status =="Failure")
																				{
																					alert('Error occured when login in, try later');
																					logout();
																				}
																				else
																				{
																					console.log('in hash get');
																					globalFriendHash=result;
																					updateAndCalcFriendsScore();
																				}
																			}
																			,
																			failure:function(err)
																			{
																				alert('Error occured when login in, try later');
																				logout();
																			}
																			
																		});

																		console.log('calculateFriendsScoreOfBusiness');
																		console.log(globalFriendHash);
																//LA END


	
	
}

function updateAndCalcFriendsScore()
{
	//first create the array:
	var businessRateByFriend = [];
	var i;
	var countReg=0;
	var countFav = 0;
	var totalDiv = 0;
	
	var currElementInArr;
	var currReviewDetails;
	var rId;
	var rateValueReg = globalFriendHash['valueOfRegularFriend'] /100;
	var rateValueFav = 2*rateValueReg;
	
	console.log(globalFriendHash);
	 friendsParkingRate = 0;
	 friendsOverallRate = 0;
	 friendsPriceRate = 0;
	 friendsQualityRate = 0; 
	
	console.log('Hash friend is: '+ JSON.stringify(globalFriendHash));
			console.log(globalUser._id);

	for(i=0; i< globalReviews.length; i++)
	{
		currElementInArr = globalReviews[i];
		currReviewDetails = currElementInArr['ReviewDetails'];
		
		rId = currReviewDetails.ReviewerId;
		
		if(rId == globalUser._id)
		{
			console.log('inside');
			continue;
		}
		
		if(globalFriendHash.hasOwnProperty(rId))
		{
			console.log(rId);
			if(globalFriendHash[rId] == 0) 
			{
				countReg+=rateValueReg;
				friendsOverallRate +=currReviewDetails.OverallRate*rateValueReg;
				friendsParkingRate +=currReviewDetails.ParkingRate*rateValueReg;
				friendsPriceRate   +=currReviewDetails.PriceRate*rateValueReg;
				friendsQualityRate +=currReviewDetails.QualityRate*rateValueReg;
			}
			
			else
			{
				countFav+=rateValueFav;
				friendsOverallRate +=currReviewDetails.OverallRate*rateValueFav;
				friendsParkingRate +=currReviewDetails.ParkingRate*rateValueFav;
				friendsPriceRate   +=currReviewDetails.PriceRate*rateValueFav;
				friendsQualityRate +=currReviewDetails.QualityRate*rateValueFav;
			}
		}		
	}
	
	totalDiv = countReg+countFav;
	
	if(totalDiv == 0)
	{
		document.getElementById("overallFromFriendsScoreNumberBusinessPage").innerHTML = 0;
		document.getElementById("PriceFromFriendsScoreNumberBusinessPage").innerHTML   = 0;
		document.getElementById("QualityFromFriendsScoreNumberBusinessPage").innerHTML = 0;
		document.getElementById("ParkingFromFriendsScoreNumberBusinessPage").innerHTML = 0;
		friendsOverallRate =0;
		friendsPriceRate =0;
		friendsQualityRate =0;
		friendsParkingRate =0;
	}
	
	else
	{
			friendsOverallRate /=totalDiv;
			friendsPriceRate /=totalDiv;
			friendsQualityRate /=totalDiv;
			friendsParkingRate /=totalDiv;
			
			
			
			friendsOverallRate = parseFloat(Math.round(friendsOverallRate * 20) / 20).toFixed(2);
			friendsPriceRate   = parseFloat(Math.round(friendsPriceRate * 20) / 20).toFixed(2);
			friendsQualityRate = parseFloat(Math.round(friendsQualityRate * 20) / 20).toFixed(2);
			friendsParkingRate = parseFloat(Math.round(friendsParkingRate * 20) / 20).toFixed(2);
	}
	console.log('Friends overall rate is : '+friendsOverallRate);
	console.log('Friends price rate is : '+friendsPriceRate);
	console.log('Friends quality rate is : '+friendsQualityRate);
	console.log('Friends parking rate is : '+friendsParkingRate);
	
	document.getElementById("overallFromFriendsScoreNumberBusinessPage").innerHTML = friendsOverallRate;
	document.getElementById("PriceFromFriendsScoreNumberBusinessPage").innerHTML   = friendsPriceRate;
	document.getElementById("QualityFromFriendsScoreNumberBusinessPage").innerHTML = friendsQualityRate;
	document.getElementById("ParkingFromFriendsScoreNumberBusinessPage").innerHTML = friendsParkingRate;
	
	
	
	$(function() {

		$.fn.raty.defaults.path = 'lib/img';
		$('#overallFromFriendsBusinessPage').raty({  width:true, hints: ['', '','', '',''], score: friendsOverallRate, readOnly:true,halfShow : true, starHalf : 'star-half.png'});
		$('#PriceFromFriendsBusinessPage').raty({  width:true, hints: ['', '','', '',''], score: friendsPriceRate, readOnly:true, halfShow : true, starHalf : 'star-half.png'});
		$('#ParkingFromFriendsBusinessPage').raty({  width:true, hints: ['', '','', '',''], score: friendsParkingRate, readOnly:true, halfShow : true, starHalf : 'star-half.png'});
		$('#QualityFromFriendsBusinessPage').raty({  width:true, hints: ['', '','', '',''], score: friendsQualityRate, readOnly:true, halfShow : true, starHalf : 'star-half.png'});

	});
}
		
	   //LA end
	   
var friendsId;
$(document).on('pagebeforeshow', '#busienssPage', function(){   

		document.getElementById('subjectOfMeetMeUp').value='';
		document.getElementById('contentMeetMeUp').value='';
		document.getElementById('e10').value='';

	
	
		
	getReviews(currentBid); //LA
								
	
	
	
		var i=0;
			var data = [];
			var tempo;						//DC
		for(i=0; i<globalUser.FriendsList.length;i++)
		{		
			//var data = [];
			tempo = {
                       id: globalUser.FriendsList[i].ID,
                       text: globalUser.FriendsList[i].Name
                   }
			data.push(tempo);
		}	 
		//DC
	getBusiness();
		
	friendsId = [];
    $("#e10").select2({

        data: data,
        multiple:true,
        placeholder: "Recipients"
		
    });
    
	$("#e10").click(function () { 
	friendsId.push($("#e10").select2("val"));
	});
    
    success(latitude,longitude);
    $('#mapHeight').css('height', $('#panelBodyMeetMeUpBusinessPage').css('height'));

});
  
  
  $(window).resize(function() {
       
      $('#mapHeight').css('height', $('#panelBodyMeetMeUpBusinessPage').css('height'));

      
     
});

 
  //map part
     
     function success(lat_para, lang_para) { 
  
          var coords = new google.maps.LatLng(lat_para, lang_para); 
            
          var options = { 
            zoom: 14, 
            center: coords, 
            mapTypeControl: false, 
            navigationControlOptions: { 
                style: google.maps.NavigationControlStyle.SMALL 
            }, 
            mapTypeId: google.maps.MapTypeId.ROADMAP 
          }; 
  
          var map = new google.maps.Map(document.getElementById("geomap"), options); 
  
  google.maps.event.addListenerOnce(map, 'idle', function() {
var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center); 
});
         
  google.maps.event.addDomListener(window, "resize", function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center); 
});
  
          var marker = new google.maps.Marker({ 
              position: coords, 
              map: map, 
              title:"You are here!"
          });
          
          
       }
           
//=================== Friends Page part ===================================

function cleanFriendTab() {
  
  document.getElementById("allFriendSearchSection").value="";
  document.getElementById("favoriteFriendSearchSection").value="";
  document.getElementById("regularFriendSearchSection").value="";
  fillUserFriendsInitializeStage();
  
};


$(document).on('pagebeforeshow', '#friendsZone', function(){       

	if(!globalUser)
	{
		console.log('undifined globaluser');
		globalUser = backupUser;
	}
	
	if(globalUser.FriendsList !=0)
	{
		allFriendsCounter = globalUser.FriendsList.length;
	}
	else
	{
		allFriendsCounter = 0;
	}
	favoriteFriendsCounter = 0;
    regularFriendsCounter;

	var i = 0;
	
	for (i=0; i<allFriendsCounter;i++)
	{
		if(globalUser.FriendsList[i].Type == "Fav")
		{
			favoriteFriendsCounter++;
		}
	}
	
	regularFriendsCounter = allFriendsCounter-favoriteFriendsCounter;
    
    fillUserFriendsInitializeStage();
});

//================================================================================

function fillUserFriendsInitializeStage()
{
       if(globalUser.FriendsList !=0)
	{
		allFriendsCounter = globalUser.FriendsList.length;
	}
	else
	{
		allFriendsCounter = 0;
	}
	favoriteFriendsCounter = 0;
	
	   var i = 0;
	
	for (i=0; i<allFriendsCounter;i++)
	{
		if(globalUser.FriendsList[i].Type == "Fav")
		{
			favoriteFriendsCounter++;
		}
	}
	
	regularFriendsCounter = allFriendsCounter-favoriteFriendsCounter;

 var myNode = document.getElementById("allFriendForm");
    while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
    }
    
    var myNode = document.getElementById("favoriteFriendForm");
    while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
    }
    
     var myNode = document.getElementById("regularFriendForm");
    while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
    }
    
   var userFriends = globalUser.FriendsList;	
	
    var i=0;
   var favI =0;
    var regI =0;
    
   document.getElementById("regularFriendSearchSection").value='';
   document.getElementById("favoriteFriendSearchSection").value='';
   document.getElementById("allFriendSearchSection").value='';
   
   document.getElementById("totalNumberOfFriends").innerHTML = allFriendsCounter;
   document.getElementById("favoriteNumberOfFriends").innerHTML = favoriteFriendsCounter;
   document.getElementById("regularNumberOfFriends").innerHTML = regularFriendsCounter;


   //document.getElementById("totalNumberOfFriends").value = allFriendsCounter;
    while(i<userFriends.length)
    {

       //if this is first elemnt in row, first create the row
       if(favI%3 == 0)
       {
                var rowFav = '<br><div class="rowFav" id="favoriteFriendFormRow'+favI/3+'"></div>';
                $("#favoriteFriendForm").append(rowFav);
       }
       
       if (regI%3 == 0)
       {
            var rowReg = '<br><div class="rowReg" id="regularFriendFormRow'+regI/3+'"></div>';
           $("#regularFriendForm").append(rowReg);
           
       }
        if (i%3 == 0)
       {
           var row = '<br><div class="row" id="allFriendFormRow'+i/3+'"></div>';
           $("#allFriendForm").append(row);
          
       } 
       
       //per row initializition
      // var j =0;
      // while(j<3)
     //  {
            var elementId = '_AllFriend_'+userFriends[i].ID; //note - in actual not demo, the user id will be put instead
            var settingOfElementInRow = '<div class ="col-lg-offset-1 col-md-offset-1 col-lg-3 col-md-3 col-sm-4 col-xs-4" id="'+elementId+'"></div>';
            var currRowElementBelongsTo = 'allFriendFormRow'+Math.floor(i/3);
            $('#'+currRowElementBelongsTo).append(settingOfElementInRow);
                       
     
            //this is where we bulid the element itself - img, checkbox and name included
            var element  = '<div class ="row">';   
                element += '<div class ="col-lg-4 col-md-4 col-sm-6 col-xs-7 col-xs-offset-3 col-sm-offset-3 thumbnail" style="background-color:transparent; margin-bottom:0px; border-color:transparent">';
                element += '<img class ="img-responsive img-rounded img-circle" style ="float:left; height:90px; " src="img/maleIcon.png">';
                
                
                
               
              
                                if(userFriends[i].Type === "Fav")
                                    {
                                        //buld favorite friend tab
                                        var elementIdFav = '_FavoriteFriend_'+userFriends[i].ID; //note - in actual not demo, the user id will be put instead
                                        var settingOfElementInRowFav = '<div class ="col-lg-offset-1 col-md-offset-1 col-lg-3 col-md-3 col-sm-4 col-xs-4" id="'+elementIdFav+'"></div>';
                                        var currRowElementBelongsToFav = 'favoriteFriendFormRow'+Math.floor(favI/3);
                                        $('#'+currRowElementBelongsToFav).append(settingOfElementInRowFav);
                       
     
                                        //this is where we bulid the element itself - img, checkbox and name included
                                        var elementFav  = '<div class ="row">';   
                                        elementFav += '<div class ="col-lg-4 col-md-4 col-sm-6 col-xs-7 col-xs-offset-3 col-sm-offset-3 thumbnail" style="background-color:transparent; margin-bottom:0px; border-color:transparent">';
                                        elementFav += '<img id="_FavoriteFriendCB_'+userFriends[i].ID+'_img" class ="img-responsive img-rounded img-circle" style ="position: relative; float:left; height:90px; " src="img/maleIcon.png">';
                                        elementFav += '<p class ="favoriteFriendText">Favorite</p>';      
                                        elementFav += '</div>';
                                        elementFav += '</div>';

                                        elementFav += '<div class ="row">';
                                        elementFav += '<div class ="col-lg-offset-3 col-md-offset-4 col-sm-offset-4 col-xs-offset-4 mainFont">';
                                        elementFav += '<label class="checkbox inline">';
                                        elementFav += '<input type="checkbox" id="_FavoriteFriendCB_'+userFriends[i].ID+'" >';
                                        elementFav += '<h4 id="_FavoriteFriendCB_'+userFriends[i].ID+'_h4">'+userFriends[i].Name+'</h4>';
                                        elementFav += '</label>';
               
                                        elementFav += '</div></div>';
                                           favI++;

                                         $('#'+elementIdFav).append(elementFav);
            
                                        
                                        //--==--==--==-==--=-=-=-=-=-=-=-= all friend tab
                                        element += '<p class ="favoriteFriendText">Favorite</p>';      
                                    }
                                    
                                    if(userFriends[i].Type === "Reg") //for regular friend tab
                                    {
                                        //buld regular friend tab
                                        var elementIdReg = '_RegularFriend_'+userFriends[i].ID; //note - in actual not demo, the user id will be put instead
                                        var settingOfElementInRowReg = '<div class ="col-lg-offset-1 col-md-offset-1 col-lg-3 col-md-3 col-sm-4 col-xs-4" id="'+elementIdReg+'"></div>';
                                        var currRowElementBelongsToReg = 'regularFriendFormRow'+Math.floor(regI/3);
                                        $('#'+currRowElementBelongsToReg).append(settingOfElementInRowReg);
                       
                                        //this is where we bulid the element itself - img, checkbox and name included
                                        var elementReg  = '<div class ="row">';   
                                        elementReg += '<div class ="col-lg-4 col-md-4 col-sm-6 col-xs-7 col-xs-offset-3 col-sm-offset-3 thumbnail" style="background-color:transparent; margin-bottom:0px; border-color:transparent">';
                                        elementReg += '<img id="_RegularFriendCB_'+userFriends[i].ID+'_img" class ="img-responsive img-rounded img-circle" style ="position: relative; float:left; height:90px; " src="img/maleIcon.png">';
                                        elementReg += '</div>';
                                        elementReg += '</div>';
                                        
                                        elementReg += '<div class ="row">';
                                        elementReg += '<div class ="col-lg-offset-3 col-md-offset-4 col-sm-offset-4 col-xs-offset-4 mainFont">';
                                        elementReg += '<label class="checkbox inline">';
                                        elementReg += '<input type="checkbox" id="_RegularFriendCB_'+userFriends[i].ID+'">';
                                        elementReg += '<h4 id="_RegularFriendCB_'+userFriends[i].ID+'_h4">'+userFriends[i].Name+'</h4>';
                                        elementReg += '</label>';
               
                                        elementReg += '</div></div>';
                                        regI++;

                                         $('#'+elementIdReg).append(elementReg);

                                        
                                    }
                                    
                            
                 
          
                
                element += '</div>';
                element += '</div>';
                
                element += '<div class ="row">';
                element += '<div class ="col-lg-offset-3 col-md-offset-4 col-sm-offset-4 col-xs-offset-4 mainFont">';
                element += '<h4 id ="_allFriendCB_'+userFriends[i].ID+'_h4">'+userFriends[i].Name+'</h4>';
                element += '</div>';
         
                element += '</div>';
    

            $('#'+elementId).append(element);
          //  j++;
            i++;
            

            if(i>=userFriends.length) 
            {
                break;
            }
      // }
       
       
    }
    



}

//===========================================================================

function fillUserFriendsBySearchResults(matchingResult)
{ 
    //fiiling up user friends list to be presented, when starting search
    
    var myNode = document.getElementById("allFriendForm");
    while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
    }
    
    var myNode = document.getElementById("favoriteFriendForm");
    while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
    }
    
     var myNode = document.getElementById("regularFriendForm");
    while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
    }
    
    
//   var allFriendForm = document.getElementById("allFriendForm");
    var i=0;
    var favI =0;
    var regI =0;

    while(i<matchingResult.length)
    {
       //if this is first elemnt in row, first create the row
       if (favI%3 == 0)
       {
            var rowFav = '<br><div class="rowFav" id="favoriteFriendFormRow'+favI/3+'"></div>';
           $("#favoriteFriendForm").append(rowFav);
       }
       
       if (regI%3 == 0)
       {
            var rowReg = '<br><div class="rowReg" id="regularFriendFormRow'+regI/3+'"></div>';
           $("#regularFriendForm").append(rowReg);
       }
        if (i%3 == 0)
       {
           var row = '<br><div class="row" id="allFriendFormRow'+i/3+'"></div>';
           $("#allFriendForm").append(row);
       } 
       
       //per row initializition
       //var j =0;
      // while(j<3)
       //{
            var elementId = '__AllFriend_'+matchingResult[i].ID; //note - in actual not demo, the user id will be put instead
            var settingOfElementInRow = '<div class ="col-lg-offset-1 col-md-offset-1 col-lg-3 col-md-3 col-sm-4 col-xs-4" id="'+elementId+'"></div>';
            var currRowElementBelongsTo = 'allFriendFormRow'+Math.floor(i/3);
            $('#'+currRowElementBelongsTo).append(settingOfElementInRow);
            
            //this is where we bulid the element itself - img, checkbox and name included
            var element  = '<div class ="row">';   
                element += '<div class ="col-lg-4 col-md-4 col-sm-6 col-xs-3 col-xs-offset-2 col-sm-offset-3 thumbnail" style="background-color:transparent; margin-bottom:0px; border-color:transparent">';
                element += '<img class ="img-responsive img-rounded img-circle" style ="float:left; height:90px; " src="img/maleIcon.png">';
                
                
                
               
              
                                if(matchingResult[i].Type === "Fav")
                                    {
                                        
                                        //buld favorite friend tab
                                        var elementIdFav = '_FavoriteFriend_'+matchingResult[i].ID; //note - in actual not demo, the user id will be put instead
                                        var settingOfElementInRowFav = '<div class ="col-lg-offset-1 col-md-offset-1 col-lg-3 col-md-3 col-sm-4 col-xs-4" id="'+elementIdFav+'"></div>';
                                        var currRowElementBelongsToFav = 'favoriteFriendFormRow'+Math.floor(favI/3);
                                        $('#'+currRowElementBelongsToFav).append(settingOfElementInRowFav);
                       
     
                                        //this is where we bulid the element itself - img, checkbox and name included
                                        var elementFav  = '<div class ="row">';   
                                        elementFav += '<div class ="col-lg-4 col-md-4 col-sm-6 col-xs-7 col-xs-offset-3 col-sm-offset-3 thumbnail" style="background-color:transparent; margin-bottom:0px; border-color:transparent">';
                                        elementFav += '<img id="_FavoriteFriendCB_'+matchingResult[i].ID+'_img" class ="img-responsive img-rounded img-circle" style ="position: relative; float:left; height:90px; " src="img/maleIcon.png">';
                                        elementFav += '<p class ="favoriteFriendText">Favorite</p>';      
                                        elementFav += '</div>';
                                        elementFav += '</div>';

                                        elementFav += '<div class ="row">';
                                        elementFav += '<div class ="col-lg-offset-3 col-md-offset-4 col-sm-offset-4 col-xs-offset-4 mainFont">';
                                        elementFav += '<label class="checkbox inline">';
                                        elementFav += '<input type="checkbox" id="_FavoriteFriendCB_'+matchingResult[i].ID+'" >';
                                        elementFav += '<h4 id="_FavoriteFriendCB_'+matchingResult[i].ID+'_h4">'+matchingResult[i].Name+'</h4>';
                                        elementFav += '</label>';
               
                                        elementFav += '</div>';
                                        elementFav += '</div>';

                                         $('#'+elementIdFav).append(elementFav);
            
                       
                                            favI++;
                                        //all friend tab----------------------------
                                        element += '<p class ="favoriteFriendText">Favorite</p>';      
                                    }
                                    
                                    if(matchingResult[i].Type === "Reg")
                                    {
                                        //buld regular friend tab
                                        var elementIdReg = '_RegularFriend_'+matchingResult[i].ID; //note - in actual not demo, the user id will be put instead
                                        var settingOfElementInRowReg = '<div class ="col-lg-offset-1 col-md-offset-1 col-lg-3 col-md-3 col-sm-4 col-xs-4" id="'+elementIdReg+'"></div>';
                                        var currRowElementBelongsToReg = 'regularFriendFormRow'+Math.floor(regI/3);
                                        $('#'+currRowElementBelongsToReg).append(settingOfElementInRowReg);
                       
                                        //this is where we bulid the element itself - img, checkbox and name included
                                        var elementReg  = '<div class ="row">';   
                                        elementReg += '<div class ="col-lg-4 col-md-4 col-sm-6 col-xs-7 col-xs-offset-3 col-sm-offset-3 thumbnail" style="background-color:transparent; margin-bottom:0px; border-color:transparent">';
                                        elementReg += '<img id="_RegularFriendCB_'+matchingResult[i].ID+'_img" class ="img-responsive img-rounded img-circle" style ="position: relative; float:left; height:90px; " src="img/maleIcon.png">';
                                        elementReg += '</div>';
                                        elementReg += '</div>';
                                        
                                        elementReg += '<div class ="row">';
                                        elementReg += '<div class ="col-lg-offset-3 col-md-offset-4 col-sm-offset-4 col-xs-offset-4 mainFont">';
                                        elementReg += '<label class="checkbox inline">';
                                        elementReg += '<input type="checkbox" id="_RegularFriendCB_'+matchingResult[i].ID+'">';
                                        elementReg += '<h4 id="_RegularFriendCB_'+matchingResult[i].ID+'_h4">'+matchingResult[i].Name+'</h4>';
                                        elementReg += '</label>';
               
                                        elementReg += '</div></div>';

                                         regI++;
                                         $('#'+elementIdReg).append(elementReg);
                                    }
                                   
                            
                 
          
                
                element += '</div>';
                element += '</div>';
                
                element += '<div class ="row">';
                element += '<div class ="col-lg-offset-3 col-md-offset-4 col-sm-offset-4 col-xs-offset-4 mainFont"><h4 id="_allFriendCB_'+matchingResult[i].ID+'_h4">'+matchingResult[i].Name+'</h4></div>';
                element += '</div>';

            $('#'+elementId).append(element);
         //   j++;
            i++;
            
            if(i>=matchingResult.length) 
            {
                break;
            }
      // }
    }

}



$(function () {
                 
             
                  $("#favoriteFriendSearchSection").autocomplete({
                minLength: 0,
                source: function (request, response) {
                     var i;
               var favIndex = 0;
               var detailsOfFavoriteFriends= [];
               
               for(i=0; i<globalUser.FriendsList.length;i++)
               {
                    var id1 = globalUser.FriendsList[i].ID;
                    var name1 = globalUser.FriendsList[i].Name;
                    var type1 = globalUser.FriendsList[i].Type;
                                                          
                   var tempo = {
                       ID: id1,
                       Name: name1,
                       Type: type1
                   }
                   
                   if(type1 == "Fav")
                       {
                           detailsOfFavoriteFriends[favIndex] = tempo;
                           favIndex++;
                       }
                       
                }
                
                    var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");

                    var matching = $.grep(detailsOfFavoriteFriends, function (value) {
                        var name = value.Name;

                        return matcher.test(name);
                    });
                    
                    if(request.term.length==0)
                        {
                            response(fillUserFriendsInitializeStage());
                        }
                        else{
                             response(fillUserFriendsBySearchResults(matching));
                    }
                }
            });


                 $("#regularFriendSearchSection").autocomplete({
                minLength: 0,
                source: function (request, response) {
                    
                     var i;
               var regIndex = 0;
               var detailsOfRegularFriends= [];
               
               for(i=0; i<globalUser.FriendsList.length;i++)
               {
                    var id1 = globalUser.FriendsList[i].ID;
                    var name1 = globalUser.FriendsList[i].Name;
                    var type1 = globalUser.FriendsList[i].Type;
                                                          
                   var tempo = {
                       ID: id1,
                       Name: name1,
                       Type: type1
                   }
                   
                       
                   if(type1 == "Reg")
                       {
                           detailsOfRegularFriends[regIndex] = tempo;
                           regIndex++;
                       }
                }
                
                    var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");

                    var matching = $.grep(detailsOfRegularFriends, function (value) {
                        var name = value.Name;

                        return matcher.test(name);
                    });
                    
                    if(request.term.length==0)
                        {
                            response(fillUserFriendsInitializeStage());
                        }
                        else{
                             response(fillUserFriendsBySearchResults(matching));
                    }
                }
            });


            $("#allFriendSearchSection").autocomplete({
                minLength: 0,
                source: function (request, response) {
                    
                        var i;
               var detailsOfAllFriends= [];
               
               for(i=0; i<globalUser.FriendsList.length;i++)
               {
                    var id1 = globalUser.FriendsList[i].ID;
                    var name1 = globalUser.FriendsList[i].Name;
                    var type1 = globalUser.FriendsList[i].Type;
                                                          
                   var tempo = {
                       ID: id1,
                       Name: name1,
                       Type: type1
                   }
                   
                   detailsOfAllFriends[i] = tempo;
                   
                }
                
                    var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");

                    var matching = $.grep(detailsOfAllFriends, function (value) {
                    var name = value.Name;

                        return matcher.test(name);
                    });
                    
                    if(request.term.length==0)
                        {
                            response(fillUserFriendsInitializeStage());
                        }
                        else{
                             response(fillUserFriendsBySearchResults(matching));
                    }
                }
            });
        });
        
   
   
function getIndexOfActiveTab()
{
    return $("#friendZoneTabs ui li.ui-state-active").index();
}
   
       
//=================================searchResult=================================================

  function populateSearchResults()
{


     document.getElementById("firstCategoryResult").innerHTML="Nothing to display";
     document.getElementById("firstNameResult").innerHTML="Nothing to display"
     document.getElementById("firstAddressResult").innerHTML="Nothing to display";
     document.getElementById("firstEmailResult").innerHTML="Nothing to display";
     document.getElementById("firstPhoneResult").innerHTML="Nothing to display";
     
	 
     
     document.getElementById("secondCategoryResult").innerHTML="Nothing to display";
     document.getElementById("secondNameResult").innerHTML="Nothing to display"
     document.getElementById("secondAddressResult").innerHTML="Nothing to display";
     document.getElementById("secondEmailResult").innerHTML="Nothing to display";
     document.getElementById("secondPhoneResult").innerHTML="Nothing to display";
     
     
     document.getElementById("thirdCategoryResult").innerHTML="Nothing to display";
     document.getElementById("thirdNameResult").innerHTML="Nothing to display"
     document.getElementById("thirdAddressResult").innerHTML="Nothing to display";
     document.getElementById("thirdEmailResult").innerHTML="Nothing to display";
     document.getElementById("thirdPhoneResult").innerHTML="Nothing to display";
     
      document.getElementById("fourthCategoryResult").innerHTML="Nothing to display";
     document.getElementById("fourthNameResult").innerHTML="Nothing to display"
     document.getElementById("fourthAddressResult").innerHTML="Nothing to display";
     document.getElementById("fourthEmailResult").innerHTML="Nothing to display";
     document.getElementById("fourthPhoneResult").innerHTML="Nothing to display";
	 
	 

	

	if(globalIndex == globalBusinessResults.length){
							 
							 globalIndex = 0;
							 globalResultPage = 0;
							 $("#secondResult").removeClass("hidden").addClass("visible");
							 $("#thirdResult").removeClass("hidden").addClass("visible");
							 $("#fourthResult").removeClass("hidden").addClass("visible");
							 $("#secondResultbadge").removeClass("hidden").addClass("visible");
							 $("#thirdResultbadge").removeClass("hidden").addClass("visible");
							 $("#fourthResultbadge").removeClass("hidden").addClass("visible");
							
							 }
	
	
							
							 if(globalIndex<globalBusinessResults.length){
							 document.getElementById("firstNameResult").innerHTML= globalBusinessResults[globalIndex].name;
							 document.getElementById("firstCategoryResult").innerHTML= globalBusinessResults[globalIndex].type;
							 document.getElementById("firstAddressResult").innerHTML= globalBusinessResults[globalIndex].address;
							 document.getElementById("firstPhoneResult").innerHTML= globalBusinessResults[globalIndex].phone;
							 document.getElementById("firstEmailResult").innerHTML= globalBusinessResults[globalIndex].email;
							 globalIndex++;
							 if(globalIndex == globalBusinessResults.length){
							 //alert("There's nowhere to go next to");
							 //globalResultPage++;
							 
							 }
							 }
							
							
							if(globalIndex<globalBusinessResults.length){
							 document.getElementById("secondNameResult").innerHTML= globalBusinessResults[globalIndex].name;
							 document.getElementById("secondCategoryResult").innerHTML= globalBusinessResults[globalIndex].type;
							 document.getElementById("secondAddressResult").innerHTML= globalBusinessResults[globalIndex].address;
							 document.getElementById("secondPhoneResult").innerHTML= globalBusinessResults[globalIndex].phone;
							 document.getElementById("secondEmailResult").innerHTML= globalBusinessResults[globalIndex].email;
							 globalIndex++;
							 if(globalIndex == globalBusinessResults.length){
							 //alert("There's nowhere to go next to");
							 //globalResultPage++;
							 
							 }
							}
							
							if(globalIndex<globalBusinessResults.length){
							 document.getElementById("thirdNameResult").innerHTML= globalBusinessResults[globalIndex].name;
							 document.getElementById("thirdCategoryResult").innerHTML= globalBusinessResults[globalIndex].type;
							 document.getElementById("thirdAddressResult").innerHTML= globalBusinessResults[globalIndex].address;
							 document.getElementById("thirdPhoneResult").innerHTML= globalBusinessResults[globalIndex].phone;
							 document.getElementById("thirdEmailResult").innerHTML= globalBusinessResults[globalIndex].email;
							 globalIndex++;
							 if(globalIndex == globalBusinessResults.length){
							 //alert("There's nowhere to go next to");
							 //globalResultPage++;
							 
							 }
							 }
							
							
							if(globalIndex<globalBusinessResults.length){
							 document.getElementById("fourthNameResult").innerHTML= globalBusinessResults[globalIndex].name;
							 document.getElementById("fourthCategoryResult").innerHTML= globalBusinessResults[globalIndex].type;
							 document.getElementById("fourthAddressResult").innerHTML= globalBusinessResults[globalIndex].address;
							 document.getElementById("fourthPhoneResult").innerHTML= globalBusinessResults[globalIndex].phone;
							 document.getElementById("fourthEmailResult").innerHTML= globalBusinessResults[globalIndex].email;
							 globalIndex++;
							 if(globalIndex == globalBusinessResults.length){
							 alert("There's nowhere to go next to");
							// globalIndex--;
							 //globalResultPage++;
							 
							 }
							}
							
						//	 if(globalIndex == globalBusinessResults.length){
						//	 alert("There's nowhere to go next to");
						//	 globalResultPage++;
							 
						//	 }
						
						
						if(globalIndex <= globalBusinessResults.length){
							 
							 globalResultPage++;
							 
							 }
													 
							 if(globalIndex == globalBusinessResults.length){
							 
							 //globalIndex--;
							 
							 }
						
						
						
						if(document.getElementById("secondCategoryResult").innerHTML == "Nothing to display")
						{
						 $("#secondResult").addClass("hidden");
						 $("#secondResultbadge").addClass("hidden");
						}
						
						if(document.getElementById("thirdCategoryResult").innerHTML == "Nothing to display")
						{
						 $("#thirdResult").addClass("hidden");
						 $("#thirdResultbadge").addClass("hidden");
						}
	
						if(document.getElementById("fourthCategoryResult").innerHTML == "Nothing to display")
						{
						 $("#fourthResult").addClass("hidden");
						 $("#fourthResultbadge").addClass("hidden");
						}
			
}





function prevSearchResults()
{


     document.getElementById("firstCategoryResult").innerHTML="Nothing to display";
     document.getElementById("firstNameResult").innerHTML="Nothing to display"
     document.getElementById("firstAddressResult").innerHTML="Nothing to display";
     document.getElementById("firstEmailResult").innerHTML="Nothing to display";
     document.getElementById("firstPhoneResult").innerHTML="Nothing to display";
     
     
     document.getElementById("secondCategoryResult").innerHTML="Nothing to display";
     document.getElementById("secondNameResult").innerHTML="Nothing to display"
     document.getElementById("secondAddressResult").innerHTML="Nothing to display";
     document.getElementById("secondEmailResult").innerHTML="Nothing to display";
     document.getElementById("secondPhoneResult").innerHTML="Nothing to display";
     
     
     document.getElementById("thirdCategoryResult").innerHTML="Nothing to display";
     document.getElementById("thirdNameResult").innerHTML="Nothing to display"
     document.getElementById("thirdAddressResult").innerHTML="Nothing to display";
     document.getElementById("thirdEmailResult").innerHTML="Nothing to display";
     document.getElementById("thirdPhoneResult").innerHTML="Nothing to display";
     
      document.getElementById("fourthCategoryResult").innerHTML="Nothing to display";
     document.getElementById("fourthNameResult").innerHTML="Nothing to display"
     document.getElementById("fourthAddressResult").innerHTML="Nothing to display";
     document.getElementById("fourthEmailResult").innerHTML="Nothing to display";
     document.getElementById("fourthPhoneResult").innerHTML="Nothing to display";
	 
	

							
							 if(globalIndex>0){
							 globalIndex--;
							
							 document.getElementById("fourthNameResult").innerHTML= globalBusinessResults[globalIndex].name;
							 document.getElementById("fourthCategoryResult").innerHTML= globalBusinessResults[globalIndex].type;
							 document.getElementById("fourthAddressResult").innerHTML= globalBusinessResults[globalIndex].address;
							 document.getElementById("fourthPhoneResult").innerHTML= globalBusinessResults[globalIndex].phone;
							 document.getElementById("fourthEmailResult").innerHTML= globalBusinessResults[globalIndex].email;
							 if(globalIndex == 0){
							 alert("There's nowhere to go next to");
							 globalIndex++;
							// globalResultPage--;
							 
							 }
							 }
							
							
							if(globalIndex>0){
							globalIndex--;
							 document.getElementById("thirdNameResult").innerHTML= globalBusinessResults[globalIndex].name;
							 document.getElementById("thirdCategoryResult").innerHTML= globalBusinessResults[globalIndex].type;
							 document.getElementById("thirdAddressResult").innerHTML= globalBusinessResults[globalIndex].address;
							 
							 if(globalIndex == 0){
							 alert("There's nowhere to go next to");
							 globalIndex++;
							// globalResultPage--;
							 
							 }
							}
							
							if(globalIndex>0){
							globalIndex--;
							
							 document.getElementById("secondNameResult").innerHTML= globalBusinessResults[globalIndex].name;
							 document.getElementById("secondCategoryResult").innerHTML= globalBusinessResults[globalIndex].type;
							 document.getElementById("secondAddressResult").innerHTML= globalBusinessResults[globalIndex].address;
							 
							 if(globalIndex == 0){
							 alert("There's nowhere to go next to");
							 globalIndex++;
							// globalResultPage--;
							 
							 }
							 }
							
							
							if(globalIndex>0){
							globalIndex--;
							 
							  document.getElementById("firstNameResult").innerHTML= globalBusinessResults[globalIndex].name;
							 document.getElementById("firstCategoryResult").innerHTML= globalBusinessResults[globalIndex].type;
							 document.getElementById("firstAddressResult").innerHTML= globalBusinessResults[globalIndex].address;
							 if(globalIndex == 0){
							 alert("There's nowhere to go next to");
							 globalIndex++;
							// globalResultPage--;
							 
							 }
							}
							
						//	 if(globalIndex == globalBusinessResults.length){
						//	 alert("There's nowhere to go next to");
						//	 globalResultPage++;
							 
						//	 }
						
						
						if(globalIndex > 0){
							 
							 globalResultPage--;
							 
							 }
							 
							 
							  if(globalIndex == 0){
							 
							 globalIndex++;
							 
							 }
							 
							 

	 
     
}



    //-------------------------findBusiness---------------------------------------
   var globalBusinessResults; //gets run over everytime someone makes a new a search
	 var globalIndex; //gets reset everytime someone makes a new search
	 var globalResultPage;

		$(function() {
      $.fn.raty.defaults.path = 'lib/img';
      
      $('#minimumRatingFindBusiness').raty({
        size     : 24,
		cancel: true,
        starOff  : 'star-off-big.png',
         score: 3,
         hints: ['', '','', '',''],
        starOn   : 'star-on-big.png',
		click       : function(score, evt) {
		rating = score;
						}
      });
	  });
	  
	  
	var rating = 3;
	 function searchBusiness()
    {
		globalIndex = 0;
		globalResultPage = 0;
	//	alert(globalResultPage);

		if(!rating)
		{
			rating =0;
		}
		
		var type = document.getElementById("businessTypeFindBusiness").value;
        var city = document.getElementById("businessCityFindBusiness").value;
       // var rating = 4;  // temporary until i can get the raty working fine
        var searchString = document.getElementById("specificNameFindBusiness").value;
	 //  var searchString = "";
		
		//alert(type);
		//alert(city);
        
         $.ajax({
            type: "POST",
            url: "/businesses/filter", 
            data: '{"businessTypeFindBusiness" : "'+type+'","businessCityFindBusiness" : "'+city+'","minimumRatingFindBusiness" : "'+rating+'","specificNameFindBusiness" : "'+searchString+'"}',
	    contentType: "application/json",
            dataType: "json",
              
           success:function(result)
            {
			
				if(result=='')
				{
					alert("We couldnt find you anything");
				}
				else
				{
					globalBusinessResults=result;
					populateSearchResults();
							
					var loc = location.href;
					var splitter = loc.split('#');
					var first = splitter[0];
					var loca = first.concat("#searchResults")
					window.location = loca; 
				}
            }
            ,
            failure:function(err)
            {
			alert(':(');
	    }
            
        });
        
        
    }

	//==============================================================================
	

	var getBusinessId;
	var Business;
	function getBusiness()
	{
	
	
		$.ajax({
            type: "GET",      
	        url: '/business/'+getBusinessId, 
			contentType: "application/json",
            dataType: "json",
        
				success:function(result)
				{
				
					Business = result;
								
							document.getElementById("businessNameBusinessPage").innerHTML=Business.name;
					 document.getElementById("businessTypeBusinessPage").innerHTML=Business.type;
					 document.getElementById("businessAddreddBusinessPage").innerHTML=Business.address;
					 document.getElementById("businessLastUpadateBusinessPage").innerHTML=Business.LastUpdate;
					 document.getElementById("businessRank").innerHTML=Business.ratingFromReviewsTotal;
					 document.getElementById("BusinessNameGetReview").innerHTML=Business.name;
					//document.getElementById("businessNameAddReview").innerHTML=Business.name;
					 //document.getElementById("businessAddreddAddReview").innerHTML=Business.address;
					 //document.getElementById("businessTypeAddReview").innerHTML=Business.type;
					 document.getElementById("businessRank").innerHTML=Business.avgOverallRat;
					 avgBusinessStars=Business.avgOverallRat;
					 document.getElementById("totalRanker").innerHTML=Business.ratingFromReviewsTotal+" total ranker" ;	
					 totalRatings = Business.ratingFromReviewsTotal;
					 oneRatings = Business.ratingFromReviewsOne;
					 twoRatings = Business.ratingFromReviewsTwo;
					 threeRatings = Business.ratingFromReviewsThree;
					 fourRatings = Business.ratingFromReviewsFour;
					 fiveRatings = Business.ratingFromReviewsFive;
					 
	                if(totalRatings == 0)
				    {
						oneRatings = 0+'%';
						twoRatings = 0+'%';
						threeRatings = 0+'%';
						fourRatings = 0+'%';
						fiveRatings = 0+'%';
					}
	 
					else
					{
						  oneRatings = oneRatings /parseFloat(totalRatings) * 100;
						  oneRatings = parseFloat(Math.round(oneRatings * 20) / 20).toFixed(2);
						  oneRatings = oneRatings+'%';
						  
						   twoRatings = twoRatings /parseFloat(totalRatings) * 100;
						   twoRatings = parseFloat(Math.round(twoRatings * 20) / 20).toFixed(2);
						   twoRatings = twoRatings+'%';
						   
						   threeRatings = threeRatings /parseFloat(totalRatings) * 100;
						   threeRatings = parseFloat(Math.round(threeRatings * 20) / 20).toFixed(2);
					       threeRatings = threeRatings+'%';

						   fourRatings = fourRatings /parseFloat(totalRatings) * 100;
					       fourRatings = parseFloat(Math.round(fourRatings * 20) / 20).toFixed(2);
					       fourRatings = fourRatings+'%';

						   fiveRatings = fiveRatings /parseFloat(totalRatings) * 100;
						   fiveRatings = parseFloat(Math.round(fiveRatings * 20) / 20).toFixed(2);
						   fiveRatings = fiveRatings+'%';

					}
					  document.getElementById("1RatersPercent").innerHTML = oneRatings ;
					 $('#BusinessOverall1Raters').css('width' , oneRatings);
					 
					 
					  document.getElementById("2RatersPercent").innerHTML = twoRatings ;
					 $('#BusinessOverall2Raters').css('width' , twoRatings);
					 
					  
					  document.getElementById("3RatersPercent").innerHTML = threeRatings ;
					 $('#BusinessOverall3Raters').css('width' , threeRatings);
					 
					  
					  document.getElementById("4RatersPercent").innerHTML = fourRatings ;
					 $('#BusinessOverall4Raters').css('width' , fourRatings);
					 
					 
					 document.getElementById("5RatersPercent").innerHTML = fiveRatings ;
					 $('#BusinessOverall5Raters').css('width' , fiveRatings);
					 
					 
					 
						$('#totalScoreStarBusiness').raty({
					   half     : true,
					  size     : 24,
					  starHalf : 'star-half-big.png',
					  starOff  : 'star-off-big.png',
					  score: avgBusinessStars,
					  readOnly: true,
						hints: ['', '','', '',''],
						starOn   : 'star-on-big.png'
					 });
	 

     longitude  =Business.geoLocCoords.coordinates[1];
	 latitude =Business.geoLocCoords.coordinates[0];
				
            }
            ,
            failure:function(err)
            {
			alert('There was a problem, try again');
			}
            
        });
	
	
	}
	
	    //-------------------------BusinessPage---------------------------------------
	
		var currentBusiness;
		var longitude;
		var latitude;
		var avgBusinessStars;
		var totalRatings;
		var oneRatings;
		var twoRatings;
		var threeRatings;
		var fourRatings;
		var fiveRatings;
		
	 function populateFirstResult()
	{
		var i = globalResultPage*4 -4;
		
		currentBusiness = i;
		getBusinessId = globalBusinessResults[i]._id;
	 document.getElementById("businessNameBusinessPage").innerHTML=globalBusinessResults[i].name;
     document.getElementById("businessTypeBusinessPage").innerHTML=globalBusinessResults[i].type;
     document.getElementById("businessAddreddBusinessPage").innerHTML=globalBusinessResults[i].address;
     document.getElementById("businessLastUpadateBusinessPage").innerHTML=globalBusinessResults[i].LastUpdate;
     document.getElementById("businessRank").innerHTML=globalBusinessResults[i].ratingFromReviewsTotal;
	 document.getElementById("BusinessNameGetReview").innerHTML=globalBusinessResults[i].name;
   	//document.getElementById("businessNameAddReview").innerHTML=globalBusinessResults[i].name;
	// document.getElementById("businessAddreddAddReview").innerHTML=globalBusinessResults[i].address;
	 //document.getElementById("businessTypeAddReview").innerHTML=globalBusinessResults[i].type;
	 document.getElementById("businessRank").innerHTML=globalBusinessResults[i].avgOverallRat;
	 avgBusinessStars=globalBusinessResults[i].avgOverallRat;
	 document.getElementById("totalRanker").innerHTML=globalBusinessResults[i].ratingFromReviewsTotal ;	
	 totalRatings = globalBusinessResults[i].ratingFromReviewsTotal;
	 oneRatings = globalBusinessResults[i].ratingFromReviewsOne;
	 twoRatings = globalBusinessResults[i].ratingFromReviewsTwo;
	 threeRatings = globalBusinessResults[i].ratingFromReviewsThree;
	 fourRatings = globalBusinessResults[i].ratingFromReviewsFour;
	 fiveRatings = globalBusinessResults[i].ratingFromReviewsFive;
	 
	 
	 
	  oneRatings = oneRatings /parseFloat(totalRatings) * 100;
	  oneRatings = parseFloat(Math.round(oneRatings * 20) / 20).toFixed(2);
	  oneRatings = oneRatings+'%';
	  
	  document.getElementById("1RatersPercent").innerHTML = oneRatings ;
	 $('#BusinessOverall1Raters').css('width' , oneRatings);
	 
	 
	  twoRatings = twoRatings /parseFloat(totalRatings) * 100;
	  twoRatings = parseFloat(Math.round(twoRatings * 20) / 20).toFixed(2);
	  twoRatings = twoRatings+'%';

	  document.getElementById("2RatersPercent").innerHTML = twoRatings ;
	 $('#BusinessOverall2Raters').css('width' , twoRatings);
	 
	  threeRatings = threeRatings /parseFloat(totalRatings) * 100;
	  threeRatings = parseFloat(Math.round(threeRatings * 20) / 20).toFixed(2);
	  threeRatings = threeRatings+'%';

	  document.getElementById("3RatersPercent").innerHTML = threeRatings ;
	 $('#BusinessOverall3Raters').css('width' , threeRatings);
	 
	  fourRatings = fourRatings /parseFloat(totalRatings) * 100;
	  fourRatings = parseFloat(Math.round(fourRatings * 20) / 20).toFixed(2);
	  fourRatings = fourRatings+'%';

	  document.getElementById("4RatersPercent").innerHTML = fourRatings ;
	 $('#BusinessOverall4Raters').css('width' , fourRatings);
	 
	 fiveRatings = fiveRatings /parseFloat(totalRatings) * 100;
	 fiveRatings = parseFloat(Math.round(fiveRatings * 20) / 20).toFixed(2);
	 fiveRatings = fiveRatings+'%';
	 

	 document.getElementById("5RatersPercent").innerHTML = fiveRatings ;
	 $('#BusinessOverall5Raters').css('width' , fiveRatings);
	 
	 
	 
		$('#totalScoreStarBusiness').raty({
       half     : true,
      size     : 24,
      starHalf : 'star-half-big.png',
      starOff  : 'star-off-big.png',
      score: avgBusinessStars,
      readOnly: true,
        hints: ['', '','', '',''],
        starOn   : 'star-on-big.png'
     });
	 

     longitude  =globalBusinessResults[i].geoLocCoords.coordinates[1];
	 latitude =globalBusinessResults[i].geoLocCoords.coordinates[0];
}

 function populateSecondResult()
{
		var i = globalResultPage*4 -3;
		
		currentBusiness = i;
		getBusinessId = globalBusinessResults[i]._id;
	 document.getElementById("businessNameBusinessPage").innerHTML=globalBusinessResults[i].name;
     document.getElementById("businessTypeBusinessPage").innerHTML=globalBusinessResults[i].type;
     document.getElementById("businessAddreddBusinessPage").innerHTML=globalBusinessResults[i].address;
     document.getElementById("businessLastUpadateBusinessPage").innerHTML=globalBusinessResults[i].LastUpdate;
     document.getElementById("businessRank").innerHTML=globalBusinessResults[i].ratingFromReviewsTotal;
	 document.getElementById("BusinessNameGetReview").innerHTML=globalBusinessResults[i].name;
	// document.getElementById("businessNameAddReview").innerHTML=globalBusinessResults[i].name;
	// document.getElementById("businessAddreddAddReview").innerHTML=globalBusinessResults[i].address;
	 //document.getElementById("businessTypeAddReview").innerHTML=globalBusinessResults[i].type;
	document.getElementById("businessRank").innerHTML=globalBusinessResults[i].avgOverallRat;
	avgBusinessStars=globalBusinessResults[i].avgOverallRat;
	document.getElementById("totalRanker").innerHTML=globalBusinessResults[i].ratingFromReviewsTotal ;
	totalRatings = globalBusinessResults[i].ratingFromReviewsTotal;
	 oneRatings = globalBusinessResults[i].ratingFromReviewsOne;
	 twoRatings = globalBusinessResults[i].ratingFromReviewsTwo;
	 threeRatings = globalBusinessResults[i].ratingFromReviewsThree;
	 fourRatings = globalBusinessResults[i].ratingFromReviewsFour;
	 fiveRatings = globalBusinessResults[i].ratingFromReviewsFive;
	
	 oneRatings = oneRatings /parseFloat(totalRatings) * 100;
	 oneRatings = parseFloat(Math.round(oneRatings * 20) / 20).toFixed(2);
	 oneRatings = oneRatings+'%';
	  
	  document.getElementById("1RatersPercent").innerHTML = oneRatings ;
	 $('#BusinessOverall1Raters').css('width' , oneRatings);
	 
	  twoRatings = twoRatings /parseFloat(totalRatings) * 100;
	  twoRatings = parseFloat(Math.round(twoRatings * 20) / 20).toFixed(2);
	  twoRatings = twoRatings+'%';

	  document.getElementById("2RatersPercent").innerHTML = twoRatings ;
	 $('#BusinessOverall2Raters').css('width' , twoRatings);
	 
	  threeRatings = threeRatings /parseFloat(totalRatings) * 100;
	  threeRatings = parseFloat(Math.round(threeRatings * 20) / 20).toFixed(2);
	  threeRatings = threeRatings+'%';

	  document.getElementById("3RatersPercent").innerHTML = threeRatings ;
	 $('#BusinessOverall3Raters').css('width' , threeRatings);
	 
	  fourRatings = fourRatings /parseFloat(totalRatings) * 100;
	  fourRatings = parseFloat(Math.round(fourRatings * 20) / 20).toFixed(2);
	  fourRatings = fourRatings+'%';

	  document.getElementById("4RatersPercent").innerHTML = fourRatings ;
	 $('#BusinessOverall4Raters').css('width' , fourRatings);
	 
	 fiveRatings = fiveRatings /parseFloat(totalRatings) * 100;
	 fiveRatings = parseFloat(Math.round(fiveRatings * 20) / 20).toFixed(2);
	 fiveRatings = fiveRatings+'%';

	 document.getElementById("5RatersPercent").innerHTML = fiveRatings ;
	 $('#BusinessOverall5Raters').css('width' , fiveRatings);
	
	
		 $('#totalScoreStarBusiness').raty({
       half     : true,
      size     : 24,
      starHalf : 'star-half-big.png',
      starOff  : 'star-off-big.png',
      score: avgBusinessStars,
      readOnly: true,
        hints: ['', '','', '',''],
        starOn   : 'star-on-big.png'
     });

	longitude  =globalBusinessResults[i].geoLocCoords.coordinates[1];
	 latitude =globalBusinessResults[i].geoLocCoords.coordinates[0];
     
}

function populateThirdResult()
{
		var i = globalResultPage*4 -2;
		
		currentBusiness = i;
		getBusinessId = globalBusinessResults[i]._id;
	 document.getElementById("businessNameBusinessPage").innerHTML=globalBusinessResults[i].name;
     document.getElementById("businessTypeBusinessPage").innerHTML=globalBusinessResults[i].type;
     document.getElementById("businessAddreddBusinessPage").innerHTML=globalBusinessResults[i].address;
     document.getElementById("businessLastUpadateBusinessPage").innerHTML=globalBusinessResults[i].LastUpdate;
     document.getElementById("businessRank").innerHTML=globalBusinessResults[i].ratingFromReviewsTotal;
	 document.getElementById("BusinessNameGetReview").innerHTML=globalBusinessResults[i].name;
	// document.getElementById("businessNameAddReview").innerHTML=globalBusinessResults[i].name;
	// document.getElementById("businessAddreddAddReview").innerHTML=globalBusinessResults[i].address;
	// document.getElementById("businessTypeAddReview").innerHTML=globalBusinessResults[i].type;
	 document.getElementById("businessRank").innerHTML=globalBusinessResults[i].avgOverallRat;
	 document.getElementById("totalRanker").innerHTML=globalBusinessResults[i].ratingFromReviewsTotal;
	avgBusinessStars=globalBusinessResults[i].avgOverallRat;
	
	totalRatings = globalBusinessResults[i].ratingFromReviewsTotal;
	 oneRatings = globalBusinessResults[i].ratingFromReviewsOne;
	 twoRatings = globalBusinessResults[i].ratingFromReviewsTwo;
	 threeRatings = globalBusinessResults[i].ratingFromReviewsThree;
	 fourRatings = globalBusinessResults[i].ratingFromReviewsFour;
	 fiveRatings = globalBusinessResults[i].ratingFromReviewsFive;
	
	 oneRatings = oneRatings /parseFloat(totalRatings) * 100;
	 oneRatings = parseFloat(Math.round(oneRatings * 20) / 20).toFixed(2);
	  oneRatings = oneRatings+'%';
	  
	  document.getElementById("1RatersPercent").innerHTML = oneRatings ;
	 $('#BusinessOverall1Raters').css('width' , oneRatings);
	 
	  twoRatings = twoRatings /parseFloat(totalRatings) * 100;
	  twoRatings = parseFloat(Math.round(twoRatings * 20) / 20).toFixed(2);
	  twoRatings = twoRatings+'%';
	  
	  document.getElementById("2RatersPercent").innerHTML = twoRatings ;
	 $('#BusinessOverall2Raters').css('width' , twoRatings);
	 
	  threeRatings = threeRatings /parseFloat(totalRatings) * 100;
	  threeRatings = parseFloat(Math.round(threeRatings * 20) / 20).toFixed(2);
	  threeRatings = threeRatings+'%';

	  document.getElementById("3RatersPercent").innerHTML = threeRatings ;
	 $('#BusinessOverall3Raters').css('width' , threeRatings);
	 
	  fourRatings = fourRatings /parseFloat(totalRatings) * 100;
	  fourRatings = parseFloat(Math.round(fourRatings * 20) / 20).toFixed(2);
	  fourRatings = fourRatings+'%';

	  document.getElementById("4RatersPercent").innerHTML = fourRatings ;
	 $('#BusinessOverall4Raters').css('width' , fourRatings);
	 
	 fiveRatings = fiveRatings /parseFloat(totalRatings) * 100;
	 fiveRatings = parseFloat(Math.round(fiveRatings * 20) / 20).toFixed(2);
	 fiveRatings = fiveRatings+'%';

	 document.getElementById("5RatersPercent").innerHTML = fiveRatings ;
	 $('#BusinessOverall5Raters').css('width' , fiveRatings);
	
	
		$('#totalScoreStarBusiness').raty({
       half     : true,
      size     : 24,
      starHalf : 'star-half-big.png',
      starOff  : 'star-off-big.png',
      score: avgBusinessStars,
      readOnly: true,
        hints: ['', '','', '',''],
        starOn   : 'star-on-big.png'
     });

	 longitude  =globalBusinessResults[i].geoLocCoords.coordinates[1];
	 latitude =globalBusinessResults[i].geoLocCoords.coordinates[0];	
     
}

function populateFourthResult()
{
		var i = globalResultPage*4 -1;
		
		currentBusiness = i;
		getBusinessId = globalBusinessResults[i]._id;
	 document.getElementById("businessNameBusinessPage").innerHTML=globalBusinessResults[i].name;
     document.getElementById("businessTypeBusinessPage").innerHTML=globalBusinessResults[i].type;
     document.getElementById("businessAddreddBusinessPage").innerHTML=globalBusinessResults[i].address;
     document.getElementById("businessLastUpadateBusinessPage").innerHTML=globalBusinessResults[i].LastUpdate;
     document.getElementById("businessRank").innerHTML=globalBusinessResults[i].ratingFromReviewsTotal;
	 document.getElementById("BusinessNameGetReview").innerHTML=globalBusinessResults[i].name;
	// document.getElementById("businessNameAddReview").innerHTML=globalBusinessResults[i].name;
	// document.getElementById("businessAddreddAddReview").innerHTML=globalBusinessResults[i].address;
	// document.getElementById("businessTypeAddReview").innerHTML=globalBusinessResults[i].type;
	 document.getElementById("businessRank").innerHTML=globalBusinessResults[i].avgOverallRat;
	 document.getElementById("totalRanker").innerHTML=globalBusinessResults[i].ratingFromReviewsTotal;
	// document.getElementById("5RatersPercent").innerHTML=globalBusinessResults[i].ratingFromReviewsFive;
	// document.getElementById("4RatersPercent").innerHTML=globalBusinessResults[i].ratingFromReviewsFour;
	// document.getElementById("3RatersPercent").innerHTML=globalBusinessResults[i].ratingFromReviewsThree;
    // document.getElementById("2RatersPercent").innerHTML=globalBusinessResults[i].ratingFromReviewsTwo;
	// document.getElementById("1RatersPercent").innerHTML=globalBusinessResults[i].ratingFromReviewsOne
	 
	 
	 totalRatings = globalBusinessResults[i].ratingFromReviewsTotal;
	 oneRatings = globalBusinessResults[i].ratingFromReviewsOne;
	 twoRatings = globalBusinessResults[i].ratingFromReviewsTwo;
	 threeRatings = globalBusinessResults[i].ratingFromReviewsThree;
	 fourRatings = globalBusinessResults[i].ratingFromReviewsFour;
	 fiveRatings = globalBusinessResults[i].ratingFromReviewsFive;
	 
	 
	  oneRatings = oneRatings /parseFloat(totalRatings) * 100;
	  oneRatings = parseFloat(Math.round(oneRatings * 20) / 20).toFixed(2);
	  oneRatings = oneRatings+'%';
	  
	  document.getElementById("1RatersPercent").innerHTML = oneRatings ;
	 $('#BusinessOverall1Raters').css('width' , oneRatings);
	 
	  twoRatings = twoRatings /parseFloat(totalRatings) * 100;
	  twoRatings = parseFloat(Math.round(twoRatings * 20) / 20).toFixed(2);
	  twoRatings = twoRatings+'%';

	  document.getElementById("2RatersPercent").innerHTML = twoRatings ;
	 $('#BusinessOverall2Raters').css('width' , twoRatings);
	 
	  threeRatings = threeRatings /parseFloat(totalRatings) * 100;
	  threeRatings = parseFloat(Math.round(threeRatings * 20) / 20).toFixed(2);
	  threeRatings = threeRatings+'%';

	  document.getElementById("3RatersPercent").innerHTML = threeRatings ;
	 $('#BusinessOverall3Raters').css('width' , threeRatings);
	 
	  fourRatings = fourRatings /parseFloat(totalRatings) * 100;
	  fourRatings = parseFloat(Math.round(fourRatings * 20) / 20).toFixed(2);
	  fourRatings = fourRatings+'%';

	  document.getElementById("4RatersPercent").innerHTML = fourRatings ;
	 $('#BusinessOverall4Raters').css('width' , fourRatings);
	 
	 fiveRatings = fiveRatings /parseFloat(totalRatings) * 100;
	 fiveRatings = parseFloat(Math.round(fiveRatings * 20) / 20).toFixed(2);
	 fiveRatings = fiveRatings+'%';

	 document.getElementById("5RatersPercent").innerHTML = fiveRatings ;
	 $('#BusinessOverall5Raters').css('width' , fiveRatings);
	 
	 
	avgBusinessStars=globalBusinessResults[i].avgOverallRat;
		$('#totalScoreStarBusiness').raty({
       half     : true,
      size     : 24,
      starHalf : 'star-half-big.png',
      starOff  : 'star-off-big.png',
      score: avgBusinessStars,
      readOnly: true,
        hints: ['', '','', '',''],
        starOn   : 'star-on-big.png'
     });

		longitude  =globalBusinessResults[i].geoLocCoords.coordinates[1];
	 latitude =globalBusinessResults[i].geoLocCoords.coordinates[0];
 }    


 // ========================== meet me up ========================================
 var text;
 var subject
 $(document).on('click', '#sendButtonMeetMeUp', function(){
 
  subject= document.getElementById("subjectOfMeetMeUp").value;
  text= document.getElementById("contentMeetMeUp").value;

 MeetMeUp(text, subject);
 document.getElementById('subjectOfMeetMeUp').value='';
document.getElementById('contentMeetMeUp').value='';
	$("#e10").select2('val', '');
	friendsId = [];
	
 })
 
	
 
 
function MeetMeUp(text, subject)
{



var businessId = getBusinessId;

console.log('Friends  in meet me up is : '+friendsId);
	console.log('Subject in meet me up is : '+subject);

	ajaxMeetMeUpCallback(text, subject, businessId);
	
	
  }
  
  function ajaxMeetMeUpCallback(text, subject, businessId)
  {
			console.log('text: '+text+' subject: '+subject);
			$.ajax({
            type: "POST",
            url: '/business/MeetMeUpInvite/'+businessId, 
            data: '{"FriendsArr" : "'+friendsId+'","TextInput" : "'+text+'","Subject" : "'+subject+'"}',
			contentType: "application/json",
            dataType: "json",
              
            success:function(result)					//DC
            {
															//DC
            }
            ,
            failure:function(err)
            {
			alert(err);
	    }
            
        });
  }
	    //-------------------------FindNearestBusiness---------------------------------------

function getNearestBusiness()
{

if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
}


function showPosition(position)
  {
  	
	var longitude = position.coords.longitude;
	var latitude = position.coords.latitude;
	globalIndex = 0;
	globalResultPage = 0;
	
	$.ajax({
            type: "POST",
            url: "/businesses/geofilter", 
            data: '{"longitude" : "'+latitude+'","latitude" : "'+longitude+'"}',
	    contentType: "application/json",
            dataType: "json",
              
            success:function(result)					//DC
            {
				console.log(JSON.stringify(result));

				if(result=='')
				{
					alert("nothing nearby");
				}
				else
				{
					globalBusinessResults=result;
					populateSearchResults();
					var loc = location.href;
					var splitter = loc.split('#');
					var first = splitter[0];
					var loca = first.concat("#searchResults")
					window.location = loca; 
				}
															//DC
            }
            ,
            failure:function(err)
            {
			
	    }
            
        });
	
  }  
  	    //-------------------------General---------------------------------------
 

function toggleFacebook()
{
	var userId = globalUser._id;
	var FaceStat = globalUser.EnableFacebookAccess;
	var temp;
	
	if(FaceStat == "Yes")
	{	
		temp = "No";
	}
	else
	{
		temp = "Yes";
	}

	$.ajax({
            type: "POST",
            url: '/user/toggleFacebookStatus/'+userId, 
            data: '{"FaceStat" : "'+temp+'"}',
	        contentType: "application/json",
            dataType: "json",
              
            success:function(result)
            {

				if(FaceStat == "Yes")
				{
					globalUser.EnableFacebookAccess = "No";
				}
				else
				{
					globalUser.EnableFacebookAccess = "Yes";
					
				}
				alert("Your Facebook status has been successfuly changed");
                    
            }
            ,
            failure:function(err)
            {

                     alert(err);
						
			}
            
        });
}


function changePassword()
{

var password =  document.getElementById("changeNewPasswordCP").value;
var repassword =  document.getElementById("changeNewPasswordConfirmCP").value;

	if ((password.length ==0) || (repassword.length ==0))
	{
			alert("Fields can't be empty");
	}
	
	else if(password !== repassword)
	{
		alert("enter the same password DUMMY");
		document.getElementById("changeNewPasswordCP").value = '';
		document.getElementById("changeNewPasswordConfirmCP").value ='';
	}
	else
	{

		$.ajax({
				type: "POST",
				url: '/user/UpdatePasswordInDB/'+globalUser._id, 
				data: '{"Password" : "'+password+'","VerifyPassword" : "'+repassword+'"}',
				contentType: "application/json",
				dataType: "json",
				  
				success:function(result)
				{
					if(result.Status !== "Success")
					{
						alert("Something has gone terribly terribly wrong");
						document.getElementById("changeNewPasswordCP").value = '';
						document.getElementById("changeNewPasswordConfirmCP").value ='';
						
					}
					else
					{
						alert("Enjoy your new password");
						document.getElementById("changeNewPasswordCP").value = '';
						document.getElementById("changeNewPasswordConfirmCP").value ='';
			
					}
				}
				,
				failure:function(err)
				{
					alert('Wrong Name or Password');
					document.getElementById("changeNewPasswordCP").value = '';
					document.getElementById("changeNewPasswordConfirmCP").value ='';
					alert(err);
				}
				
			});
	}

}


$(document).on('click','.logoutPressed', function()
{
	logout();
});

function logout()
{
	var loc =location.href;
	var splitter = loc.split("#");
	var first = splitter[0];
	var loca = first; //change to reguler
	$.ajax({
            type: "POST",
            url: '/Home/logout', 
            data: '',
	        contentType: "application/json",
            dataType: "json",
              
            success:function(result)
            {
				window.location  = loca;
				
            }
            ,
            failure:function(err)
            {
				window.location  = loca;
			}
            
        });
}

var addresscp;
var addressflag;

function changeAddress()
{
	var userId = globalUser._id;
	var address =  document.getElementById("userNewAddressCP").value;

	
	if(address.length == 0)
	{
		alert("Field can't be empty");
		document.getElementById("userNewAddressCP").value = '';
	}
	else
	{
		$.ajax({
				type: "POST",
				url: '/user/changeAddressOfUser/'+userId, 
				data: '{"Address" : "'+address+'"}',
				contentType: "application/json",
				dataType: "json",
				  
				success:function(result)
				{
					if(result.Status !== "Sucsess")
					{
						alert("Something has gone terribly terribly wrong");
						document.getElementById("userNewAddressCP").value = '';						
					}
					else
					{
						alert("Address was changed");
						document.getElementById("userNewAddressCP").value = '';		
						addresscp = address;// document.getElementById("userNewAddressCP").value;
						addressflag = 1;
						document.getElementById("profileAddr").innerHTML=addresscp;
					}
				}
				,
				failure:function(err)
				{
					alert('Wrong address');
					document.getElementById("userNewAddressCP").value = '';
					alert(err);
				}
				
			});
	}
}

  	    //-------------------------User--------------------------------------

var globalUser;
var backupUser; 

var globalFriendHash; //LA
var allFriendsCounter; 
var favoriteFriendsCounter;
var regularFriendsCounter;
function login()
{
    var email = document.getElementById("userNameLoginPage").value;
    var password = document.getElementById("passwordLoginPage").value;
    var loc = location.href;
    var col ="#homePage";
    var loca = loc.concat(col);    

 $.ajax({
            type: "POST",
            url: "/login", 
            data: '{"username" : "'+email+'","password" : "'+password+'"}',
	    contentType: "application/json",
            dataType: "json",
              
            success:function(result)
            {
			//notifyLoginError();
				if((result.message==="Incorrect username.")||(result.message==="Incorrect password.")||(result.message==="Missing credentials"))
				{
					notifyLoginError(result.message);
				}
				else
				{
		
                    globalUser=result;
					 backupUser = result;
					 userId = globalUser._id;
					
					
				    $('#loginModal').modal('hide');
					window.location = loca;   
					cleanFormSignIn();
				}
            }
            ,
            failure:function(err)
            {
				alert('Wrong Name or Password');
                 alert(err);
			}
            
        });
		
		
}

function notifyLoginError(error)
{
cleanFormSignIn();
document.getElementById("failLogin").innerHTML = error;
document.getElementById("failLogin").style.visibility='visible';
}

function registration()
{
 
  var firstName = document.getElementById("userFirstNameRegisterPage").value;
  var lastName = document.getElementById("userLastNameRegisterPage").value;
  var address = document.getElementById("userAddressRegisterPage").value;
  var userEmail = document.getElementById("userEmailRegisterPage").value;
  var birthday = document.getElementById("userBirthdayRegisterPage").value;
  var gender = document.getElementById("userGenderChoose").value;
  var password = document.getElementById("userPasswordRegisterPage").value;
  var repassword = document.getElementById("userRePasswordRegisterPage").value;
  var securityquestion = document.getElementById("userSecurityQuestionRegisterPage").value;
  var securityanswer = document.getElementById("userSecurityQuestionAnswarRegisterPage").value;
  var type="Regular";
  var faceboook = "No";
  var facebookUrl = "www.facebook.com";
  var friendsList =[];
  var FriendsBusinessList = [];
  var RankedBusinessesQuantity = 0;
  
  if((firstName=="")||(lastName=="")||(address=="")||(userEmail=="")||(birthday=="")||(gender=="")||(password=="")||(repassword=="")||(securityquestion=="")||(securityanswer==""))
	{
	  alert("Not all fields filled");
	  notifyRegisterError("Not all fields filled.");
	}
	
	
  else if(password !== repassword)
  {
	  alert("You must enter the same passwords");
      notifyRegisterError("Enter the same password!");
  }
  
  else if(dateIsLegal(birthday, 90) == false)
  {
	alert ("You must choose date above 1924 years ago, and not from the future");
	notifyRegisterError("Enter legit date!");
  }
  else
  {
  
  $.ajax({
            type: "POST",
            url: '/SignUp/"'+userEmail+'"', 
            data: '{"Email" : "'+userEmail+'","FirstName" : "'+firstName+'","LastName" : "'+lastName+'","Address" : "'+address+'","Birthday" : "'+birthday+'","SecQuesId" : "'+securityquestion+'","AnsOfSecQues" : "'+securityanswer+'","Type" : "'+type+'","EnableFacebookAccess" : "'+faceboook+'","FacebookUserPageURL" : "'+facebookUrl+'","FriendsList" : "'+friendsList+'","FriendsBusinessList" : "'+FriendsBusinessList+'","RankedBusinessesQuantity" : "'+RankedBusinessesQuantity+'","Password" : "'+password+'","VerifyPasswor" : "'+repassword+'"}',
	    contentType: "application/json",
            dataType: "json",
              
            success:function(result)
            {
			
				if(result.Status == 'Success')
				{
					$('#registerModal').modal('hide');
					cleanRegistration();
					alert("You have been registered :-)");
				}
				else 
				{
					if((result.Status == 'Failure') && (result.Error == 'User with same E-Mail already exists in database'))
						{
							alert("Email already taken");
							notifyRegisterError('Email already in use');
						}
						else if((result.Status == 'Failure')  && (result.Error !== 'User with same E-Mail already exists in database'))
						{
							cleanRegistration();
							alert("Something went terribly terribly wrong..");
							notifyRegisterError("Something went terribly terribly wrong..");
						}
				}
			
		//alert(JSON.stringify(result));    
			
            }
            ,
            failure:function(err)
            {
				notifyRegisterError('There was a problem, try again');
			}
            
        });
  
  }
  
  
}


function dateIsLegal(value, year)
{
	var legal;
	
	legal = checkDateAfter3yearsAgo(value, year);
	
	if (legal == false)
	{
		return false;
		
	}
	
	legal = charckNotInFutureDate(value);
	
	if(legal== false)
	{
		return false;
	
	}
	
	return true;
}


function checkDateAfter3yearsAgo(value, year)
{
	var today = new Date();
 	var yyyy = today.getFullYear()-year;	
	
	var myDate = new Date(value);
	console.log(value);
	var valYear = myDate.getFullYear();
	if (valYear <= yyyy)
	{
		console.log("Wayyyy to long ago");
		return false;
	}
	
	return true;

}
function charckNotInFutureDate(value)
{

	var now = new Date();
    var target = new Date(value);
	var ret;
    console.log(now);
	console.log(target);
	
	if (now>= target) {
	  // selected date is in the past
	  console.log("in the past");
	  return true;
	}
	
	console.log("in the futre");
	return false;
	
}


function notifyRegisterError(error)
{
document.getElementById("failRegister").innerHTML = error;
document.getElementById("failRegister").style.visibility='visible';
}


var globalSecQuestion;
var globalSecQuestionEmail;
function recoverPassword()
{
      var email = document.getElementById("emailToRecoverPasswordInRecoveryPage").value;
		
	   if(email == '')
		{
			alert("You must enter an email");
			cleanEnterEmailForSecurityForm();
		}
		else
		{
		
      $.ajax({
            type: "GET",
           
	        url: '/user/RetriveQesByMail/'+email, 
              
            success:function(result)
            {
			
				if((result.Status == 'No question found for user') || (result.Status == 'Eror finding the user.'))
				{
					alert("Email not found");
					cleanEnterEmailForSecurityForm();
				}
				else
				{
					globalSecQuestion = result;
					doSomething3();
					globalSecQuestionEmail = email;
					$('#securityQuestionAnswarPage').attr('placeholder',globalSecQuestion);
				}
		
            }
            ,
            failure:function(err)
            {
			alert('There was a problem, try again');
			}
            
        });
        }

}


function answerSecurityQuestion()
{
	var securityAnswer = document.getElementById("securityAnswarQuestionAnswarPage").value;

	if (securityAnswer == '')
	{
		alert("You must enter an answer");
		cleanSecurityQuestion();
	}
	else
	{
	var Email = globalSecQuestionEmail;
	//alert(Email);
	
		$.ajax({
            type: "POST",
            url: '/user/CheckForCorrectAnswer/'+Email, 
            data: '{"Answer" : "'+securityAnswer+'"}',
	        contentType: "application/json",
            dataType: "json",
              
            success:function(result)
            {
			
				if (result.Status != "Success")
				{
					alert("You don't know the answer to your own question?");
					cleanSecurityQuestion();
				}
				else
				{
					doSomething2();
					cleanSecurityQuestion();
				}
            }
            ,
            failure:function(err)
            {
			alert('Wrong Name or Password');
                        alert(err);
	    }
            
        });
	}
	
	
}

function changeRecoveryPassword()
{
	var password = document.getElementById('userNewPasswordRecoverPwdPage').value;
	var repassword = document.getElementById('userConfirmNewPassworRecoverPwdPage').value;
	var Email = globalSecQuestionEmail;
	
	if((password !== repassword) || ((password == '') || (repassword == '')))
	{
		alert("Fields were not filled correctly");
		cleanNewPasswordForm();
	}
	
	
	else
	{
		$.ajax({
            type: "POST",
            url: '/user/changePasswordInDB/'+Email, 
            data: '{"Password" : "'+password+'","VerifyPassword" : "'+repassword+'"}',
	        contentType: "application/json",
            dataType: "json",
              
            success:function(result)
            {
				if(result.Status !== "Success")
				{
					alert("Something has gone terribly terribly wrong");
					$('#RecoverPwdModal').modal('hide');
					cleanNewPasswordForm();
				}
				else
				{
					alert("Enjoy your new password");
					$('#RecoverPwdModal').modal('hide');
					cleanNewPasswordForm();
				}
            }
            ,
            failure:function(err)
            {
			alert('Wrong Name or Password');
                        alert(err);
	    }
            
        });
	}
	
}


//--------------------------------------Reviews------------------------------------


var globalReviews;
var globalReviewsIndex;
var currentBid;
function getReviews(bid)
{

globalReviewsIndex = 0;

var businessID = globalBusinessResults[currentBusiness]._id;
currentBid = businessID;
console.log('in getReviews '+businessID);

$.ajax({
            type: "GET",
           
	        url: '/reviews/'+businessID,  
			contentType: "application/json",
            dataType: "json",
            
			
			 success:function(result)
            {
					
				globalReviews = result;
				console.log(JSON.stringify(result));
				populateReviews();
				calculateFriendsScoreOfBusiness();//la
	
            }
            ,
            failure:function(err)
            {
			alert('There was a problem, try again');
	    }
            
        });

}



var globalOverallReviewerRating;
var globalPriceReviewerRating;
var globalParkingReviewerRating;
var globalQualityReviewerRating;

function populateReviews()
{

		//if (typeof variable === 'undefined') {
			//globalOverallReviewerRating = 0;
	//		 globalPriceReviewerRating = 0;
	//		 globalParkingReviewerRating = 0;
		//	 globalQualityReviewerRating =0;
		//}
		
		//else{
			 document.getElementById("reviewerNameGetReviewPage").innerHTML=globalReviews[globalReviewsIndex].ReviewerName;
		   //  document.getElementById("reviewrEmailGetReviewPage").innerHTML= 
		  //   document.getElementById("reviewrBirthdayGetReviewPage").innerHTML= 
		 //   document.getElementById("businessRank").innerHTML= 
			 globalOverallReviewerRating = globalReviews[globalReviewsIndex].ReviewDetails.OverallRate;
			 globalPriceReviewerRating = globalReviews[globalReviewsIndex].ReviewDetails.PriceRate;
			 globalParkingReviewerRating = globalReviews[globalReviewsIndex].ReviewDetails.ParkingRate;
			 globalQualityReviewerRating = globalReviews[globalReviewsIndex].ReviewDetails.QualityRate;

			
			// document.getElementById("score-price").innerHTML= 
		  //   document.getElementById("score-parking").innerHTML= 
		 //    document.getElementById("score-quality").innerHTML= 
			document.getElementById("getReviewReviewrThought").innerHTML= JSON.stringify(globalReviews[globalReviewsIndex].ReviewDetails.Comments);
		//}
	
}

function deleteReview()
{

var reviewId = globalReviews[globalReviewsIndex].ReviewDetails._id;

$.ajax({
            type: "DELETE",
            url: '/review/'+reviewId, 
            data: '',
	        contentType: "application/json",
            dataType: "json",
              
            success:function(result)
            {				
					alert("Your Review Has been Deleted");
					$("myReviewAllowDeleteBuuton").addClass("disabled");
					$("myReviewAllowDeleteBuuton").addClass("hidden");
					getReviews(globalReviews[globalReviewsIndex].ReviewDetails.BusinessId);

					var loc = location.href;
					var splitter = loc.split('#');
					var first = splitter[0];
					var loca = first.concat("#busienssPage")
			window.location = loca; 
					
		
				
            }
            ,
            failure:function(err)
            {
			alert('Wrong Name or Password');
                        alert(err);
	    }
            
        });


}





var overall = 0;
var price = 0;
var quality = 0;
var parking = 0;
function addReview()
{
	var comment;
	var ReviewerId = globalUser._id;
	var ReviewerFirstName = globalUser.FirstName;
	var ReviewerLastName = globalUser.LastName;
	var BusinessId = globalBusinessResults[currentBusiness]._id;

	var visitDate = document.getElementById("viditDateAddReview").value;
	console.log(visitDate);
	comment = document.getElementById("userCommentToAdd").value;
	
	if (!$.trim($("#userCommentToAdd").val()))
	{
		// textarea is empty or contains only white-space
		comment = " ";
	}
	
	if(overall == 0 || price== 0 || quality==0 || parking==0)
	{
		alert("You must rate all categories");
		cleanAddReview();
	}
	else if(dateIsLegal(visitDate,4) == false)
	{
		alert("Please enter legal date");
		cleanAddReview();
	}
	//overall = document.getElementById("addScore-overall").value;
	else
	{
		$.ajax({
				type: "POST",
				url: "/reviews/addReview", 
				data: '{"addScore-overall" : "'+overall+'","addScore-quality" : "'+quality+'","addScore-price" : "'+price+'","addScore-parking" : "'+parking+'","userCommentToAdd" : "'+comment+'","BusinessId" : "'+BusinessId+'","ReviewerId" : "'+ReviewerId+'","ReviewerFirstName" : "'+ReviewerFirstName+'","ReviewerLastName" : "'+ReviewerLastName+'"}',
			contentType: "application/json",
				dataType: "json",
				  
				success:function(result)
				{
					alert("Thanks for your review");
				}
				,
				failure:function(err)
				{
				alert(':(');
				}
				
			});
		
		var loc = location.href;
		var splitter = loc.split('#');
		var first = splitter[0];
		var loca = first.concat("#busienssPage")    //DC
		window.location = loca;
	}
	
}

//---------------------FRIENDS ZONE ----------------------------------

function cleanAddReview()
{
	//document.getElementById("viditDateAddReview").reset();
	document.getElementById("thoutsOfReviewer").reset();
	$('#addScore-overall').raty('reload');
	$('#addScore-parking').raty('reload');
	$('#addScore-price').raty('reload');
	$('#addScore-quality').raty('reload');
	overall = 0;
    price = 0;
	quality=0;
	parking=0;
}

$(document).ready(function() {
	
	window.fbAsyncInit = function() {
		FB.init({
		appId      : '607656255997013',
		cookie     : true,  // enable cookies to allow the server to access 
							// the session
		xfbml      : true,  // parse social plugins on this page
		version    : 'v2.0' // use version 2.0
	  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  //FB.getLoginStatus(function(response) {
  //  statusChangeCallback(response);
 // });

  
  
    fbFunction = function (globalUser, ajaxCallback) {
	
			if( globalUser.EnableFacebookAccess == "No"){
				alert("You did not allowed us to use your facebook account.\nYou can change this setting via control panel");
			}
			
			else{
				
				var userId= globalUser._id;
				
				
					FB.login(function(response) {
					
														 console.log("start fb get friends and user data-------------------------------------------------------------------------------------\n");

							   if (response.authResponse) {
									 FB.api('/me', function(response) {
										meFacebookUrl = JSON.stringify(response.link);
										console.log("my facebook url is : "+meFacebookUrl+"\n");
									  });
									 FB.api('/me/friends', function(response) {
										
										var i;
										
										for (i=0; i<(response.data).length; i++)
										{
											var myFriendsIdI = 'https://www.facebook.com/app_scoped_user_id/'+response.data[i].id+'/';
											myFriendsId.push(myFriendsIdI);
											//console.log("friend"+i+"id is:\n" +myFriendsIdI);
										}
										
										for(i=0; i<myFriendsId.length; i++)
										{
											console.log("friend "+i+" is:\n" +myFriendsId[i]+'\n');
										}
									 console.log("end fb get friends and user data-------------------------------------------------------------------------------------\n");
									 	flag = 1;								
															 ajaxCallback();
															 
															
																
																

									   //console.log('info achived is:\n\n' + (response.data).length);
									 });
									 
									 									
									

							   } else {
								 console.log('User cancelled login or did not fully authorize.');
							   }
							   
					 }, {scope: 'user_friends '});
					 
			 
			 }
		  }
  };


// Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
	
});

var fbFunction;
var myFriendsId =[];
var meFacebookUrl;
var flag = 0;

function ajaxCallback()
{
		
	console.log("start ajax-------------------------------------------------------------------------------------\n");
									 
									console.log('{"FriendsList" : '+myFriendsId+',"userFacebookURL" : '+meFacebookUrl+'}');
									 
									 var userId = globalUser._id;
									 var info = JSON.stringify(myFriendsId); 
								//	 myFriendsId =[];
									 
									 $.ajax({
												type: "POST",
												url: '/reviews/syncwithfacebook/'+userId, 
												data: '{"FriendsList" : '+info+' ,"userFacebookURL" : '+meFacebookUrl+'}',
												contentType: "application/json",
												dataType: "json",
												  
												success:function(result)
												{
													if((result.Status == "Faliure inserting new friends to array.")||(result.Status == "Faliure, user id not found"))
													{
														alert("Something has gone terribly terribly wrong");
														myFriendsId =[];
													}
													else
													{

														globalUser.FacebookUserPageURL = meFacebookUrl;
														globalUser.FriendsList = result;
														console.log(JSON.stringify(result));
														var newInfo = JSON.stringify(result);
														//ajax to update friend list
																		
																		
																		
																	 $.ajax({
																		type: "POST",
																		url: '/reviews/updateFriendsList/'+userId, 
																		data: '{"FriendsList" : '+newInfo+'}',
																		contentType: "application/json",
																		dataType: "json",
																		  
																		success:function(result)
																		{
																			if(result.Status == "Sucsess")
																			{
																				myFriendsId =[];
																			}
																			else
																			{
																				alert("friend list not updated in db");
																				globalUser.FriendsList =[];
																			}
																		}
																		,
																		failure:function(err)
																		{
																			alert(err);
																			globalUser.FriendsList=[];
																		}
																		
															});//end ajax
																												
														myFriendsId =[];
														fillUserFriendsInitializeStage();
													}
												}
												,
												failure:function(err)
												{
													alert(err);
												}
												
									});//end ajax
									
									
									
									myFriendsId =[];
								 			console.log("end ajax-------------------------------------------------------------------------------------\n");
}

$(document).on('click', '#fbLogin', function()
{
	 
	 		fbFunction(globalUser, ajaxCallback);
});

  
$(document).on('click', '#changToFavBtn', function(e)
{

    if ( $(this).hasClass("noClick") ) 
    {
        e.preventDefault();
    } 
    else 
    {

        $(this).addClass("noClick");
        //Your code continues here
        //Remember to remove the unclickable class when you want it to run again.

         var allSelectedUserId=[];
         var allSelectedUserImgId =[];
         var allSelectedUserCBId =[];
	
		var jsonArr=[];
    
		var k =0;
         $("#regularFriendForm input:checkbox:checked").each(function() {
				
				
                allSelectedUserCBId.push(this.id);
                
                var idImg = this.id+"_img";          
                allSelectedUserImgId.push(idImg);

                var splitter = idImg.split("_"); 
                var userId = splitter[2];    

				var tempo = {
                       ID: userId
                   }				
                allSelectedUserId[k] = userId;
				k++;
				jsonArr.push(tempo);
                console.log("Pushed to change from Regular to Fevorite - user id:"+userId);

        
         });
		 
		 
		 var elem = $(this);
        setTimeout(function() {
            elem.removeClass("noClick");
        }, 1000);
    }
	
	
            //here ajax call will be where:
                //1 - if faulute, change won't be made and alert will be presented
                //2 - if success :
                        //a - if error (not logeed in) change won't be made
                       // b - if success change will be made 

		
		var userId = globalUser._id;
		var chabgeType = "Fav";

		
		$.ajax({
            type: "PUT",
			url: '/friends/favoritesstatus/'+userId, 

            data: '{"FriendsID" : "'+allSelectedUserId+'","Type" : "'+chabgeType+'"}',
	        contentType: "application/json",
            dataType: "json",
              
            success:function(result)
            {
			
				if(result.Status =="Success")
				{
                    console.log("change to favorite length of selected:"+allSelectedUserCBId.length);
					favoriteFriendsCounter += allSelectedUserCBId.length;
					regularFriendsCounter -= allSelectedUserCBId.length;
					doChangesFromRegularToFavoriteForSelectedFriends(allSelectedUserId,allSelectedUserImgId,allSelectedUserCBId,"Fav"); 
        
				}
				else
				{
					alert('Something went wrong, try later...');
				}
        
            }
            ,
            failure:function(err)
            {
			    alert('Something went wrong, try later...');
	        }
            
        });
		
		
	
	            
});

$(document).on('click', '#changToRegBtn', function(e)
{
 
    if ( $(this).hasClass("noClick") ) 
    {
        e.preventDefault();
    } 
    else 
    {
		
        $(this).addClass("noClick");
        //Your code continues here
        //Remember to remove the unclickable class when you want it to run again.

        var allSelectedUserId=[];
        var allSelectedUserImgId =[];
        var allSelectedUserCBId =[];
    
		var jsonArr=[];

		var k = 0;
        $("#favoriteFriendForm input:checkbox:checked").each(function() {
       
            allSelectedUserCBId.push(this.id);

             var idImg = this.id+"_img";          
             allSelectedUserImgId.push(idImg);

             var splitter = idImg.split("_"); 
             var userId = splitter[2];    

			 var tempo = {
                       ID: userId
                   }				
			jsonArr.push(tempo);			 
             allSelectedUserId[k] = userId;
			 k++;
             console.log("Pushed to change from Favorite to Regular - user id:"+userId);

         });
    
		var elem = $(this);
        setTimeout(function() {
            elem.removeClass("noClick");
        }, 1000);
    
	}
        //here ajax call will be where:
            //1 - if faulute, change won't be made and alert will be presented
            //2 - if success :
                    //a - if error (not logeed in) change won't be made
                   // b - if success change will be made 

		var userId = globalUser._id;
		var chabgeType = "Reg";

    	$.ajax({
            type: "PUT",
			url: '/friends/favoritesstatus/'+userId, 

            data: '{"FriendsID" : "'+allSelectedUserId+'","Type" : "'+chabgeType+'"}',
	        contentType: "application/json",
            dataType: "json",
              
            success:function(result)
            {
				if(result.Status =="Success")
				{
					console.log("change to regular length of selected:"+allSelectedUserCBId.length);
					favoriteFriendsCounter -= allSelectedUserCBId.length;
					regularFriendsCounter += allSelectedUserCBId.length;
					doChangesFromRegularToFavoriteForSelectedFriends(allSelectedUserId,allSelectedUserImgId,allSelectedUserCBId,"Reg"); 
				}
				else
				{
					alert('Something went wrong, try later...');
				}
        
            }
            ,
            failure:function(err)
            {
			    alert('Something went wrong, try later...');
	        }
            
        });
		
		
    
});

function doChangesFromRegularToFavoriteForSelectedFriends(allSelectedUserId,allSelectedUserImgId,allSelectedUserCBId,toStatus)
{
    changeStatusOfSelectedFriendsLocally(allSelectedUserId,toStatus);
    hideCBAndNameBeforeDoingAnimation(allSelectedUserCBId);
    animateSelectedFriend(allSelectedUserImgId);
    setTimeout(function() 
    {
        fillUserFriendsInitializeStage();
    }, 500);
    
    
}

function changeStatusOfSelectedFriendsLocally(allSelectedUserId,toStatus)
{
//    var userFriends = u0.FriendsList;
    
    var indexOnGlobalUserFriendList = 0;
    
    allSelectedUserId.forEach(function(entry)
    {
        while (globalUser.FriendsList[indexOnGlobalUserFriendList].ID != entry)
        {
            indexOnGlobalUserFriendList++;
        }
        globalUser.FriendsList[indexOnGlobalUserFriendList].Type = toStatus;
    });
}

function hideCBAndNameBeforeDoingAnimation(checkBoxToRemove)
{
    checkBoxToRemove.forEach(function(entry)
    {
        var checkBoxToChange = document.getElementById(entry);

        var h4Id = entry+"_h4";
        var h4ToChange = document.getElementById(h4Id);

        h4ToChange.style.display = 'none';
        h4ToChange.setAttribute("disabled",true);
        checkBoxToChange.style.display = 'none';
        checkBoxToChange.setAttribute("disabled", true);
        
    });
}

function animateSelectedFriend(selectedFriendImgToEffect)
{
    selectedFriendImgToEffect.forEach(function(entry)
    {
        $("#"+entry).effect("fade","slow");
    });
}
 
//----------------profile function - present user profile ------------------------------

$(document).on('click','.popoverId', function()
{
	var addToPut;
	if (addressflag==1)
	{
		addToPut = addresscp;
		document.getElementById("profileAddr").innerHTML=addresscp;

		//alert(addToPut);
	}
	
	else
	{
		addToPut=globalUser.Address;
	}
	
      $('.popoverId').popover({
        html: true,
        
		content: function() {
							   var message = '<div class="container">'+
									'<div class="row">'+
										'<div class="col-xs-12 col-sm-6 col-md-4">'+
											'<div class="well well-sm">'+
												'<div class="row">'+
													'<div class="col-sm-6 col-md-4">'+
														'<br><br><img src="http://placehold.it/380x500" alt="" class="img-rounded img-responsive" />'+
													'</div>'+
													'<div class="col-sm-6 col-md-8">'+
														'<h3>'+globalUser.FirstName+' '+globalUser.LastName+'</h3>'+
														'<p><i class="glyphicon glyphicon-map-marker"></i>&nbsp'+
														'<cite id="profileAddr">'+addToPut+'</cite>'+'<br>'+
														'<i class="glyphicon glyphicon-envelope"></i>&nbsp '+ globalUser.Email+
															'<br />'+
															'<i class="glyphicon glyphicon-gift"></i>&nbsp'+ globalUser.Birthday+'</p>'+
															'<br />'+'<br />'+
															'<div class="btn-group">'+
															'<button type="button" class="btn btn-primary"><a href="#controlPanel"><font color="white">Control Panel</font></a></button>'+

														'</div>'+
													'</div>'+
												'</div>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</div>';
								 return message;
						    }
		
        });
});



