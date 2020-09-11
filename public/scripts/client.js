/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  // Check if the main container has any element or not
  // if not, render whole array, else render most recent
  $("#tweets-container").children().length === 0 ? tweets : tweets = [tweets[tweets.length - 1]]

  for (const element of tweets) {
    $("#tweets-container").prepend(createTweetElement(element))
  }

}

// check if there is any script and parse it into string
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// feeding the HTML element and returning it
const createTweetElement = function (tweet) {
  let $tweet = `
    <article class="tweet">
      <header>
        <div class=user-container>
          <div class="user-info">
            <img src=${tweet.user.avatars} alt="user avatar">
            <h4>${tweet.user.name}</h4>
          </div>
          <h4 class="user-handle">${tweet.user.handle}</h4>
        </div>
        <div class="tweet-header">
          ${escape(tweet.content.text)}
        </div>
      </header>
      <footer>
        <div>
          ${tweet.created_at}
        </div>
        <div>
          <img class="footer-icons" src="./images/flag-alt-solid-24.png" alt="flag">
          <img class="footer-icons" src="./images/repost-regular-24.png" alt="repost">
          <img class="footer-icons" src="./images/heart-solid-24.png" alt="like">
        </div>
      </footer>
    </article>
    `
  return $tweet;
}

// JQuery logic to POSt tweet and render it,
$(document).ready(() => {

  // GET the tweets from server and then render them on DOM
  $(".toggle-form").on("click", () => {
    $("form").toggle(1000);
  })

  const loadTweets = () => {
    // $("#tweets-container").empty();
    $.ajax("/tweets", { method: "GET", dataType: "JSON" })
      .then((dataReceived) => {
        renderTweets(dataReceived)
      })
  }

  // Event Handler on submit
  $("form").on("submit", function (event) {
    event.preventDefault();

    let tweetInput = $("#tweet-text").val().length;
    // Validation of the input
    if (!tweetInput) {
      $(".error").text("Please enter the tweet!").slideDown("slow")
    } else if (tweetInput > 140) {
      $(".error").text("Character limit exceeded!").slideDown("slow")
    } else {
      $(".error").slideUp("slow")

      //AJAX POST request on submit
      $.ajax("/tweets", {
        method: "POST",
        data: $(this).serialize()
      }).then(() => {
        $("#tweet-text").val("")
        loadTweets()
      })
    }
  })

  loadTweets()
})