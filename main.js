import { counUp } from "./utils/countUp.js";
import { setTabMenu } from "./module/tabMenu.js";
import { setSelectCards, setSelectButton, setResultContainer } from "./module/selectCard.js";
import { setMbtiSection } from "./module/mbtiSelect.js";
import { setShareUrlButton } from "./module/share.js";
//참여자수 에니메이션 구현 부분 ----
const data = {
  participate: 132131241,
}

const participateDom = document.querySelector('#participate-number');
participateDom.inerHTML = data.participate;

counUp(participateDom, data.participate, 1);
// ----- 참여자수 에니메이션 구현 부분 //
setTabMenu();


setSelectCards();
setSelectButton();

setResultContainer();

setMbtiSection();

setShareUrlButton();