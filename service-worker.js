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
