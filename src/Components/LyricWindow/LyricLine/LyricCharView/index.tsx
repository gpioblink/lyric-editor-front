import React, {createRef, useCallback, useState} from 'react';
import {Colors, LyricChar, Ruby} from "../../../../Redux/Store";
import styled from "@emotion/styled";
import {useDispatch} from "redux-react-hook";
import {Action} from "../../../../Redux/Actions";

interface Props {
    lineIndex: number;
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

.no-edit {
  display: none;
}

.ruby-input {
  width: 100%;
  height: 20%;
  position: absolute;
  background: white;
  z-index: 100;
  outline: none;
  font-weight: bold;
  opacity: .9;
}

.char-input {
  top: 20%;
  width: 100%;
  height: 80%;
  position: absolute;
  background: white;
  z-index: 100;
  outline: none;
  font-weight: bold;
  opacity: .9;
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
    const dur = calcCharsDuration(chars).length;
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
    return string;
};

export const LyricCharLineView: React.FC<Props> = ({lineIndex, chars, rubys, colors}) => {
    const dur = calcCharsDuration(chars).length / 100;
    const allString = calcCharsDuration(chars).char;
    const offsetValues = calcEqualSpitedParentageValues(chars.length);
    const keyTimes = calcKeyTimes(chars);
    const charWidth = chars.length * 48;

    const dispatch = useDispatch();
    const [rubyEditState, setRubyEditState] = useState<boolean>(false);
    const [rubyEditText, setRubyEditText] = useState<string>(rubys.reduce((prev, curr) => { return {fedx:0, string: `${prev.string}${curr.string}`}}).string);
    const [charEditState, setCharEditState] = useState<boolean>(false);
    const [charEditText, setCharEditText] = useState<string>(allString);

    const sendRuby = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            const rubyStringChar = rubyEditText.split(",");
            rubyStringChar.forEach((ruby, rubyIndex) => {
                dispatch({
                    type: 'CHANGE_RUBY',
                    lineIndex: lineIndex,
                    rubyIndex: rubyIndex,
                    string: ruby,
                } as Action);
            });
        }
    };

    const sendChar = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            dispatch({
                type: 'CHANGE_LINE_CHAR',
                index: lineIndex,
                string: charEditText
            } as Action);
        }
    };

    return (
        <Layout>
            <input onKeyPress={sendRuby} onChange={(e) => setRubyEditText(e.target.value)} onBlur={() => setRubyEditState(false)} className={`ruby-input ${rubyEditState ? '' : 'no-edit'}`} value={rubyEditText} />
            <input onKeyPress={sendChar} onChange={(e) => setCharEditText(e.target.value)} onBlur={() => setCharEditState(false)} className={`char-input ${charEditState ? '' : 'no-edit'}`} value={charEditText} />
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
                    <rect x="0" y="0" width="100%" height="12" fillOpacity="0" onClick={() => setRubyEditState(true)}/>
                    <rect x="0" y="12" width="100%" height="48" fillOpacity="0" onClick={() => setCharEditState(true)}/>
            </svg>
        </Layout>
    );
};
