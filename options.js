$(function(){

    // firts update ui-limit from storage
   // Get the existing limit from storage
   chrome.storage.local.get(['limit'], function(work) {
     $('#limit').val(work.limit);
   })
 
   // select limit button of click event from user
   $('#timeLimit').click(function(){
     // Get the existing time value from input box
     let limit = $('#limit').val();
     // if there's total
     if(limit){
        // add this new time into storage 
        chrome.storage.local.set({'limit': limit}, function(){
        //close();
            
     });
   }
   else {
    alert("Not valid!");
   };
 })
 
 
   // select reset button of click event from user
   $('#resetTime').click(function(){
      // Set the existing time from storage to zero
        // add this new time into storage 
     chrome.storage.local.set({'limit': "00:00:00"}, function(){
       close();
     });  
   });
 
   })
   function isValidTime(str) {
    // Regex to check valid
    // time in 24-hour format
    let regex = new RegExp(/^([01]\d|2[0-3]):([0-5][0-9]):([0-5][0-9])(:|\.)\d{1,2}?$/);
 
    //  if str
    // is empty return false
    if (str == null) {
        return "false";
    }
 
    // Return true if the str
    // matched the ReGex
    if (regex.test(str) == true) {
        return "true";
    }
    else {
        return "false";
    }
}