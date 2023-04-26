//anchor-to select
//anchor-to-ressult
//anchor-to-mbti

const headerDom = document.querySelector('header')[0];
// const headerHeight = headerDom.offsetHeight;
const selectAnchormenuDom = document.getElementById('anchor-to-select');
const resultanchorMenuDom = document.getElementById('anchor-to-result');
const mbtiAnchorMenuDom = document.getElementById('anchor-to-mbti');

const selectSectionDom = document.getElementById('participate-section');
const resultSectionDom = document.getElementById('result-section');
const mbtiSectionDom = document.getElementById('mbti-section');


const handleScroll = (anchorDom, targetDom) => {
    anchorDom.onclick = () => {
        const scrollTargetY = targetDom.offsetTop;
        window.scroll({
            top: scrollTargetY,
            left: 0,
            behavior: 'smooth',
        });
    }
}


export const setTabMenu = () => {
    handleScroll(selectAnchormenuDom, selectSectionDom);
    handleScroll(resultanchorMenuDom, resultSectionDom);
    handleScroll(mbtiAnchorMenuDom, mbtiSectionDom);
}