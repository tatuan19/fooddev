import React, { Component } from 'react';
import '../Css/order-list.css';
import Navbar from './NavBar';
import axios from '../axios';

class OrderListSearch extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orderDetails: [],
            total: 0
        }
    }

    // async UNSAFE_componentWillMount() {
    //     const username = localStorage.getItem('username');
    //     try {
    //         const data = await fetch(`http://localhost:5000/order/list/${username}`,
    //             {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 credentials: 'include'
    //             }
    //         ).then((res) => { return res.json(); });
    //         console.log(data.data);
    //         this.setState({
    //             orderDetails: data.data.recordset,
    //             total: data.data.total
    //         });
    //     } catch (err) {
    //         console.log(err.message);
    //     }
    // }

    componentDidMount() {
        axios
            .get(`/order/list/${this.props.match.params.orderID}`)
            .then(data => {
                this.setState({
                    orders: data.data.data.recordset
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        const OrderList = this.state.orders ? this.state.orders.map(item => (
            <div key={item.OrderID} className="orderlist-item" >
                <a className="order-id" href={`/order-detail/${item.OrderID}`}>{item.OrderID}</a>
                <div className="order-date">{item.CreateDate}</div>
                <div className="order-name">{item.Username}</div>
                <div className="order-total">{item.Total}</div>
                <div className="order-status">{item.Status}</div>
            </div>
        )) : '';

        return (
            <div>
                <Navbar products={this.props.state.products} handleSearch={this.props.handleSearch} Total={this.props.state.Total} count={this.props.state.count} />
                <div className="orderlist">
                    <div className="orderlist-top">
                        <a href="/home">Trang chủ</a>
                        <i className="fas fa-chevron-right"></i>
                        <a href="/order-list">Đơn hàng</a>
                    </div>
                    <div className="orderlist-bottom">
                        <div className="order-list-header">
                            Đơn hàng đã đặt
                        </div>
                        <div className="order-list-orderlist">
                            <div className="orderlist-header">
                                <div className="order-id">Mã đơn hàng</div>
                                <div className="order-date">Ngày đặt hàng</div>
                                <div className="order-name">Tên khách hàng</div>
                                <div className="order-total">Tổng giá trị</div>
                                <div className="order-status">Trạng thái</div>
                            </div>
                            <div>{OrderList}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderListSearch;