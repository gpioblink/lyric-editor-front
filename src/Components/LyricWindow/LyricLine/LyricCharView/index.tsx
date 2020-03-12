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
            display: inline-block;
            width: 250px;
            height: auto;
            overflow: visible;
            font-size: 50px;
        }
        .outline {
            stroke-width: 5;
            stroke-linejoin: round;
            paint-order: stroke;
        }
    `;

    // カラオケの表示には線形アニメーション使うのがいいらしい？ http://okiru.net/misc/20160214/
    return (
        <Layout>
            <svg className="root" viewBox="0 0 200 100">
                <defs>
                    <linearGradient id="char" x1="0" y1="0">
                        <stop stopColor={`rgb(${colors.afterCharColor.red},${colors.afterCharColor.green},${colors.afterCharColor.blue})`}>
                            <animate attributeName="offset" values="0;1" dur={char.length/10} repeatCount="indefinite" />
                        </stop>
                        <stop stopColor={`rgb(${colors.beforeCharColor.red},${colors.beforeCharColor.green},${colors.beforeCharColor.blue})`} offset="0%"/>
                    </linearGradient>
                    <linearGradient id="outline" x1="0" y1="0">
                        <stop stopColor={`rgb(${colors.afterOutlineColor.red},${colors.afterOutlineColor.green},${colors.afterOutlineColor.blue}`}>
                            <animate attributeName="offset" values="0;1" dur={char.length/10} repeatCount="indefinite" />
                        </stop>
                        <stop stopColor={`rgb(${colors.beforeOutlineColor.red},${colors.beforeOutlineColor.green},${colors.beforeOutlineColor.blue})`} offset="0%"/>
                    </linearGradient>
                </defs>
                <text fill="url(#char)" stroke="url(#outline)" className="outline" x="0" y="50%">{char.char}</text>

            </svg>
        </Layout>
    )
};
