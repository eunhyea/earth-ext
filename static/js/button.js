document.addEventListener('DOMContentLoaded', () => {
  const moveBtn = document.getElementById('moveBtn');
  moveBtn.addEventListener('click', () => {
    alert("지구다로 이동!");
  });

  const stackBtn = document.getElementById('stackBtn');
  stackBtn.addEventListener('click', () => {
    alert("지식으로 쌓기!");
  });

  console.log("Side Panel Loaded");
});
