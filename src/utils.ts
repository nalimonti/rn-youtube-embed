export type PlayerVars = {
  autoplay?: 0|1;
  cc_lang_pref?: string;
  cc_load_policy?: 1|0;
  controls?: 0|1;
  color?: 'red';
  disablekb?: 1|0;
  fs?: 0|1;
  enablejsapi?: 0|1;
}

export const embedHTML = (videoId?: string, playerVars?: PlayerVars): string => {
  const vars = { ...playerVars, enablejsapi: 1 },
    params = {
      ...(videoId ? { videoId } : {}),
      playerVars: vars,
      events: { onReady: 'onPlayerReady', onError: 'onError' },
    };
  return `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          .player-wrapper {
              width: 100%;
              display: flex;
              justify-content: center;
          }
        </style>
        <script>
          var tag = document.createElement('script');
          tag.src = "https://www.youtube.com/iframe_api";
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          var player;
          function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', ${JSON.stringify(params)});
          }
          function onPlayerReady() {
            window.ReactNativeWebView.postMessage(JSON.stringify({ loaded: true }));
          }
          function onError() {
            window.ReactNativeWebView.postMessage(JSON.stringify({ error: true }));
          }
        </script>
    </head>
    <body>
        <div class='player-wrapper'>
          <div id='player'></div>
        </div>
    </body>
</html>
  `
}
