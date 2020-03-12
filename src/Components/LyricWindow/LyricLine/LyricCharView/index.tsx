import React from 'react';
import {Colors, LyricChar} from "../../../../Redux/Store";
import styled from "@emotion/styled";
import {LyricCharView} from "./char";

interface Props {
    chars: LyricChar[];
    colors: Colors;
}

const Layout = styled.div`
    display: flex;
`;

export const LyricCharLineView: React.FC<Props> = ({chars, colors}) => {
    // この実装だとアニメーションがヤバイ。。。
    return (
        <Layout>
            {chars.map(char => {
                return <LyricCharView char={char} colors={colors}/>;
            })}
        </Layout>
    );
}
