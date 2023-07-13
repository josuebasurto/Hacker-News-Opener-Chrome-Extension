chrome.browserAction.onClicked.addListener(function(tab) {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(response => response.json())
      .then(data => {
        var topStories = data.slice(0, 5);
  
        topStories.forEach(storyId => {
          fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
            .then(response => response.json())
            .then(story => {
              chrome.tabs.create({ url: story.url });
            });
        });
      });
  });