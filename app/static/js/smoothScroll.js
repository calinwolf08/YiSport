$(document).ready(function(){
  // Add smooth scrolling to all links in navbar + footer link
  $(".smoothScroll, footer a[href='#myPage']").on('click', function(event) {

  // Prevent default anchor click behavior
  event.preventDefault();
  // Store hash
  var hash = this.hash;

  if (hash === '') {
    var toScroll = 0;
  } else {
    var toScroll = $(hash).offset().top;
  }
  //alert(hash + $(hash).offset());

  // Using jQuery's animate() method to add smooth page scroll
  // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
  $('html, body').animate({
    scrollTop: toScroll
  }, 900, function(){

    // Add hash (#) to URL when done scrolling (default click behavior)
    window.location.hash = hash;
    });
  });
})