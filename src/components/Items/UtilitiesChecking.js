import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { json2excel } from 'js2excel';


class UtilitiesChecking extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            change: false,
            itemsPrintFalse: [],
            downClick: false
        }
    }
    handleClose = () => { this.setState({ change: false }) };
    handleShow = () => { this.setState({ change: true }) };
    showUtilitiesChecking = () => {
        this.handleClose();
    }
    itemsPrintFalse = () => {
        this.handleClose();
        this.props.itemsPrintFalse();
    }

    downloadItemsPrintFalse = () => {
        this.props.itemsPrintFalse();
        this.handleClose();
        this.setState({ downClick: true })


    }

    render() {
        let itemsPrintFalse = this.props.newItems;
       
        
        if (this.state.downClick === true && itemsPrintFalse.length !== 0) {
            let data = itemsPrintFalse;
            data = data.map(param => {return { ...param, day: new Date(param.day) } });
         
            
            try {
           

                json2excel({
                    data,
                    name: 'Hieudz',
                    formateDate: 'yyyy/mm/dd'
                });
            } catch (e) {
                // console.error('export error');
            }
            this.setState({ downClick: false })
        }
        return (
            <div>
                <Button className="" variant="primary" onClick={this.handleShow}>
                    Tiện ích
                </Button>

                <Modal show={this.state.change} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button variant="primary" onClick={this.itemsPrintFalse}>
                            Chưa in
                        </Button>
                        <Button variant="danger" onClick={this.downloadItemsPrintFalse}>
                            Excel Chưa in
                        </Button>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="secondary" onClick={this.showUtilitiesChecking}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default UtilitiesChecking;