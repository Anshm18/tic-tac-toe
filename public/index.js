const socket = io("ws://localhost:3000");
const but = document.getElementsByTagName("input");
const len = but.length;

const frm = document.querySelector(".container2");
const bt = document.querySelector('.btn');

bt.addEventListener('click',(e)=>{
    e.preventDefault();
    frm.style.setProperty('visibility','hidden');
})

let cnt = 1;
let users = [];
let x = [];
let o = [];
let winningSet = [[1, 2, 3], [1, 4, 7], [1, 5, 9], [2, 5, 8], [3, 5, 7], [3, 6, 9], [4, 5, 6], [7, 8, 9]];

for(let i=0; i<len; i++){
    but[i].addEventListener('click',(ev)=>{
        ev.preventDefault();
        socket.emit('event',i);
    })
}

socket.on('users',id=>{
    users.push(id);
})
socket.on('OeventOccured',(i)=>{
    
    let check = 0;
    for(let j=0; j<x.length || j<o.length; j++){
        if (x[j] === but[i].getAttribute('name')) {
            check = 1;
            break;
        }
        if (o[j] === but[i].getAttribute('name')) {
            check = 1;
            break;
        }
    }
    if(check === 0 && cnt%2 !== 0){
        but[i].value = 'O';
        o.push(but[i].getAttribute('name'));
        cnt++;
    }
    checkWinner();
})
socket.on('XeventOccured',(i)=>{
    let check = 0;
    for(let j=0; j<x.length || j<o.length; j++){
        if (x[j] === but[i].getAttribute('name')) {
            check = 1;
            break;
        }
        if (o[j] === but[i].getAttribute('name')) {
            check = 1;
            break;
        }
    }
    if(check === 0 && cnt%2 === 0){
        but[i].value = 'X';
        x.push(but[i].getAttribute('name'));
        cnt++;
    }
    checkWinner();
})


function checkWinner(){
    let check = 0;
    x.sort();
    o.sort();

    winningSet.forEach(function (val) {
        let a = [], b = [];
        for (let i = 0; i < val.length; i++) {
            for (let j = 0; j < o.length; j++) {
                if (val[i] == o[j]) {
                    a.push(val[i]);
                }
            }
        }

        if (a.toString() == val) {
            document.querySelector('#head').innerText = 'O WINS';;
            socket.off('OeventOccured');
            socket.off('XeventOccured');
            check++;
        }
        for (let i = 0; i < val.length; i++) {
            for (let j = 0; j < x.length; j++) {
                if (val[i] == x[j]) {
                    b.push(val[i]);
                }
            }
        }
        if (b.toString() == val) {
            document.querySelector('#head').innerText = 'X WINS';
            socket.off('OeventOccured');
            socket.off('XeventOccured')
            check++;
        }
    });
    if (cnt > 9 && check === 0) {
        document.getElementById('head').innerText = 'DRAW';
        socket.off('OeventOccured');
        socket.off('XeventOccured')
    }
}