
$(document).ready(function(){

  var authenticationSuccess = function(){
    // window.location.href= "all-project.html"
    console.log('success authentication');
  };
  var authenticationFailure = function() {
    // window.location.href= "login.html"
    console.log('Failed authentication');
  };

 $(".con_trello").on("click",function(){
  window.Trello.authorize({
    type: 'popup',
    name: 'Getting Started Application',
    scope: {
      read: 'true',
      write: 'true' },
    expiration: 'never',
    success: 
       window.location.href= "all-project.html",
    error:
      authenticationFailure,
  });
 });
 
});



