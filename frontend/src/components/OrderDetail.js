import React, { Component } from 'react';
import '../Css/order-detail.css';
import NavBar from './NavBar';

class OrderDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userInfo: [],//
            orderID: "",
            detail: {},
            orderList: []
        }
    }

    async UNSAFE_componentWillMount() {
        // FIXME: sai cơ mà kệ vẫn hơi đúng
        const username = localStorage.getItem('username');
        const orderID = window.location.pathname.split('/')[2];
        // console.log(orderID);
        try {
            const userData = await fetch(`http://localhost:5000/customer/info/${username}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            ).then((res) => { return res.json(); });
            console.log(userData.data);
            const data = await fetch(`http://localhost:5000/order/${orderID}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            ).then((res) => { return res.json(); });
            console.log(data.data);
            this.setState({
                userInfo: userData.data,
                orderID: orderID,
                detail: data.data.detail,
                orderList: data.data.orderList
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    render() {
        const orderList = this.state.orderList.map(item => (
            <div className='order-item' key={item.ProductID}>
                <div className="order-img">
                    <img src={`http://localhost:5000/image/products/${item.Image}.png`} alt={item.ProductID} />
                </div>
                <div className="order-description">
                    <span>{item.Name}</span>
                </div>
                <div className="order-price">
                    <span>{item.Price}</span>
                </div>
                <div className="order-quantity">
                    <div className="quantity">
                        {item.Quantity}
                    </div>
                </div>
            </div>
        ));

        return (
            <div>
                <NavBar products={this.props.state.products} handleSearch={this.props.handleSearch} Total={this.props.state.Total} count={this.props.state.count} />
                <div className="orderdetail">
                    <div className="orderdetail-top">
                        <a href="/home">Trang chủ</a>
                        <i className="fas fa-chevron-right"></i>
                        <a href="/order-list">Đơn hàng</a>
                        <i className="fas fa-chevron-right"></i>
                        <a href="/order-detail">{this.state.orderID}</a>
                    </div>
                    <div className="orderdetail-bottom">
                        <div className="orderdetail-bottom-left">
                            <div className="orderdetail-bottom-left-top">
                                <div className="list-header-2">
                                    Đơn hàng {this.state.orderID}
                                </div>
                            </div>
                            <div className="orderdetail-bottom-left-bottom">
                                <div className="order-item-header">
                                    <div className="header-name">Sản phẩm</div>
                                    <div className="header-price">Đơn giá</div>
                                    <div className="header-quanity">Số lượng</div>
                                </div>
                                {orderList}
                            </div>
                        </div>
                        <div className="orderdetail-bottom-right">
                            <div className="order-summary">
                                <div className="summary-header">
                                    Thông tin đơn hàng
                                </div>
                                <div className="summary-content">
                                    <div className="sub-total">
                                        <div className="sub-total-left">
                                            Khách hàng:
                                        </div>
                                        <div className="sub-total-right">
                                            {this.state.userInfo.Name}
                                        </div>
                                    </div>
                                    <div className="sub-total">
                                        <div className="sub-total-left">
                                            Địa chỉ:
                                        </div>
                                        <div className="sub-total-right">
                                            {this.state.userInfo.Address}
                                        </div>
                                    </div>
                                    <div className="sub-total">
                                        <div className="sub-total-left">
                                            Số điện thoại:
                                        </div>
                                        <div className="sub-total-right">
                                            {this.state.userInfo.Phone}
                                        </div>
                                    </div>
                                </div>

                                <div className="summary-total">
                                    <div className="summary-total-left">Tổng:</div>
                                    <div className="summary-total-right">
                                        <div>{this.state.detail.Total}đ</div>
                                        <div>(đã bao gồm VAT)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderDetail;