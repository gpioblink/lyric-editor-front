import {Lyric, PlayStatus, Point} from "./Store";

export type Action =
    | {
        type: 'IMPORT_FME';
        lyric: Lyric;
      }
    | {
        type: 'NEXT_PAGE';
      }
    | {
        type: 'PREVIOUS_PAGE';
      }
    | {
        type: 'PLAY_STATUS';
        playState: PlayStatus;
      }
    | {
        type: 'CHANGE_LINE_POINT';
        index: number;
        point: Point;
      }
    | {
        type: 'CHANGE_LINE_CHAR';
        index: number;
        string: string;
      }
    | {
        type: 'CHANGE_CHAR_TIME';
        lineIndex: number;
        charIndex: number;
        time: number;
      }
    | {
        type: 'CHANGE_RUBY_POINT';
        lineIndex: number;
        rubyIndex: number;
        fedx: number;
      }
    | {
        type: 'CHANGE_RUBY';
        lineIndex: number;
        rubyIndex: number;
        string: string;
      };
