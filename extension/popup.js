const seconds = 1;

document.addEventListener('DOMContentLoaded', function () {
  const newsList = document.getElementById('newsList');
  const openBtn = document.getElementById('openBtn');

  // Obtener los 5 links más recientes de Hacker News
  fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then(response => response.json())
    .then(data => {
      const topStories = data.slice(0, 10);

      topStories.forEach(storyId => {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
          .then(response => response.json())
          .then(story => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = story.url;
            link.target = '_blank';
            link.textContent = story.title + ' - ' + story.text;
            listItem.appendChild(link);
            newsList.appendChild(listItem);
          });
      });
    });

  // Abrir los links en nuevas pestañas en segundo plano de inmediato
  openBtn.addEventListener('click', function () {
    const links = Array.from(newsList.getElementsByTagName('a'));
    const numLinks = links.length;

    const confirmation = confirm(`¿Deseas abrir ${numLinks} páginas en segundo plano?`);

    if (confirmation) {
      openLinksInBackground(links);
    }
  });

  // Función para abrir los links en nuevas pestañas en segundo plano de inmediato
  function openLinksInBackground(links) {
    links.forEach((link, index) => {
      chrome.tabs.create({ url: link.href, active: false });
    });
  }

});
