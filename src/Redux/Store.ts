import {createStore} from 'redux';
import reducer from "./Reducers";

export type PlayStatus = 'ALL' | 'LINE' | 'NONE';

export type Lyric = {
    view: LyricBlock[];
}

export type Color = {
    red: number;
    green: number;
    blue: number;
};

export type LyricChar = {
    length: number;
    char: string;
}

export type Ruby = {
    fedx: number;
    string: string;
}

export type Point = {
    x: number;
    y: number;
}

export type LyricBlock = {
    point: Point;
    colors: {
        beforeCharColor: Color;
        afterCharColor: Color;
        beforeOutlineColor: Color;
        afterOutlineColor: Color;
    };
    lyric: LyricChar[];
    ruby: Ruby[];
};

export interface IState {
    play: PlayStatus;
    currentPage: number;
    editedLyric: Lyric;
    originalLyric: Lyric;
}

export const initialState:IState = {
    currentPage: 0,
    play: 'NONE',
    editedLyric: { view: [] },
    originalLyric: { view: [] },
};

export function makeStore() {
    return createStore(reducer, initialState);
}
