// dom : innerHTML이 갱신될 노드
// target : 목표 숫자
//second: 몇 초가 걸릴 지
//term : 몇 씩 증가할 지
export const counUp = (dom, target, second, term = 15) => {
    if (!dom || isNaN(Number(target)) || isNaN(Number(second)) || isNaN(Number(term))) return;
    let nowNumber = 0;
    const countTerm = Math.floor((target / second) * (term / 1000));


    const timerId = setInterval(() => {
        if (nowNumber > target) {
            nowNumber = target;
            clearInterval(timerId);
            return;
        }
        nowNumber += countTerm;
        dom.innerHTML = `${nowNumber.toLocaleString()}`;
    }, term);
}