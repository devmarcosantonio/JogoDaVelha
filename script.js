tabuleiro = [ '', '', '',
              '', '', '',
              '', '', '' ]

let x_or_o = 'X'

let pontosO = 0;
let pontosX = 0;

const modal = document.querySelector('.modal')

function loaded_placar() {

    pontosO = Number(localStorage.getItem('O'))
    pontosX = Number(localStorage.getItem('X'))
    
    let placarX = document.getElementById('pontosX')
    let placarO = document.getElementById('pontosO')
    
    placarX.innerText = pontosX
    placarO.innerText = pontosO
}

function clicked(square) {
    if (tabuleiro[square.className[7]] == ''){
        if (x_or_o =='X') {
            x_or_o = 'O'
        } else {
            x_or_o = 'X'
        }

        square.innerText = x_or_o
        tabuleiro[square.className[7]] = x_or_o
    
        const ganhou = verificar_se_ganhou()

        if (ganhou == true) {
            if (x_or_o == 'X'){
                pontosX++
                localStorage.setItem('X', String(pontosX))
                loaded_placar()
            } else {
                pontosO++
                localStorage.setItem('O', String(pontosO))
                loaded_placar()
            }

            alert(x_or_o+' Ganhou')
            loaded_placar()
            limpar_tabuleiro()
        }    

        let teste_velha = 0;
        for (let i = 0; i <= 8; i++) {
            if (tabuleiro[i] == '' || tabuleiro == undefined){
                teste_velha++
            }
        }

        if(teste_velha == 0) {
            limpar_tabuleiro()
            alert('Deu velha!')
        }
    } else {
        alert('erro!')
    }
}


function verificar_se_ganhou(){
    ganhou = false
    for (let x=0; x<=8; x+=3){
        if(tabuleiro[x] == tabuleiro[x+1] && tabuleiro[x] == tabuleiro[x+2]
            && tabuleiro[x] != '' && tabuleiro[x+1] != '' && tabuleiro[x+2] != ''){
            ganhou = true
            break
        }
    }

    for (let y=0; y<=8; y++) {
        if(tabuleiro[y] == tabuleiro[y+3] && tabuleiro[y] == tabuleiro[y+6]
            && tabuleiro[y] != '' && tabuleiro[y+3] != '' && tabuleiro[y+6] != ''){
            ganhou = true
            break
        }
    }

    if (tabuleiro[0] == tabuleiro[4] && tabuleiro[0] == tabuleiro[8] 
        && tabuleiro[0]!='' && tabuleiro[4] !='' && tabuleiro[8] != ''){
            ganhou = true;
    }
    
    if (tabuleiro[2] == tabuleiro[4] && tabuleiro[2] == tabuleiro[6] 
        && tabuleiro[2]!='' && tabuleiro[4] !='' && tabuleiro[6] != ''){
            ganhou = true;
    }

    return ganhou
}


function limpar_tabuleiro () {
    for (let i=0; i<=9; i++) {
        tabuleiro[i] = ''
    }

    document.querySelectorAll('.square').forEach(element => {
        element.innerText = ''    
    })
}

function resetar() {
    localStorage.setItem('X', '0')
    localStorage.setItem('O', '0')
    loaded_placar()
}