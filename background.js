chrome.action.onClicked.addListener(() => {
  chrome.sidePanel.setOptions({
    path: "panel.html",
    enabled: true
  }).catch((error) => {
    console.error("Error enabling side panel:", error);
  });
});
