import React, { Component } from 'react';
import Barcode from "react-barcode";
import saveSvgAsPng from "save-svg-as-png";

class JsBarcodes extends Component {

    render() {
        const uuidv1 = require('uuid/v1'); // tao uuid;
        let idBarCode=uuidv1();
        saveSvgAsPng(document.getElementById("idBarCode"), "diagram.png");
        return (
            <React.Fragment>
      <Barcode value="mj4354"  id="idBarCode" />
            </React.Fragment>
        );
    }
}

export default JsBarcodes;