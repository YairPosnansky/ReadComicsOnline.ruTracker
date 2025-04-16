(function () {
  const url = window.location.href;
  const regexChapter = /readcomicsonline\.ru\/comic\/([^\/]+)\/([^\/]+)/;
  const regexRoot = /readcomicsonline\.ru\/comic\/([^\/]+)\/?$/;

  const matchChapter = url.match(regexChapter);
  const matchRoot = url.match(regexRoot);

  if (matchChapter) {
    const comic = matchChapter[1];
    const chapter = matchChapter[2];
    const key = `comic:${comic}`;
    chrome.storage.local.set({ [key]: chapter });
  }

  if (matchRoot) {
    const comic = matchRoot[1];
    const key = `comic:${comic}`;
    chrome.storage.local.get([key], function (result) {
      const chapter = result[key];
      if (chapter) {
        const newUrl = `https://readcomicsonline.ru/comic/${comic}/${chapter}`;
        if (url !== newUrl) {
          window.location.href = newUrl;
        }
      }
    });
  }

  window.addEventListener("load", function () {
    setTimeout(() => {
      const allButton = document.getElementById("modeALL");
      if (allButton) {
        allButton.click();
      }
    }, 1000);
  });
})();
