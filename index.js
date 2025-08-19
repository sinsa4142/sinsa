const dscc = require('dscc');

// 데이터 들어오면 실행되는 함수
function drawViz(data) {
  const rows = data.tables.DEFAULT;
  if (!rows || rows.length === 0) return;

  // "참여자 수" 메트릭 가져오기
  const participants = rows[0].metricValues[0].value;

  // 최대치 기준 (예: 1000명)
  const maxParticipants = 1000;
  const ratio = Math.min(participants / maxParticipants, 1); // 0~1 사이 값
  const blue = Math.floor(255 * ratio);
  const green = Math.floor(150 * ratio);
  const color = `rgb(0, ${green}, ${blue})`;

  // 시각화 그리기
  const container = document.getElementById("container");
  container.innerHTML = `
    <div style="
      width: 100%;
      height: 300px;
      border-radius: 20px;
      background: ${color};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      font-weight: bold;
      color: white;
    ">
      참여자 수: ${participants}명
    </div>
  `;
}

// Looker Studio 데이터 구독
dscc.subscribeToData(drawViz, { transform: dscc.tableTransform });
