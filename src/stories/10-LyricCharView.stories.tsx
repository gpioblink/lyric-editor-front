import React from 'react';
import {LyricCharView} from "../Components/LyricWindow/LyricLine/LyricCharView";
import {Colors, LyricChar} from "../Redux/Store";

export default {
    title: 'LyricCharView',
    components: LyricCharView,
    excludeStories: /.*Data$/,
}

export const ColorData: Colors = {
    "beforeCharColor": {
        "red": 255,
        "green": 255,
        "blue": 255
    },
    "afterCharColor": {
        "red": 180,
        "green": 0,
        "blue": 0
    },
    "beforeOutlineColor": {
        "red": 8,
        "green": 8,
        "blue": 8
    },
    "afterOutlineColor": {
        "red": 255,
        "green": 255,
        "blue": 255
    }
};

export const CharData: LyricChar = {
    "length": 12,
    "char": "あ"
};

export const Default = () => (
  <LyricCharView char={CharData} colors={ColorData}/>
);
