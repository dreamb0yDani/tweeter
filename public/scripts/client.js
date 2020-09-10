/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  // console.log(tweets, 'array')

  $("#tweets-container").children().length === 0 ? tweets : tweets = [tweets[tweets.length - 1]]

  for (const element of tweets) {
    $("#tweets-container").prepend(createTweetElement(element))
  }

}

const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

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
          <img src="./images/flag-alt-solid-24.png" alt="flag">
          <img src="./images/repost-regular-24.png" alt="repost">
          <img src="./images/heart-solid-24.png" alt="like">
        </div>
      </footer>
    </article>
    `
  return $tweet;
}

$(document).ready(() => {

  const loadTweets = () => {
    // $("#tweets-container").empty();
    $.ajax("/tweets", { method: "GET", dataType: "JSON" })
      .then((dataReceived) => {
        renderTweets(dataReceived)
      })
  }

  $("form").on("submit", function (event) {
    event.preventDefault();

    let tweetInput = $("#tweet-text").val();

    if (tweetInput.length <= 0) {
      $(".error").text("Please enter the tweet!").slideDown("slow")
    } else if (tweetInput.length > 140) {
      $(".error").text("Character limit exceeded!").slideDown("slow")
    } else {
      $(".error").slideUp("slow")
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