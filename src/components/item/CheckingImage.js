import React, { Component } from 'react';
import PrintJob from 'print-job';
import * as type from './../../constants';
class CheckingImage extends Component {
      printImage = () => {
            PrintJob.image(type.CLOUDINARY_URL_CDN+'DK1882.jpg');
      }
      render() {
            return (
                  <React.Fragment>
                        <img className="checking-img-cdn" src={type.CLOUDINARY_URL_CDN+'DK1882.jpg'} alt="" />
                        <button type="button" className="btn btn-success checking-print" onClick={this.printImage}>Print</button>

                  </React.Fragment>
            );
      }
}

export default CheckingImage;