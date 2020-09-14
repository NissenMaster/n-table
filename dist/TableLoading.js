import React, { memo } from 'react';
import loading from './public/loading.svg';
import { DEFAULT_NOTICE_STYLE, DEFAULT_EMPTY_STYLE } from './style';
var TableLoading = function () {
    return (React.createElement("div", { style: DEFAULT_EMPTY_STYLE },
        React.createElement("div", null,
            React.createElement("div", { style: DEFAULT_NOTICE_STYLE },
                React.createElement("img", { src: loading, alt: "", style: { height: 40, width: 40 } })),
            React.createElement("p", { style: DEFAULT_NOTICE_STYLE }, "\u6570\u636E\u52A0\u8F7D\u4E2D\uFF0C\u8BF7\u7A0D\u540E..."))));
};
export default memo(TableLoading);
