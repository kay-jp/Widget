self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://9f476953-51e0-489c-9a0d-1242faf36c2c-00-3mbiv4ssl2rk7.pike.replit.dev/')
    );
});
self.addEventListener('install', function (event) {
  console.log('Service Worker installing.');
  // キャッシュを作成
  event.waitUntil(          // インストール処理完了までService Workerのインストールを待機
    caches.open(cacheName)  // 指定したキャッシュ名でキャッシュを開く
      .then(function (cache) {  
        console.log('Opened cache');
        return cache.addAll(filesToCache);  // filesToCacheをキャッシュに保存する
      })
  );
});

// activateイベント
self.addEventListener('activate', function (event) {
  console.log('Service Worker activating.');
  // 古いキャッシュの削除
  event.waitUntil(  // アクティベート処理完了までService Workerのインストールを待機
    caches.keys()   // ブラウザに保存されているすべてのキャッシュ名のリストを取得
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (thisCacheName) {
            // 現在のキャッシュ名と異なる場合
            if (thisCacheName !== cacheName) {
              console.log('Service Worker removing old cache.', thisCacheName);
              return caches.delete(thisCacheName);  // 現在のキャッシュを削除
            }
          })
        );
      })
  );
});

// fetchイベント
self.addEventListener('fetch', function (event) {
  console.log('Service Worker fetching.', event.request.url);
  // リクエスト処理（オフライン・オンライン両方）
  event.respondWith(  // 指定したレスポンスをブラウザに返すように指示
    caches.match(event.request)  // リクエストされたリソースがキャッシュに存在するか調べる
      .then(function (response) {
        // キャッシュがあればそれを返し、なければネットワークから取得
        return response || fetch(event.request);
      })
  );
});
// Listen to the widgetinstall event.
self.addEventListener("widgetinstall", event => {
  // The widget just got installed, render it using renderWidget.
  // Pass the event.widget object to the function.
  event.waitUntil(renderWidget(event.widget));
});

async function renderWidget(widget) {
  // Get the template and data URLs from the widget definition.
  const templateUrl = widget.definition.msAcTemplate;
  const dataUrl = widget.definition.data;

  // Fetch the template text and data.
  const template = await (await fetch(templateUrl)).text();
  const data = await (await fetch(dataUrl)).text();

  // Render the widget with the template and data.
  await self.widgets.updateByTag(widget.definition.tag, {template, data});
}