import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { NONE } from 'phaser';

function App() {
  const [resultArray, setResultArray] = useState([]);
  const [upDice, setUpDice] = useState([]);
  const [count, setCount] = useState(3);
  const [player, setPlayer] = useState('A');
  const [scoreOfA, setscoreOfA] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const [scoreOfB, setscoreOfB] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const [sum, setSum] = useState(0);
  const [numberDice, setnumberDice] = useState(5);

  const changePlayer = () => {
    if(player === 'A'){
      setPlayer('B');
    }
    else {
      setPlayer('A');
    }
  }
  
  const rollingDice = () => {
    for(let i = 0; i < numberDice; i ++){
      let copy = [...resultArray];
      copy[i] = resultArray[i] = Math.floor(Math.random()*6)+1;
      setResultArray(copy);
    }
    let copyCount = count;
    copyCount --;
    setCount(copyCount);
    console.log('rolling!');
  }

  const resetDice = () => {
    setResultArray([]);
    setUpDice([]);
    setCount(3);
    setnumberDice(5);
    console.log('reset!');
  }

  const removeDice = (i) =>{
    let copyResult = [...resultArray];
    let copyUp = [...upDice];
    let copyNumber = numberDice;
    if(copyResult[i] != undefined){
      copyUp.push(copyResult[i]);
      setUpDice(copyUp);
      copyNumber--;
      setnumberDice(copyNumber);
    }
    copyResult.splice(i, 1);
    setResultArray(copyResult);
    console.log('remove!', i);
  }

  const errorImg = (e) => {
    e.target.src = '/src/X.png';
  }

  const upScore = (i) => {
    if (upDice.length !== 5) {
      return console.log("why touch me?");
    }

    let calculator = [];
    let copySum = 0;

    switch (i) {
      case 0: //aces
        calculator = upDice.filter(val => val === 1);
        copySum = calculator.length;
        break;
      case 1: //deuces
        calculator = upDice.filter(val => val === 2);
        copySum = calculator.length*2;
        break;
      case 2: //threes
        calculator = upDice.filter(val => val === 3);
        copySum = calculator.length*3;
        break;
      case 3: //fours
        calculator = upDice.filter(val => val === 4);
        copySum = calculator.length*4;
        break;
      case 4: //fives
        calculator = upDice.filter(val => val === 5);
        copySum = calculator.length*5;
        break;
      case 5: //sixes
        calculator = upDice.filter(val => val === 6);
        copySum = calculator.length*6;
        break;
      case 7: //4 of a Kind
        for (let i = 1; i <= 6; i++) {
          calculator = upDice.filter(val => val === i);
          if (calculator.length >= 4) {
            copySum = calculator[0] * 4;
            break;
          }
        }
        break;
      case 8: //Full House
        for (let i = 1; i <= 6; i++) {
          calculator = upDice.filter(val => val === i);
          if (calculator.length >= 3) {
            copySum = calculator[0] * 3;
            calculator = [];
            for (let j = 1; j <= 6; j++) {
              if (j !== i) {
                calculator = upDice.filter(val => val === j);
                if (calculator.length >= 2) {
                  copySum += calculator[0] * 2;
                  break;
                }
              }
            }
            break;
          }
        }
        break;
      case 9: //S. straight
        let parameterS = 0;
        for(let i=1; i<=5; i++){
          if(upDice.filter(val => val === i).length > 0){
            parameterS ++;
            continue;
          }
        }
        copySum = parameterS === 5? 30:0;
        break;
      case 10: //L. straight
        let parameterL = 0;
        for(let i=2; i<=6; i++){
          if(upDice.filter(val => val === i).length > 0){
            parameterL ++;
            continue;
          }
        }
      copySum = parameterL === 5? 30:0;
      break;
      case 11: //Yacht
        for(let i = 1; i<=6; i++){
          if(upDice.filter(val => val === i).length === 5){
            copySum = 50;
          }
        }
        break;
      default:
        console.log('error');
        break;
    }

    setSum(copySum);

    let scoreSum = 0;
    if (player === 'A') {
      const copyA = [...scoreOfA];
      copyA[i] = copySum;
      for (let j = 0; j < 6; j++) {
        scoreSum += copyA[j];
      }
      copyA[6] = scoreSum;
      scoreSum = 0;
      for (let j = 7; j < 12; j++) {
        scoreSum += copyA[j];
      }
      copyA[12] = scoreSum;
      setscoreOfA(copyA);
    } else {
      const copyB = [...scoreOfB];
      copyB[i] = copySum;
      for (let j = 0; j < 6; j++) {
        scoreSum += copyB[j];
      }
      copyB[6] = scoreSum;
      scoreSum = 0;
      for (let j = 7; j < 12; j++) {
        scoreSum += copyB[j];
      }
      copyB[12] = scoreSum;
      setscoreOfB(copyB);
    }

    resetDice();
    changePlayer();
  };


  return (
    <>
      <header>
        <nav className="navbar sticky-top bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand">Yacht</a>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="user-ID" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </nav>
      </header>
      <main>
        <section>
          <ul>
            <li>User</li>
            <li>A</li>
            <li>B</li>
          </ul>
          <ol>
            <ul>
              <li className='scoreCheck' onClick={() => upScore(0)}>aces</li>
              <li>{scoreOfA[0]}</li>
              <li>{scoreOfB[0]}</li>
            </ul>
            <ul>
              <li className='scoreCheck' onClick={() => upScore(1)}>deuces</li>
              <li>{scoreOfA[1]}</li>
              <li>{scoreOfB[1]}</li>
            </ul>
            <ul>
              <li className='scoreCheck' onClick={() => upScore(2)}>threes</li>
              <li>{scoreOfA[2]}</li>
              <li>{scoreOfB[2]}</li>
            </ul>
            <ul>
              <li className='scoreCheck' onClick={() => upScore(3)}>fours</li>
              <li>{scoreOfA[3]}</li>
              <li>{scoreOfB[3]}</li>
            </ul>
            <ul>
              <li className='scoreCheck' onClick={() => upScore(4)}>fives</li>
              <li>{scoreOfA[4]}</li>
              <li>{scoreOfB[4]}</li>
            </ul>
            <ul>
              <li className='scoreCheck' onClick={() => upScore(5)}>sixes</li>
              <li>{scoreOfA[5]}</li>
              <li>{scoreOfB[5]}</li>
            </ul>
            <ul>
              <li>total</li>
              <li>{scoreOfA[6]}</li>
              <li>{scoreOfB[6]}</li>
            </ul>
          </ol>
          <ol>  
            <ul>
              <li className='scoreCheck' onClick={() => upScore(7)}>4 of a Kind</li>
              <li>{scoreOfA[7]}</li>
              <li>{scoreOfB[7]}</li>
            </ul>
            <ul>
              <li className='scoreCheck' onClick={() => upScore(8)}>Full House</li>
              <li>{scoreOfA[8]}</li>
              <li>{scoreOfB[8]}</li>
            </ul>
            <ul>
              <li className='scoreCheck' onClick={() => upScore(9)}>S. straight</li>
              <li>{scoreOfA[9]}</li>
              <li>{scoreOfB[9]}</li>
            </ul>
            <ul>
              <li className='scoreCheck' onClick={() => upScore(10)}>L. straight</li>
              <li>{scoreOfA[10]}</li>
              <li>{scoreOfB[10]}</li>
            </ul>
            <ul>
              <li className='scoreCheck' onClick={() => upScore(11)}>Yacht</li>
              <li>{scoreOfA[11]}</li>
              <li>{scoreOfB[11]}</li>
            </ul>
            <ul>
              <li>total</li>
              <li>{scoreOfA[12]}</li>
              <li>{scoreOfB[12]}</li>
            </ul>
          </ol>
        </section>
        <div className='boardDiv'>
            <ul className='storeDice'>
              <li><img src={`/src/D${String(upDice[0])}.png`} onError={errorImg}/></li>
              <li><img src={`/src/D${String(upDice[1])}.png`} onError={errorImg}/></li>
              <li><img src={`/src/D${String(upDice[2])}.png`} onError={errorImg}/></li>
              <li><img src={`/src/D${String(upDice[3])}.png`} onError={errorImg}/></li>
              <li><img src={`/src/D${String(upDice[4])}.png`} onError={errorImg}/></li>
            </ul>
            <div></div>
            <ul className='randomDice'>
              <li onClick={() => removeDice(0)}><img src={`/src/D${String(resultArray[0])}.png`} onError={errorImg}/></li>
              <li onClick={() => removeDice(1)}><img src={`/src/D${String(resultArray[1])}.png`} onError={errorImg}/></li>
              <li onClick={() => removeDice(2)}><img src={`/src/D${String(resultArray[2])}.png`} onError={errorImg}/></li>
              <li onClick={() => removeDice(3)}><img src={`/src/D${String(resultArray[3])}.png`} onError={errorImg}/></li>
              <li onClick={() => removeDice(4)}><img src={`/src/D${String(resultArray[4])}.png`} onError={errorImg}/></li>
            </ul>
            <p>머가 떴을까용~</p>
        </div>
      </main>
      <footer>
        <button type="button" className="btn btn-outline-danger btn-lg" onClick={rollingDice}>주사위 굴리기</button>
        <button id='reset' type="button" className="btn btn-outline-danger btn-lg" onClick={resetDice} disabled>{`남은횟수 : ${count}`}</button>
      </footer>
    </>
  )
} 

export default App
