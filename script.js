const main = document.querySelector('main');


let initialPositions = [];
const data = {
    arr:
    [
        {
            img: 'images/nathan-anderson-fcZIyU-nbFE-unsplash.jpg',
            name: 'P-1',
            info: 'hehe',
        },
        {
            img: 'images/nathan-anderson-fcZIyU-nbFE-unsplash.jpg',
            name: 'P-2',
            info: 'hehe',
        },
        {
            img: 'images/nathan-anderson-fcZIyU-nbFE-unsplash.jpg',
            name: 'P-3',
            info: 'hehe',
        },
        {
            img: 'images/nathan-anderson-fcZIyU-nbFE-unsplash.jpg',
            name: 'P-4',
            info: 'hehe',
        },
        {
            img: 'images/nathan-anderson-fcZIyU-nbFE-unsplash.jpg',
            name: 'P-5',
            info: 'hehe',
        }
    ]
}

createProjectRows();

function createProjectRows() {
    for(let i=0; i<5; i++){
        let mainContainer = document.createElement('div');
        mainContainer.className = `main-row row-${i}`;

        let firstRow = document.createElement('div');
        firstRow.className = `first-row first-row-${i}`;

        let smallRow = document.createElement('div');
        smallRow.className = `small-row small-row-${i}`;

        for (let j = 0; j <= 4; j++) {
            let smallDiv = document.createElement('div');
            let bigDiv = document.createElement('div');
            smallDiv.className = `small small-0${i}${j}`;
            if(j==4){
                smallRow.appendChild(smallDiv);
                continue;
            } 
            bigDiv.className = `big large-0${i}${j}`;
            smallRow.appendChild(smallDiv);
            smallRow.appendChild(bigDiv);
        }


        firstRow.appendChild(smallRow);

        let secondRow = document.createElement('div');
        secondRow.className = `second-row second-row-${i}`;

        let largeRow = document.createElement('div');
        largeRow.className = `large-row large-row-${i}`;

        for (let j = 0; j <= 4; j++) {
            let smallDiv = document.createElement('div');
            let bigDiv = document.createElement('div');
            smallDiv.className = `small small-1${i}${j}`;
            if(j==4){
                largeRow.appendChild(smallDiv);
                continue;
            } 
            bigDiv.className = `big large-1${i}${j}`;
            largeRow.appendChild(smallDiv);
            largeRow.appendChild(bigDiv);
        }

        secondRow.appendChild(largeRow);

        mainContainer.appendChild(firstRow);
        mainContainer.appendChild(secondRow);

        main.appendChild(mainContainer);
    }
    fillRowsWithProjects();
    const clickables = document.querySelectorAll('.clickable');
    handleEyeClick(clickables);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fillRowsWithProjects() {
     for(let i=0; i<5; i++){
        const randomBigCol = getRandomInt(0, 3); 
        let bigCol = document.querySelector(`.large-1${i}${randomBigCol}`);
        let smallCol = document.querySelector(`.large-0${i}${randomBigCol}`);
        let smallEyeCol;
        if(randomBigCol > 1) smallEyeCol = document.querySelector(`.small-0${i}${randomBigCol}`);
        else smallEyeCol = document.querySelector(`.small-0${i}${randomBigCol+1}`);

        bigCol.classList.add('clickable');
        smallCol.classList.add('clickable');
        smallEyeCol.classList.add('clickable');

        bigCol.style.backgroundImage = `url(${data.arr[i].img})`;
        bigCol.style.backgroundSize = 'cover'
        console.log(data.arr[i].img);
        smallCol.textContent = data.arr[i].name;
        smallEyeCol.textContent = 'e';

        initialPositions.push([i,randomBigCol]);
     }
}

let crossClick;

function handleEyeClick(clickables) {
    clickables.forEach((element) => {
        element.addEventListener('click', () => {
            const classNames = element.className.split(' ');
            console.log('Class names:', classNames);
            let rowCol = classNames[1];
            let r = rowCol[7];
            let c = rowCol[8];
    
            let row = document.querySelector(`.row-${r}`)
            let smallRow = document.querySelector(`.small-row-${r}`);
            let largeRow = document.querySelector(`.large-row-${r}`);
    
            smallRow.innerHTML = '';
            largeRow.innerHTML = '';
    
            console.log(r,c);
    
            for(let j=0; j<3; j++){
                let smallDiv = document.createElement('div');
                let bigDiv = document.createElement('div');
                smallDiv.className = `small small-0${r}${j}`;
                if(j==2){
                    smallRow.appendChild(smallDiv);
                    continue;
                } 
                bigDiv.className = `big large-0${r}${j}`;
                smallRow.appendChild(smallDiv);
                smallRow.appendChild(bigDiv);
            }
    
            for (let j = 0; j <3; j++) {
                let smallDiv = document.createElement('div');
                let bigDiv = document.createElement('div');
                smallDiv.className = `small small-1${r}${j}`;
                if(j==2){
                    largeRow.appendChild(smallDiv);
                    continue;
                } 
                bigDiv.className = `big large-1${r}${j}`;
                largeRow.appendChild(smallDiv);
                largeRow.appendChild(bigDiv);
            }
    
            gsap.to(row, {duration: 1.5, height: '100vh'}, 0);
            
            const cross = document.querySelector(`.small-0${r}1`)
            cross.textContent = 'C';
            cross.classList.add('cross-click');
            // row.style.height = '100vh';
            if (c<2) {
                smallRow.style.gridTemplateColumns = '1.5% 72.375% 1.5% 23.125% 1.5%';
                largeRow.style.gridTemplateColumns = '1.5% 72.375% 1.5% 23.125% 1.5%';
                const bigCol = document.querySelector(`.large-1${r}0`)
                const bigColTop = document.querySelector(`.large-0${r}0`);
                bigCol.classList.add('cross-click');
                bigColTop.classList.add('cross-click');
                bigCol.style.backgroundImage = `url(${data.arr[r].img})`;
                bigCol.style.backgroundRepeat = 'no-repeat';
                gsap.to(bigCol, {duration: 1.5, backgroundSize: '100%'},0);
            }
            else {
                smallRow.style.gridTemplateColumns = '1.5% 23.125% 1.5% 72.375% 1.5%';
                largeRow.style.gridTemplateColumns = '1.5% 23.125% 1.5% 72.375% 1.5%';
                const bigCol = document.querySelector(`.large-1${r}1`);
                const bigColTop = document.querySelector(`.large-0${r}1`);
                bigCol.classList.add('cross-click');
                bigColTop.classList.add('cross-click');
                bigCol.style.backgroundImage = `url(${data.arr[r].img})`;
                bigCol.style.backgroundRepeat = 'no-repeat';
                gsap.to(bigCol, {duration: 1.5, backgroundSize: 'cover'},0);
            }
    
            crossClick = document.querySelectorAll('.cross-click');
            handleCrossClick();
        });
    });
    
}

function handleCrossClick() {
    crossClick.forEach((element) => {
        element.addEventListener('click', () => {
            const classNames = element.className.split(' ');
            console.log('Class names:', classNames);
            let rowCol = classNames[1];
            let r = rowCol[7];
            let c = rowCol[8];

            let row = document.querySelector(`.row-${r}`)
            let smallRow = document.querySelector(`.small-row-${r}`);
            let largeRow = document.querySelector(`.large-row-${r}`);

            smallRow.innerHTML = '';
            largeRow.innerHTML = '';

            for (let j = 0; j <= 4; j++) {
                let smallDiv = document.createElement('div');
                let bigDiv = document.createElement('div');
                smallDiv.className = `small small-0${r}${j}`;
                if(j==4){
                    smallRow.appendChild(smallDiv);
                    continue;
                } 
                bigDiv.className = `big large-0${r}${j}`;
                smallRow.appendChild(smallDiv);
                smallRow.appendChild(bigDiv);
            }

            for (let j = 0; j <= 4; j++) {
                let smallDiv = document.createElement('div');
                let bigDiv = document.createElement('div');
                smallDiv.className = `small small-1${r}${j}`;
                if(j==4){
                    largeRow.appendChild(smallDiv);
                    continue;
                } 
                bigDiv.className = `big large-1${r}${j}`;
                largeRow.appendChild(smallDiv);
                largeRow.appendChild(bigDiv);
            }

            smallRow.style.gridTemplateColumns = '1.5% 23.125% 1.5% 23.125% 1.5% 23.125% 1.5% 23.125% 1.5%';
            largeRow.style.gridTemplateColumns = '1.5% 23.125% 1.5% 23.125% 1.5% 23.125% 1.5% 23.125% 1.5%';
            gsap.to(row, {duration: 1.5, height: '35vh'}, 0);

            fillRowAfterClick(r,c);
        })
    })
}

function fillRowAfterClick(r,c) { 
    c = initialPositions[r][1];
    let bigCol = document.querySelector(`.large-1${r}${c}`);
    let smallCol = document.querySelector(`.large-0${r}${c}`);
    let smallEyeCol;
    if(c > 1) smallEyeCol = document.querySelector(`.small-0${r}${c}`);
    else smallEyeCol = document.querySelector(`.small-0${r}${c++}`);

    bigCol.classList.add('clickable');
    smallCol.classList.add('clickable');
    smallEyeCol.classList.add('clickable');

    bigCol.style.backgroundImage = `url(${data.arr[r].img})`;
    bigCol.style.backgroundSize = 'cover'
    console.log(data.arr[r].img);
    smallCol.textContent = data.arr[r].name;
    smallEyeCol.textContent = 'e';

    const clickables = document.querySelectorAll('.clickable');
    handleEyeClick(clickables);
}
