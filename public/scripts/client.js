/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const element of tweets) {
    $("#tweets-container").append(createTweetElement(element))
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
  $("form").on("submit", function (event) {
    event.preventDefault();
    const tweetInput = $("#tweet-text").val();

    if (tweetInput === '' || tweetInput === null) {
      $(".error").slideUp("slow")
      $(".error-empty").slideDown("slow")
    } else if (tweetInput.length > 140) {
      $(".error").slideUp("slow")
      $(".error-counter").slideDown("slow")
    } else {
      $(".error").slideUp("slow")
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize()
      })
      $("#tweet-text").val("")
      $.ajax("/tweets", { method: "GET" })
        .then((dataReceived) => {

          renderTweets(dataReceived)
        })

    }
  })

  const loadTweets = () => {
    $.ajax("/tweets", { method: "GET" })
      .then((dataReceived) => {
        renderTweets(dataReceived)
      })
  }
  loadTweets()

})