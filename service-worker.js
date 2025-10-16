self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://9f476953-51e0-489c-9a0d-1242faf36c2c-00-3mbiv4ssl2rk7.pike.replit.dev/')
    );
});
