// 파일명: gas-api-sample.js | 학생용 앱의 «JSON API» 서버 틀 (앱스크립트)
// 이 파일은 pages 저장소에 보관용으로 둔 견본이다. 앱스크립트 프로젝트의 Code.gs 에 붙여 쓴다.
//
// ★ 배포: 웹 앱 · 실행 사용자 «나» · 액세스 «모든 사용자»  (구글 로그인 없이 부를 수 있어야 한다)
// ★ HTML 을 내보내지 않는다 — JSON 만 준다. (HtmlService 로 화면을 내면 구글 주소가 열려서 13세 차단이 걸린다)
// ★ 학생 화면은 이 저장소(GitHub Pages)에 두고 fetch 로 이 API 를 부른다. 화면 쪽은 index.html 참고.
// ★ 학생 개인정보는 응답에 넣기 전에 «이 사람에게 보여 줘도 되는가»를 서버에서 거른다. (화면은 믿지 않는다)

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// 웹앱 주소를 그냥 열었을 때(점검용) — 화면이 아니라 JSON 한 줄
function doGet(e) {
  return jsonOut_({ ok: true, name: '학생 앱 API', time: Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss') });
}

// 화면이 POST(text/plain, 본문은 JSON 문자열)로 부른다
function doPost(e) {
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var act = String(body.act || '');
    if (act === 'lookup') return jsonOut_({ ok: true, data: lookup_(String(body.q || '').trim()) });
    throw new Error('모르는 요청: ' + act);
  } catch (err) {
    return jsonOut_({ ok: false, error: String((err && err.message) || err) });
  }
}

// 예시 — 자기 앱에 맞게 바꾼다
function lookup_(q) {
  if (!q) throw new Error('조회할 말을 넣어 주세요.');
  // var ss = SpreadsheetApp.openById('...'); … 시트에서 찾고, 보여 줘도 되는 칸만 골라서 돌려준다
  return { 찾은말: q, 안내: '여기에 조회 결과를 넣으세요' };
}
