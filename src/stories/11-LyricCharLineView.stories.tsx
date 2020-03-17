import React from 'react';
import {Colors, LyricChar, Ruby} from "../Redux/Store";
import {LyricCharLineView} from "../Components/LyricWindow/LyricLine/LyricCharView";

export default {
    title: 'LyricCharLineView',
    components: LyricCharLineView,
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

export const RubyData: Ruby[] = [
    {
        "fedx": 12,
        "string": "こ"
    },
    {
        "fedx": 48,
        "string": "ぶな"
    },
    {
        "fedx": 108,
        "string": "つ"
    },
    {
        "fedx": 306,
        "string": "かわ"
    }
];

export const Default = () => (
  <LyricCharLineView chars={CharsData} rubys={RubyData} colors={ColorData}/>
);
