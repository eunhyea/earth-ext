document.addEventListener('DOMContentLoaded', () => {
  // 1) 화면에 표시할 키워드/설명 데이터 배열을 선언
  const cardsData = [
    // 여기에 keyword, explanation 데이터 넣기
    { keyword: '관세 인상', explanation: '외국에서 들어오는 물건에 붙는 세금이 올라서, 수입품 가격이 더 비싸져요.' },
    { keyword: '국채 신뢰도 하락', explanation: '미국 국채에 대한 신뢰가 떨어지면서, 투자자들이 채권 이자를 받을 수 있을지 불안해했어요.' },
    { keyword: '입항 수수료 상승', explanation: '물건이 항구에 들어올 때 내는 비용이 올라서, 기업들이 물류 비용 부담을 느꼈어요.' },
    { keyword: '입항 수수료 상승', explanation: '물건이 항구에 들어올 때 내는 비용이 올라서, 기업들이 물류 비용 부담을 느꼈어요.' },
    { keyword: '입항 수수료 상승', explanation: '물건이 항구에 들어올 때 내는 비용이 올라서, 기업들이 물류 비용 부담을 느꼈어요.' },
    { keyword: '입항 수수료 상승', explanation: '물건이 항구에 들어올 때 내는 비용이 올라서, 기업들이 물류 비용 부담을 느꼈어요.' },
    { keyword: '입항 수수료 상승', explanation: '물건이 항구에 들어올 때 내는 비용이 올라서, 기업들이 물류 비용 부담을 느꼈어요.' },
    { keyword: '입항 수수료 상승', explanation: '물건이 항구에 들어올 때 내는 비용이 올라서, 기업들이 물류 비용 부담을 느꼈어요.' },    
  ];

  // 2) 카드를 삽입할 부모 컨테이너 요소를 찾아둡니다
  const container = document.querySelector('.top-half');

  // 3) 데이터 배열을 순회하며 카드 요소를 생성
  cardsData.forEach(item => {
    // 카드 전체를 감싸는 div
    const card = document.createElement('div');
    card.classList.add('card', 'expandable-card');

    // 카드 헤더: 클릭하면 펼침/접힘
    const header = document.createElement('div');
    header.classList.add('card-header', 'expandable-header');
    // 기본 상태는 '▶ 키워드'
    const title = document.createElement('span');
    title.classList.add('card-title');
    title.textContent = '▶ ' + item.keyword;
    header.appendChild(title);

    // 카드 바디: 설명 텍스트, 초기에는 숨김 상태
    const body = document.createElement('div');
    body.classList.add('card-body', 'expandable-content');
    body.textContent = item.explanation;

    // 생성한 헤더/바디를 카드에 붙이고, 카드 전체를 컨테이너에 붙이기
    card.appendChild(header);
    card.appendChild(body);
    container.appendChild(card);

    // 4) 헤더 클릭 시 expand 클래스 토글 & 화살표 방향 전환
    header.addEventListener('click', () => {
      card.classList.toggle('expanded');
      if (card.classList.contains('expanded')) {
        // 접힌 화살표 '▶' 대신 펼친 '▼'
        title.textContent = '▼ ' + item.keyword;
      } else {
        title.textContent = '▶ ' + item.keyword;
      }
    });
  });
});