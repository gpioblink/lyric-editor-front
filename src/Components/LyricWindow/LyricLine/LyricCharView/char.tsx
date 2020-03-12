import React from 'react';
import styled from '@emotion/styled';
import {Colors, LyricChar} from "../../../../Redux/Store";

interface Props {
    char: LyricChar;
    colors: Colors;
}

export const LyricCharView: React.FC<Props> = ({char, colors}) => {
    const Layout = styled.div`
        background: yellow;
        .root {
            background: blue;
            display: inline-block;
            width: ${(char.char.match(/^[^\x01-\x7E\uFF65-\uFF9F]+$/)) ? "48px" : "24px"};
            height: 48px;
            overflow: hidden;
            font-family: monospace;
        }
        .outline {
            stroke-width: 6;
            stroke-linejoin: round;
            paint-order: stroke;
        }
    `;

    return (
        <Layout>
            <svg className="root" viewBox="0 0 48 48">
                <defs>
                    <linearGradient id="char" x1="0" y1="0">
                        <stop stopColor={`rgb(${colors.afterCharColor.red},${colors.afterCharColor.green},${colors.afterCharColor.blue})`}>
                            <animate attributeName="offset" values="0;1" dur={char.length/100} repeatCount="indefinite" />
                        </stop>
                        <stop stopColor={`rgb(${colors.beforeCharColor.red},${colors.beforeCharColor.green},${colors.beforeCharColor.blue})`} offset="0%"/>
                    </linearGradient>
                    <linearGradient id="outline" x1="0" y1="0">
                        <stop stopColor={`rgb(${colors.afterOutlineColor.red},${colors.afterOutlineColor.green},${colors.afterOutlineColor.blue}`}>
                            <animate attributeName="offset" values="0;1" dur={char.length/100} repeatCount="indefinite" />
                        </stop>
                        <stop stopColor={`rgb(${colors.beforeOutlineColor.red},${colors.beforeOutlineColor.green},${colors.beforeOutlineColor.blue})`} offset="0%"/>
                    </linearGradient>
                </defs>
                <text fill="url(#char)" stroke="url(#outline)" fontSize="40px" className="outline" x="50%" y="50%" textAnchor="middle" dominantBaseline="central">{char.char}</text>

            </svg>
        </Layout>
    )
};
