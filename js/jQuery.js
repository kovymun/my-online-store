/***LEVEL ONE TASK 15 - JQUERY FILE: ONLINE-STORE***/
/*
Applied a chained effect and animate() method to the logo in the landing page - to change it's text color, 
opacity, width , and add slide effects.
Referenced more information on how to apply these effects from the jQuery API web page.
https://api.jquery.com/animate/
*/
$(document).ready(function () {
  $(".intro-container").hover(function () {
    $(this).css("color", "#D61C4E").slideUp(3000).slideDown(2000);
    $(this).animate(
      {
        opacity: 0.5,
        width: "50%",
      },
      3000
    );
  });
});
