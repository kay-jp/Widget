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