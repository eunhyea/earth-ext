// 1. 사이드 패널 열기
chrome.action.onClicked.addListener(() => {
  chrome.sidePanel.setOptions({
    path: "panel.html",
    enabled: true
  }).catch((error) => {
    console.error("Error enabling side panel:", error);
  });
});

// 2. panel.js에서 요청 시 현재 탭의 URL 응답
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_CURRENT_TAB_URL") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentUrl = tabs[0]?.url || "";
      sendResponse({ url: currentUrl });
    });
    return true;
  }
});

// 3. 사용자가 탐색 중 YouTube playlist 포함 URL을 감지하여 자동 POST
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    const yt_url = changeInfo.url;

    const allowedPlaylists = [
      "PLw4cnM2Lkdv-uLlL2FYHBKPVq1I7uXU2s",
      "PLwLxLaKRlpvtXydsPmv-ziRO8yIie1lKu",
      "PL0dOq2-5pHmh_TeSG9NOKccrbI-YdgPH6",
      "PL7H9nIL5vtIjQoTICJQrwOG31QgAPrtMJ"
    ];

    const matched = allowedPlaylists.some(keyword => yt_url.includes(keyword));

    if (matched) {
      console.log("✅ 유효한 YouTube URL 감지됨:", yt_url);
      fetch("http://regularmark.iptime.org:37001/economic_info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ yt_url })
      })
        .then(res => res.json())
        .then(data => {
          console.log("📬 자동 전송 완료:", data);
        })
        .catch(err => {
          console.error("❌ 전송 실패:", err);
        });
    }
  }
});
