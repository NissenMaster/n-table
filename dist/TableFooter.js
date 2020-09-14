import React, { memo } from 'react';
var TableFooter = function (props) {
    var footer = props.footer;
    return React.createElement("footer", null, footer);
};
export default memo(TableFooter);
