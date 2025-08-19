// Looker Studio Custom Visualization 기본 템플릿
// 참여자 수에 따라 배경색(하천 색)이 점점 푸르게 변함

const dscc = require('dscc'); // Looker Studio에서 제공하는 라이브러리

// 시각화 렌더링 함수
function drawViz(data) {
  // metric 값 가져오기
  const participants = data.tables.DEFAULT[0].metrics[0];
  const count = participants ? Number(participants) : 0;

  // 참여자 수에 따른 색상 계산
  // 0명일 때 회색, 많아질수록 푸른색 진하게
  const blueIntensity = Math.min(255, count * 5); // 참여자 수 * 5 (최대 255)
  const color = `rgb(0, ${Math.floor(blueIntensity / 2)}, ${blueIntensity})`;

  // 루트 컨테이너 선택
  const container = document.getElementById('container');
  container.innerHTML = ""; // 초기화

  // 하천(사각형 블록) 생성
  const river = document.createElement('div');
  river.style.width = "100%";
  river.style.height = "300px";
  river.style.backgroundColor = color;
  river.style.borderRadius = "12px";
  river.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
  river.style.transition = "background-color 0.5s ease";

  // 참여자 수 표시 텍스트
  const text = document.createElement('p');
  text.innerText = `참여자 수: ${count}`;
  text.style.textAlign = "center";
  text.style.paddingTop = "130px";
  text.style.fontSize = "24px";
  text.style.color = "white";
  text.style.fontWeight = "bold";

  river.appendChild(text);
  container.appendChild(river);
}

// Looker Studio 데이터 업데이트 시 drawViz 호출
dscc.subscribeToData(drawViz, {transform: dscc.tableTransform});
