import React, { memo } from 'react';
var TableHeader = function (props) {
    var title = props.title;
    return React.createElement("header", null, title);
};
export default memo(TableHeader);
