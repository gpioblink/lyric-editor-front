import React from 'react';
import {Colors, LyricChar, Ruby} from "../../../../Redux/Store";
import styled from "@emotion/styled";

interface Props {
    chars: LyricChar[];
    rubys: Ruby[];
    colors: Colors;
}

const Layout = styled.div`
font-family: "IPAGothic", sans-serif;
background: #000;
position: relative;

tspan {
  alignment-baseline: text-after-edge;
}

svg {
  max-height: 90vh;
  margin: 5vh auto;
  display: block;
}

.ruby-input {
  width: 100%;
  height: 20%;
  display: block;
  border: 3%;
  position: absolute;
  background: white;
  z-index: 100;
  outline: none;
  font-size: 1.5em;
  font-weight: bold;
  color: #aaa;
}

.char-input {
  top: 20%;
  width: 100%;
  height: 80%;
  display: block;
  border: 3%;
  position: absolute;
  background: white;
  z-index: 100;
  outline: none;
  font-size: 1.5em;
  font-weight: bold;
  color: #aaa;
}

line {
  stroke: red;
  stroke-width: .5px;
  stroke-dasharray: 3px;
}

.outline {
  stroke-width: 6;
  stroke-linejoin: round;
  paint-order: stroke;
}
`;

const calcEqualSpitedParentageValues = (amount: number) => {
    const parentageArray: number[] = [];
    for(let i=0; i<=amount; i++) {
        parentageArray.push(i/amount);
    }
    return parentageArray;
};

const calcKeyTimes = (chars: LyricChar[]) => {
    const dur = calcCharsDuration(chars);
    let currentDur = 0;
    const numbers = chars.map<number>(char => {
        const current = currentDur / dur;
        currentDur += char.length;
        return current;
    });
    numbers.push(1);
    return numbers;
};

const calcCharsDuration = (chars: LyricChar[]) => {
    const string = chars.reduce((prevChar, currentChar) => {
        return {length: prevChar.length + currentChar.length, char: `${prevChar.char}${currentChar.char}`};
    });
    return string.length;
};

export const LyricCharLineView: React.FC<Props> = ({chars, rubys, colors}) => {
    const dur = calcCharsDuration(chars) / 100;
    const offsetValues = calcEqualSpitedParentageValues(chars.length);
    const keyTimes = calcKeyTimes(chars);
    const charWidth = chars.length * 48;
    return (
        <Layout>
            <input className="ruby-input"/>
            <input className="char-input"/>
            <svg viewBox={`0 0 ${charWidth} 60`}>
                    <defs>
                        <linearGradient id="char" x1="0" x2="100%" calcMode="linear" y1="0" y2="0">
                            <stop stopColor={`rgb(${colors.afterCharColor.red},${colors.afterCharColor.green},${colors.afterCharColor.blue})`} offset="100%">
                                <animate attributeName="offset" values={offsetValues.join(";")} keyTimes={keyTimes.join(";")} dur={dur} repeatCount="3"/>
                            </stop>
                            <stop stopColor={`rgb(${colors.beforeCharColor.red},${colors.beforeCharColor.green},${colors.beforeCharColor.blue})`} offset="0"/>
                        </linearGradient>
                        <linearGradient id="outline" x1="0" x2="100%" y1="0" y2="0">
                            <stop stopColor={`rgb(${colors.afterOutlineColor.red},${colors.afterOutlineColor.green},${colors.afterOutlineColor.blue}`} offset="100%">
                                <animate attributeName="offset" values={offsetValues.join(";")} keyTimes={keyTimes.join(";")} dur={dur} repeatCount="3"/>
                            </stop>
                            <stop stopColor={`rgb(${colors.beforeOutlineColor.red},${colors.beforeOutlineColor.green},${colors.beforeOutlineColor.blue})`} offset="0"/>
                        </linearGradient>
                    </defs>
                    <text className="outline" fill="url(#char)" stroke="url(#outline)" width={charWidth} height="60">
                        {rubys.map(ruby => {
                            return <tspan fontSize="12" x={ruby.fedx} y="12">{ruby.string}</tspan>;
                        })}
                        {chars.map((char, index) => {
                            return <tspan fontSize="48" x={index*48} y="60">{char.char}</tspan>;
                        })}
                    </text>
                    <rect x="0" y="0" width="100%" height="12" fillOpacity="0" onClick={() => console.log("ruby clicked")}/>
                    <rect x="0" y="12" width="100%" height="48" fillOpacity="0" onClick={() => console.log("chars clicked")}/>
            </svg>
        </Layout>
    );
};
