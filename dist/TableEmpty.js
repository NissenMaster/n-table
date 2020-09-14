import React, { memo } from 'react';
import empty from './public/empty.png';
import { DEFAULT_NOTICE_STYLE, DEFAULT_EMPTY_STYLE } from './style';
var TableEmpty = function () {
    return (React.createElement("div", { style: DEFAULT_EMPTY_STYLE },
        React.createElement("div", null,
            React.createElement("img", { src: empty, alt: "", style: { height: 100, width: 100 } }),
            React.createElement("p", { style: DEFAULT_NOTICE_STYLE }, "\u6682\u65E0\u6570\u636E"))));
};
export default memo(TableEmpty);
