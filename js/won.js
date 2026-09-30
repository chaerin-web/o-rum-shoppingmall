// 숫자 세 자리마다 콤마를 찍어주는 헬퍼 함수
function won(value, locale = 'ko-KR') {
    if (value === null || value === undefined) return '';
    const num = Number(value);
    if (Number.isNaN(num)) return String(value);
    return num.toLocaleString(locale);
}

// 전역에서 사용할 수 있도록 노출 (비모듈 환경용)
if (typeof window !== 'undefined') window.won = won;