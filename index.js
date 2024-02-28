const but = document.getElementsByClassName('clicker');
const len = but.length;

let cnt = 1;
let x = [];
let o = [];
let winningSet = [[1, 2, 3], [1, 4, 7], [1, 5, 9], [2, 5, 8], [3, 5, 7], [3, 6, 9], [4, 5, 6], [7, 8, 9]];



for (let i = 0; i < len; i++) {
    but[i].addEventListener('click', function () {
        let botton = but[i].getAttribute('value');
        let check = 0;

        

        for(let j=0; j<x.length || j<o.length; j++){
            if(x[j]===botton){
                check=1;
                break;
            }
            if(o[j]===botton){
                check=1;
                break;
            }
        }
        if(check === 1){
            return;
        }

        if ((cnt % 2) == 0) {
            but[i].innerHTML = 'X';
            x.push(botton);
        } else {
            but[i].innerHTML = 'O';
            o.push(botton);
        }
        x.sort();
        o.sort();
        winningSet.forEach(function (val) {
            let a = [],b= [];
            for(let i = 0; i<val.length; i++){
                for(let j=0; j<o.length; j++){
                    if(val[i]==o[j]){
                        a.push(val[i]);
                    }
                }
            }
            
            if(a.toString() == val){
                console.log('yeah');
                document.getElementById('head').innerText = 'O WINS';
                return;
            }
            for(let i = 0; i<val.length; i++){
                for(let j=0; j<x.length; j++){
                    if(val[i]==x[j]){
                        b.push(val[i]);
                    }
                }
            }
            if(b.toString() == val){
                document.getElementById('head').innerText = 'X WINS';
                return;
            }
        });
        if(cnt>=9){
            document.getElementById('head').innerText = 'DRAW';
            return;
        }
        cnt++;
    });
}

