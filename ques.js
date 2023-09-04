


let flag = true;
let n = 250;

function moveHeading() {
    const m0 = document.querySelector('.m-0');
    const m1 = document.querySelector('.m-1');
    console.log('helll');
    if(flag) {
        const computedStyle = window.getComputedStyle(m0);
        console.log(computedStyle.getPropertyValue('left'));
        
        m0.style.left = `${n}vw`;
        flag = false;
    }
    else {
        console.log('m1')
        m1.style.left = `${n}vw`;
        flag = true;
    }
    n*=2;
}

const interval = setInterval(moveHeading, 5000);
