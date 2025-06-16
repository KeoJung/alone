document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  console.log("🔧 탭 인터페이스 스크립트 로드 완료");

  // 초기 상태 복원용: LocalStorage
  const savedTabId = localStorage.getItem("activeTabId");

  function fadeOut(element) {
    element.style.opacity = 1;
    element.style.transition = "opacity 0.4s ease-out";
    requestAnimationFrame(() => {
      element.style.opacity = 0;
    });
    setTimeout(() => {
      element.style.display = "none";
    }, 400);
  }

  function fadeIn(element) {
    element.style.display = "block";
    element.style.opacity = 0;
    element.style.transition = "opacity 0.4s ease-in";
    requestAnimationFrame(() => {
      element.style.opacity = 1;
    });
  }

  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className =
      "fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-2 rounded shadow-lg opacity-90 z-50";
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = 0;
      setTimeout(() => document.body.removeChild(toast), 500);
    }, 1500);
  }

  function activateTab(targetId) {
    const targetContent = document.getElementById(targetId);
    if (!targetContent) return;

    // 이미 활성화된 경우 무시
    if (
      document
        .querySelector(`.tab-btn[data-target="${targetId}"]`)
        ?.classList.contains("active")
    ) {
      return;
    }

    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => {
      if (content.classList.contains("active")) {
        fadeOut(content);
        content.classList.remove("active");
      }
    });

    const activeBtn = document.querySelector(
      `.tab-btn[data-target="${targetId}"]`
    );
    activeBtn.classList.add("active");
    targetContent.classList.add("active");
    fadeIn(targetContent);

    // 접근성 및 상태 저장
    targetContent.setAttribute("tabindex", "-1");
    targetContent.focus();
    localStorage.setItem("activeTabId", targetId);

    showToast(`'${targetId}' 탭이 열렸습니다!`);
    console.log(`✅ '${targetId}' 콘텐츠가 활성화되었습니다.`);
  }

  // 클릭 이벤트 연결
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      activateTab(targetId);
    });
  });

  // 키보드 ← → 탐색
  document.addEventListener("keydown", (e) => {
    const activeIndex = Array.from(tabButtons).findIndex((btn) =>
      btn.classList.contains("active")
    );

    if (e.key === "ArrowRight") {
      const nextIndex = (activeIndex + 1) % tabButtons.length;
      activateTab(tabButtons[nextIndex].dataset.target);
    } else if (e.key === "ArrowLeft") {
      const prevIndex =
        (activeIndex - 1 + tabButtons.length) % tabButtons.length;
      activateTab(tabButtons[prevIndex].dataset.target);
    }
  });

  // 페이지 로드 시 마지막 탭 복원
  if (savedTabId && document.getElementById(savedTabId)) {
    activateTab(savedTabId);
  } else {
    // 첫 번째 탭 기본 활성화
    activateTab(tabButtons[0].dataset.target);
  }
});
