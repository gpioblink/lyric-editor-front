import React from 'react';
import {LyricCharView} from "../Components/LyricWindow/LyricLine/LyricCharView/char";
import {Colors, LyricChar} from "../Redux/Store";
import {LyricCharLineView} from "../Components/LyricWindow/LyricLine/LyricCharView";
import {ColorData} from "./10-LyricCharView.stories";

export default {
    title: 'LyricCharLineView',
    components: LyricCharLineView,
    excludeStories: /.*Data$/,
}

export const CharsData: LyricChar[] = [
    {
        "length": 48,
        "char": "小"
    },
    {
        "length": 48,
        "char": "鮒"
    },
    {
        "length": 48,
        "char": "釣"
    },
    {
        "length": 36,
        "char": "り"
    },
    {
        "length": 38,
        "char": "し"
    },
    {
        "length": 44,
        "char": "か"
    },
    {
        "length": 44,
        "char": "の"
    },
    {
        "length": 48,
        "char": "川"
    }
];

export const Default = () => (
  <LyricCharLineView chars={CharsData} colors={ColorData}/>
);
