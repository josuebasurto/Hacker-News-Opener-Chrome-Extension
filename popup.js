alert('Hacker News Opener!');

fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then(response => response.json())
    .then(data => {
      var topStories = data.slice(0, 10);

      topStories.forEach(storyId => {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
          .then(response => response.json())
          .then(story => {
            setTimeout(()=>{},5000);
            chrome.tabs.create({ url: story.url });
          });
        
          chrome.tabs.create({ url: 'https://news.ycombinator.com/' });
      });
    });

