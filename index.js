function drawViz(data, config, element) {
  if (!data || !data.length) return;

  const participants = data[0].metrics[0]; // 참여자 수
  const max = 100; // 목표값 (원하면 조정 가능)
  const ratio = Math.min(participants / max, 1);

  // 파란색 채도 비율 (HSL: Hue=210이 파랑)
  const blueSaturation = 20 + ratio * 60; 
  const color = `hsl(210, ${blueSaturation}%, 50%)`;

  // HTML 출력
  element.innerHTML = `
    <div style="
      width:100%; 
      height:200px; 
      background:${color};
      border-radius:16px;
      transition: background 1s ease;">
      <h2 style="
        color:white; 
        text-align:center; 
        padding-top:80px;
        font-size:20px;">
        참여자 수: ${participants}
      </h2>
    </div>`;
}
