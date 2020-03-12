import {initialState, IState, LyricBlock, LyricChar, Ruby} from "../Store";
import {Action} from "../Actions";

const calcPlayTime = (chars: LyricChar[]): number => {
    const combinedCalc = chars.reduce((prev, current) => {
        return {
            length: prev.length + current.length,
            char: prev.char + current.char
        }
    });
    return combinedCalc.length;
};

const createLeveledLyricCharArray = (chars: string, time: number): LyricChar[] => {
    const oneTime = Math.floor(time / chars.length);
    const extraTime = time - oneTime * chars.length;
    return Array.from(chars).map<LyricChar>((char, index) => {
        if(index === chars.length -1) {
            // 誤差が出る場合は最後にくっつける
            return {char: char, length: oneTime + extraTime}
        }
       return {char: char, length: oneTime}
    });
};

export default function reducer(
    state: IState | null | undefined,
    action: Action
): IState {
    if(!state) {
        return initialState;
    }

    switch(action.type) {
        case "IMPORT_FME": {
            return {
                ...initialState,
                editedLyric: action.lyric,
                originalLyric: action.lyric
            }
        }

        case "NEXT_PAGE": {
            return {
                ...state,
                currentPage: Math.min(state.currentPage + 1, state.editedLyric.view.length)
            }
        }

        case "PREVIOUS_PAGE": {
            return {
                ...state,
                currentPage: Math.max(state.currentPage - 1, 0)
            }
        }

        case "PLAY_STATUS": {
            return {
                ...state,
                play: action.playState
            }
        }

        case "CHANGE_LINE_POINT": {
            const editedLyric = state.editedLyric.view.map((item, index) => {
                if(index !== action.index) {
                    return item
                }
                return {
                    ...item,
                    point: action.point
                }
            });
            return {...state, editedLyric: {...state.editedLyric, view: editedLyric} }
        }

        case "CHANGE_LINE_CHAR": {
            const editedLyric = state.editedLyric.view.map<LyricBlock>((item, index) => {
                if(index !== action.index) {
                    return item
                }
                // そのChar内の合計時間を変えないようにして文字数に表示時間を均等に割り振る
                const time = calcPlayTime(item.lyric);
                const chars = createLeveledLyricCharArray(action.string, time);
                return {...item, lyric: chars}
            });
            return {...state, editedLyric: {...state.editedLyric, view: editedLyric}}
        }

        case "CHANGE_RUBY": {
            const editedLyric = state.editedLyric.view.map<LyricBlock>((item, index) => {
                if (index !== action.lineIndex) {
                    return item
                }

                const editedRuby = item.ruby.map<Ruby>((ruby, index) => {
                    if(index !== action.rubyIndex) {
                        return ruby;
                    }
                    return {...ruby, string: action.string}
                });

                return {...item, ruby: editedRuby}
            });
            return {...state, editedLyric: {...state.editedLyric, view: editedLyric}}
        }

        case "CHANGE_RUBY_POINT": {
            const editedLyric = state.editedLyric.view.map<LyricBlock>((item, index) => {
                if (index !== action.lineIndex) {
                    return item
                }

                const editedRuby = item.ruby.map<Ruby>((ruby, index) => {
                    if(index !== action.rubyIndex) {
                        return ruby;
                    }
                    return {...ruby, fedx: action.fedx}
                });

                return {...item, ruby: editedRuby}
            });
            return {...state, editedLyric: {...state.editedLyric, view: editedLyric}}
        }

        case "CHANGE_CHAR_TIME": {
            const editedLyric = state.editedLyric.view.map<LyricBlock>((item, index) => {
                if(index !== action.lineIndex) {
                    return item
                }

                // 変化量が前後の枠に収まっていなっかったら何もしない
                if(item.lyric[action.charIndex-1].length + action.time < 0
                    || item.lyric[action.charIndex].length - action.time < 0){
                   return item
                }

               const editedLyricChar = item.lyric.map<LyricChar>((char, index) => {
                   // 移動した文字の1つ前の文字から時間を引き、移動した文字にその時間を加える
                   if(index === action.charIndex - 1) {
                       return {...char, length: char.length + action.time};
                   } else if (index === action.charIndex) {
                       return {...char, length: char.length - action.time};
                   }
                   return char;
               });
                return {...item, lyric: editedLyricChar}
            });
            return {...state, editedLyric: {...state.editedLyric, view: editedLyric}}
        }

        default: {
            return state;
        }
    }
}
