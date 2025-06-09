document.addEventListener('DOMContentLoaded', () => {
  // 1) 표시할 summary 데이터 배열을 선언 (필요한 만큼 추가)
  const summaryData = [
    // 문장 단위로 split해서 데이터 넣기
    '트럼프가 중국산 물건에 높은 관세를 매기자, 미중 무역전쟁이 시작됐고, 수입비용 상승과 공급망 혼란이 생겼어요.',
    '미국은 자국 산업 보호에 돈을 더 쓰기 시작했는데, 이것 때문에 투자자들은 "국채 이자 잘 줄 수 있을까?" 하고 걱정했죠.',
    '그래서 미국 국채 신뢰도는 떨어지고, 달러 가치도 하락했어요.',
    '게다가 입항 수수료까지 오르자, 기업들은 "중국 비싸니까 다른 나라로 가자!"고 판단했어요.',
  ];

  // 2) 요약 카드를 삽입할 .bottom-half 컨테이너를 찾음
  const container = document.querySelector('.bottom-half');

  // 3) 기존 내용(정적 <p> 등)이 있다면 모두 지우기
  container.innerHTML = '';

  // 4) Check Point 헤딩 생성
  const heading = document.createElement('h4');
  const icon = document.createElement('img');
  icon.src = '/static/img/2750548.png';    // ← 실제 파일 경로로 바꿔주세요
  icon.alt = '📌';                           // 접근성을 위한 대체 텍스트
  icon.style.height = '1em';                // 텍스트 크기(폰트 높이)와 맞추기
  icon.style.verticalAlign = 'middle';      // 텍스트와 수직 중앙 정렬
  
  // 2) heading 내부 초기화
  heading.textContent = '';                 // 기존 텍스트(이모지 등) 제거
  
  // 3) 아이콘과 글자 순서대로 추가
  heading.appendChild(icon);                // [이미지]
  heading.append('  Summary');               // [공백 + 텍스트]
  container.appendChild(heading);

  // 5) summaryData 배열을 순회하며 카드 생성
  summaryData.forEach(text => {
    // 카드 전체를 감싸는 div 생성
    const card = document.createElement('div');
    card.classList.add('summary-card'); // 필요에 따라 CSS 클래스 추가

    // 요약 텍스트를 담을 <p> 생성
    const p = document.createElement('p');
    p.textContent = text;

    // 카드에 <p> 붙이고, 컨테이너에 카드 붙이기
    card.appendChild(p);
    container.appendChild(card);
  });
});