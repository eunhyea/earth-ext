// 로딩 오버레이 생성 함수
function createLoadingOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'loading-overlay';
  overlay.innerHTML = `
    <div class="loading-content">
      <div class="loading-spinner"></div>
      <div class="loading-text">로딩 중...</div>
    </div>
  `;

  // 스타일 추가
  const style = document.createElement('style');
  style.textContent = `
    #loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    #loading-overlay.show {
      opacity: 1;
    }

    .loading-content {
      background: white;
      padding: 30px;
      border-radius: 10px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 15px;
    }

    .loading-text {
      font-size: 16px;
      color: #333;
      font-weight: 500;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(overlay);

  // 애니메이션을 위해 잠시 후 show 클래스 추가
  setTimeout(() => {
    overlay.classList.add('show');
  }, 10);

  return overlay;
}

// 로딩 오버레이 제거 함수
function removeLoadingOverlay() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.classList.remove('show');
    setTimeout(() => {
      overlay.remove();
    }, 300); // 페이드아웃 애니메이션 시간과 맞춤
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const moveBtn = document.getElementById('moveBtn');
  moveBtn.addEventListener('click', () => {
    window.open('http://localhost:8080', '_blank');
  });

  const stackBtn = document.getElementById('stackBtn');
  stackBtn.addEventListener('click', async () => {
    chrome.runtime.sendMessage({ type: "GET_CURRENT_TAB_URL" }, async (response) => {
      const yt_url = response.url;
      try {

        // 로딩 오버레이 표시
        loadingOverlay = createLoadingOverlay();

        // 로딩 상태 표시 (선택사항)
        stackBtn.textContent = '로딩 중...';
        stackBtn.disabled = true;

        // POST 방식으로 API 호출
        const response = await fetch('http://regularmark.iptime.org:37001/economic_info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ yt_url })
        });

        fetch('http://regularmark.iptime.org:37002/script_preprocess', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ yt_url })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // API 응답이 올바른 형식인지 확인
        if (data && data.keywords && Array.isArray(data.keywords)) {
          // word.js의 createCards 함수 호출하여 새로운 데이터로 카드 생성
          createCards(data.keywords);
          createSummaryCards(data.summary);
        } else {
          throw new Error('API 응답 형식이 올바르지 않습니다.');
        }

      } catch (error) {
        console.error('API 호출 실패:', error);
        alert(`지식 쌓기 실패: ${error.message}`);
      } finally {
        // 버튼 상태 복원

        // 로딩 오버레이 제거
        removeLoadingOverlay();
        stackBtn.textContent = '지식으로 쌓기!';
        stackBtn.disabled = false;
      }
    });
  });
  console.log("Side Panel Loaded");
});
