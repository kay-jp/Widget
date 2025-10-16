// Listen to the widgetinstall event.
self.addEventListener("widgetinstall", event => {
  // The widget just got installed, render it using renderWidget.
  // Pass the event.widget object to the function.
  event.waitUntil(renderWidget(event.widget));
});
let deferredPrompt
window.addEventListener('beforeinstallprompt', function(event){
    event.preventDefault();
    deferredPrompt = event;
});

function pwaInstall() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt = null;
    }else{
        window.alert('既にインストールされているか、お使いのブラウザが対応していません。ブラウザが対応していない場合は「ホーム画面に追加」からインストールしてください。');
    }
}

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

// Update the widgets to their initial states
// when the service worker is activated.
self.addEventListener("activate", event => {
  event.waitUntil(updateWidgets());
});

async function updateWidgets() {
  // Get the widget that match the tag defined in the web app manifest.
  const widget = await self.widgets.getByTag("pwatest");
  if (!widget) {
    return;
  }

  // Using the widget definition, get the template and data.
  const template = await (await fetch(widget.definition.msAcTemplate)).text();
  const data = await (await fetch(widget.definition.data)).text();

  // Render the widget with the template and data.
  await self.widgets.updateByTag(widget.definition.tag, {template, data});
}