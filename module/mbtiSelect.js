//mbti 섹션
//1. 질문이 표시, yes, no 버튼
// 2. yes 0> 점수 +1, mp -> 점수 + 0
const mbtiQuestionDOM = document.getElementsByClassName('mbti-question')[0];
const [yesButton, NoButton] = document.getElementsByClassName('mbti-select')[0].children;
const [selectDOM, pendingDOM, resultDOM] = document.getElementsByClassName('mbti-container');
const mbtiResltTitleDOM = document.getElementsByClassName('mbti-result')[0];
const mbtiResultDescriptionDOM = document.getElementsByClassName('mbti-description')[0];
const mbtiRetryButton = document.getElementsByClassName('mbti-retry-button')[0];

const mbtiQuestionList = [
    '짠 과자가 단 과자보다 좋다.',
    '봉지 과자가 박스 과자보다좋다.',
    '과자를 뜯으면 한 번에 다 먹는다.'
]

const geTMbtiResult = () => {
    switch (resultValue) {
        case 0:
            return {
                title: '과자 어린이 (A 유형)',
                descripttion: '과자 어린이 (A 유형) 설명',
            }

        case 1:
            return {
                title: '과자 어린이 (B 유형)',
                descripttion: '과자 어린이 (B 유형) 설명',
            }

        case 2:
            return {
                title: '과자 어린이 (C 유형)',
                descripttion: '과자 어린이 (C 유형) 설명',
            }

        case 3:
            return {
                title: '과자 어린이 (D 유형)',
                descripttion: '과자 어린이 (D 유형) 설명',
            }

        default:
    }
}

let currentRound = 0;
let resultValue = 0; // 0 ~ n
const maxRound = mbtiQuestionList.length;

const setPendingSection = () => {
    pendingDOM.style.display = 'block';
    selectDOM.style.display = 'block';


    setTimeout(() => {
        pendingDOM.style.display = 'none';
        resultDOM.style.display = 'block';
    }, 3000);
};

const initialize = () => {
    currentRound = 0;
    resultValue = 0;
    selectDOM.style.display = 'block';
    pendingDOM.style.display = 'none';
    resultDOM.style.display = 'none';
}


const setResultSection = () => {
    //결과 정보들을 DOM에 주입
    const { title, descripttion } = geTMbtiResult(resultValue);
    mbtiResultDescriptionDOM.innerHTML = title;
    mbtiResltTitleDOM.innerHTML = descripttion;

    mbtiRetryButton.onclick = initialize;

}


export const setMbtiSection = () => {
    //질문 표시
    //버튼이 눌렸을 때 다음 질문으로 넘어감

    if (currentRound === maxRound) {
        setPendingSection();
        setResultSection();
        return;
    }

    selectDOM.style.display = 'block';

    mbtiQuestionDOM.innerHTML = mbtiQuestionList[currentRound++];
    yesButton.onclick = () => {
        resultValue++;
        setMbtiSection()
    };
    NoButton.onclick = () => {
        setMbtiSection();
    }
}