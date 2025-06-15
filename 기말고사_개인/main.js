// personal.js

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // 탭 버튼 active 토글
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // 컨텐츠 토글
      const target = tab.getAttribute("data-target");
      contents.forEach((content) => {
        content.id === target
          ? content.classList.add("active")
          : content.classList.remove("active");
      });
    });
  });
});
