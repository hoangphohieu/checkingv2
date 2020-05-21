import React, { Component } from 'react';


class ItemPagination extends Component {
    // trigger khi click thẻ pagination 
    pageToActive = () => {
        // trigger lên container để chuyển page được click thành active Page
        this.props.changeActivePage(this.props.numberPage);

        // trigger lên container để getPageItem
        // this.props.getPageItem({ ...this.props.valueToGetAPI, activePage: this.props.numberPage })
    }
    render() {

        return (
            <React.Fragment>
                <li className={"page-item " + ((this.props.active) ? "active" : "")}>
                    <a className="page-link" href="#" onClick={this.pageToActive}>{this.props.numberPage}</a>
                </li>
            </React.Fragment>
        );
    }
}

class PartnersPagination extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activePage: 0
        }
    }
    changeActivePage = (param) => {
        this.setState({ activePage: param });
        this.props.getBaseCostByList(this.props.partnersPaginations[param - 1]);

    }
    componentDidUpdate() {
        
        if (JSON.parse(localStorage.SumOrderHome).length !== 0 && this.state.activePage === 0) {
            if (this.props.partnersPaginations.length !== 0) {
                

                this.props.getBaseCostByList(this.props.partnersPaginations[0]);
                this.setState({ activePage: 1 })
            }

        }
    }
    render() {


        let listPartner = this.props.partnersPaginations;
        let activePage = this.state.activePage;
        let totalPage = this.props.partnersPaginations.length;
        let partnerName = "";
        if (listPartner.length !== 0 && this.state.activePage !== 0) partnerName = listPartner[this.state.activePage - 1].map((param, id) => <div className="tracking-count" key={id} >{param}</div>)
        
        return (
            <React.Fragment>
                {partnerName}

                {/* phân trang */}
                <div>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            {((activePage - 1) > 2) ?
                                <React.Fragment>
                                    <ItemPagination changeActivePage={this.changeActivePage} numberPage={1} />
                                    <div className="page-link">...</div>
                                </React.Fragment> : ""
                            }
                            {((activePage - 1) > 1) ?
                                <ItemPagination changeActivePage={this.changeActivePage} numberPage={activePage - 2} /> : ""
                            }

                            {((activePage - 1) > 0) ?
                                <ItemPagination changeActivePage={this.changeActivePage} numberPage={activePage - 1} /> : ""
                            }

                            <ItemPagination changeActivePage={this.changeActivePage} numberPage={activePage} active={true} />

                            {((totalPage - activePage) > 0) ?
                                <ItemPagination changeActivePage={this.changeActivePage} numberPage={activePage + 1} /> : ""
                            }

                            {((totalPage - activePage) > 1) ?
                                <ItemPagination changeActivePage={this.changeActivePage} numberPage={activePage + 2} /> : ""
                            }

                            {((totalPage - activePage) > 2) ?
                                <React.Fragment>
                                    <div className="page-link">...</div>

                                    <ItemPagination changeActivePage={this.changeActivePage} numberPage={totalPage} />
                                </React.Fragment> : ""
                            }

                        </ul>
                    </nav>
                </div>
            </React.Fragment>
        );
    }
}

export default PartnersPagination;