
import { appendChildrenList, makeDOMwithProperties } from "../utils/dom.js";
import { SELECT_RESULT_KEY } from '../constants/result.js'

const snackCardList = document.getElementsByClassName('snack-card-list')[0];
const selectButtonDOM = document.querySelector('.participate-button');
const [notyetContainerDOM, resultContainerDOM] = document.getElementsByClassName('result-container');
const [, reusltImageDOM, resultNameDOM, resultDescriptionDOM, selectRetryButton] = resultContainerDOM.children;

const getSelectedCard = () => {
    return document.getElementsByClassName('select')[0];
}

const getCardById = (id) => {
    return document.getElementById(`select-${id}`);
}
const cardInfoList = [
    {
        id: 1,
        imgSrc: '/public/assets/초코꼬북칩.jpeg',
        name: '초코꼬북칩',
        description: '맛있는 초코꼬북칩',
    },

    {
        id: 2,
        imgSrc: '/public/assets/나쵸.jpeg',
        name: '나쵸',
        description: '맛있는 나쵸',
    },

    {
        id: 3,
        imgSrc: '/public/assets/허니버터칩.jpeg',
        name: '허니버터칩',
        description: '맛있는 허니버터칩',
    },

    {
        id: 4,
        imgSrc: '/public/assets/홈런볼.jpeg',
        name: '홈런볼',
        description: '맛있는 홈런볼',
    },

]

const handleSelectCard = (cardId) => {
    //선택된 카드를 표시 하는 함수
    //1. 이미 선택되어 있던 카드는 선택 해제
    //2. 현재 선택한 카드를 선택

    const originalSelectedCard = document.getElementsByClassName('select')?.[0];
    originalSelectedCard?.classList.remove('select');

    const newSelectedCard = document.getElementById(`select-${cardId}`);
    newSelectedCard?.classList.add('select');
}


const getSelectCardDom = ({
    id,
    imgSrc,
    name,
    description,
}) => {

    const snackCardDOM = makeDOMwithProperties('buton', {
        id: `select-${id}`,
        className: 'snack-card',
        onclick: () => { handleSelectCard(id) },
    })

    const imageDOM = makeDOMwithProperties('img', {
        src: imgSrc,
        alt: name
    });

    const descriptionContinerDOM = makeDOMwithProperties('div', {
        className: 'snack-description',
    });

    const nameDOM = makeDOMwithProperties('div', {
        innerHTML: name,
    });

    const descriptionDOM = makeDOMwithProperties('div', {
        innerHTML: description,
    });

    appendChildrenList(descriptionContinerDOM, [nameDOM, descriptionDOM]);
    appendChildrenList(snackCardDOM, [imageDOM, descriptionContinerDOM]);

    return snackCardDOM;

}

export const setSelectCards = () => {

    const originalSnackCards = Object.assign([], snackCardList.children);
    originalSnackCards.forEach((snackCard) => {
        snackCard.remove();
    })

    cardInfoList.forEach((info) => {
        const selectCardDOM = getSelectCardDom(info);
        snackCardList.appendChild(selectCardDOM);
    });

    const cardId = Number(localStorage.getItem(SELECT_RESULT_KEY));
    if (!cardId || isNaN(cardId)) return;

    handleSelectCard(cardId);
}

export const setSelectButton = () => {
    //1 버튼 dom을 박아오기
    //2. dom의 onclick 핸들러 등록
    // 1) 선택된 카드의 id를 찾기
    // 2) localStorage에 해당 id를 저장
    // 1번에서 선택된 카드의 id가 없을 때는 선택된 카드가 없다는 경고창을 띄우기
    selectButtonDOM.onclick = () => {
        const selectedCard = getSelectedCard();
        if (!selectedCard) {
            alert('없어');
            return;
        }
        const cardId = selectedCard.id.split('-')[1];
        localStorage.setItem(SELECT_RESULT_KEY, cardId);
        setResultContainer();
    };
}

const initialize = () => {
    // 과자가 선택되기 전의 상태로 되돌려주는 함수
    // 1. localStorage
    // 2. selectCard의 dom들을 다시 구성
    // 3. resultContainer의 DOM을 다시 구성
    localStorage.removeItem(SELECT_RESULT_KEY);
    setSelectCards();
    setResultContainer();

    const selectSectionDom = document.querySelector('#participate-section');
    const scrollTargetY = selectSectionDom.offsetTop;

    window.scroll({
        top: scrollTargetY,
        left: 0,
        behavior: 'smooth',
    })
}

export const setResultContainer = () => {
    //result 구역에 선택된 과자를 노출시키는 함수
    //과자 버튼 크릭 시, 페이지 랜딩 시 동작

    // 1. 선택된 아이디를 localStrorage로 부터 받아오기
    // 2. 선택된 아이디가 저장되어 있다면 notyetContainer
    // 3. carInfoList에서 선택된 카드의 정보를 찾아서 그 정보를 resultContainer에 연결
    const selectedId = Number(localStorage.getItem(SELECT_RESULT_KEY));

    const isSelected = !!selectedId;
    if (!isSelected) {
        notyetContainerDOM.style.display = 'block';
        resultContainerDOM.style.display = 'none';
        return;
    }
    notyetContainerDOM.style.display = 'none';
    resultContainerDOM.style.display = 'flex';
    const cardInfo = cardInfoList.find((info) => info.id === selectedId);
    reusltImageDOM.src = cardInfo.imgSrc;
    reusltImageDOM.alt = cardInfo.name;
    resultNameDOM.innerHTML = cardInfo.name;
    resultDescriptionDOM.innerHTML = cardInfo.description;
}

//다시하기 버튼 구현
selectRetryButton.onclick = initialize;