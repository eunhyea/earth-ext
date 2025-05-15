document.addEventListener('DOMContentLoaded', () => {
  const moveBtn = document.getElementById('moveBtn');
  moveBtn.addEventListener('click', () => {
    alert("지구다로 이동!");
  });

  const expandableHeaders = document.querySelectorAll('.expandable-header');
  expandableHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const card = header.parentElement;
      const content = card.querySelector('.expandable-content');
      const title = header.querySelector('.card-title');

      card.classList.toggle('expanded');
      if (card.classList.contains('expanded')) {
        title.textContent = '▼ ' + title.textContent.slice(2);
      } else {
        title.textContent = '▶ ' + title.textContent.slice(2);
      }
    });
  });

  console.log("Side Panel Loaded");
});
