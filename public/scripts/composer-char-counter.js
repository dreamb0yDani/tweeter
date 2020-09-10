
$(document).ready(function () {

  $("#tweet-text").on("keydown", function () {
    const $thisParent = $(this).parent();
    const remainingChar = 140 - (this.textLength);

    $($thisParent).find(".counter").text(remainingChar);

    remainingChar < 0 ? $(".counter").addClass("red") : $(".counter").removeClass("red");
  });
})