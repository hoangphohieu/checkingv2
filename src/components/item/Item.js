import React, { Component } from 'react';
import CheckingProperties from './CheckingProperties';
import CheckingImage from './CheckingImage';
import CheckingInput from './CheckingInput';
import UtilitiesChecking from './UtilitiesChecking';
class Item extends Component {

      render() {

            let items = [...this.props.ItemPayload.listItem];
            console.log(this.props.ItemPayload.listItem);

            let newItems = items;

            if (items.length > 0) {
                  items.pop();
                  items = items.map((param, id) => { return <CheckingProperties {...this.props} proppertiesitem={JSON.stringify(param)} key={id} /> })
            }

            return (
                  <React.Fragment>
                        <div className="row justify-content-center nav-top-item">
                              <div className="col-4 d-flex align-items-center">
                                    <CheckingInput {...this.props} />

                              </div>
                        </div>

                        <div className="row">
                              <div className="col-12 checking-right mt-3">
                                    <div className="row">
                                          {items}
                                    </div>
                              </div>
                        </div>


                        <div className="row ">
                              <UtilitiesChecking {...this.props} newItems={newItems} />
                        </div>

                  </React.Fragment>
            );
      }
}

export default Item;