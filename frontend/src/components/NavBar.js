import React, { Component } from 'react';
import '../Css/header.css';
import logo from '../logo.png';
import pizza from '../pizaa-1.jpg';
import burger from '../hamburger-nav.png';
import milktea from '../milktea-nav.jpg';
import axios from '../axios';

class NavBar extends Component {

    state = {
        products: [],
        orders: [],
        productSearch: '',
        orderSearch: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        if (event.target.name === 'productSearch') {
            if (event.target.value !== '') {
                axios.get(`/product/list?pageNumber=1&pageSize=5&keyword=${event.target.value}`)
                    .then(data => {
                        this.setState({
                            products: data.data.data.recordset
                        })
                    })
                    .catch(err => console.log(err))
            } else {
                this.setState({ products: [] })
            }
        } else if (event.target.name === 'orderSearch') {

        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.orderSearch !== '') {
            window.location.href = `/order-detail/${this.state.orderSearch}`
        }
    }

    SignOut = () => {
        localStorage.removeItem("username")
        localStorage.removeItem('cart')
        this.props.username = null
        window.location.href = '/'
    }

    componentDidMount() {
        axios.get(`/product/best-seller`)
            .then(data => {
                this.setState({
                    products: data.data.data.recordset
                })
            })
            .catch(err => console.log(err));
    }

    viewCart = (event) => {
        event.preventDefault();
        const username = localStorage.getItem('username');
        if (username) {
            window.location.href = '/cart';
        }
        else {
            alert('You must log in first');
        }
    }

    viewOrder = (event) => {
        event.preventDefault();
        const username = localStorage.getItem('username');
        if (username) {
            window.location.href = '/order-list';
        }
        else {
            alert('You must log in first');
        }
    }

    render() {
        const prefix = this.state.products ? this.state.products.map(item => (
            <a className='search-1' key={item.ProductID} href={`/product/${item.ProductID}`}>
                <div className='result-item' key={item.ProductID}>
                    <h3>{item.Name.toString().toLowerCase()}</h3>
                </div>
            </a>
        )) : ''
        const displayItems = this.props.products ? this.props.products.map(item => (
            <div className="list-item-left">
                <a key={item.ProductID} href={`/product/${item.ProductID}`}>
                    <div key={item.ProductID} className="list-item-right">
                        <i className="fas fa-times" area-hidden="true"></i>
                        <img src={`http://localhost:5000/image/products/${item.Image}.png`} alt={item.Name} />
                        <div className="content-item-order">
                            <h3>{item.Name}</h3>
                            <p>{item.Price}đ*{item.Quantity}</p>
                        </div>
                    </div>
                </a>
            </div>
        )) : ''

        var username = localStorage.getItem('username')
        let SignIn
        let SignUp
        let LogOut
        if (username == null)
            SignIn = (
                <a href="/signin">
                    <div className="sign-in">
                        <div className="sign-in-icon">
                            <i className="fas fa-sign-in-alt"></i>
                        </div>
                        <div className="sign-in-text">Đăng nhập</div>
                    </div>
                </a>
            )
        else
            SignIn = (
                <div className="sign-in">
                    <div className="sign-up-icon">
                        <i className="far fa-user"></i>
                    </div>
                    <div className="sign-in-text">Chào mừng, {username}</div>
                </div>
            )
        if (username == null)
            SignUp = (
                <a href="/signup">
                    <div className="sign-up">
                        <div className="sign-up-icon">
                            <i className="far fa-user"></i>
                        </div>
                        <div className="sign-up-text">Đăng ký</div>
                    </div>
                </a>
            )
        if (username != null)
            LogOut = (
                <a href='/' onClick={this.SignOut}>
                    <div className="sign-up">
                        <div className="sign-in-icon">
                            <i className="fas fa-sign-in-alt"></i>
                        </div>
                        <div className="sign-up-text">Đăng xuất</div>
                    </div>
                </a>
            )
        return (
            <div className='header-container'>
                <div className="header">
                    <div className="top-header">
                        <div className="support">
                            <i className="fas fa-headset"></i>
                            <span className="title-support">Điện thoại hỗ trợ</span>
                            <span className="phone-support">19001009</span>
                            <span className="support">|</span>
                            <span>
                                Follow us
                                <a href="https://www.facebook.com/tatuan19" target="__blank"><i className="fab fa-facebook"></i></a>
                                <a href="https://www.instagram.com/locckhl/?hl=vi" target="__blank"><i className="fab fa-instagram"></i></a>
                                <a href="https://www.youtube.com/channel/UCiF_9u_6OLFuQ5UZe8il94w?view_as=subscriber"><i className="fab fa-youtube"></i></a>
                            </span>
                        </div>
                        <div className="user">
                            {SignUp}
                            {SignIn}
                            {LogOut}
                        </div>
                    </div>
                    {/* bottom-header */}
                    <div className="bottom-header">
                        <div className="logo">
                            <a href="/">
                                <img src={logo} alt="logo" />
                            </a>

                        </div>
                        <div className="nav">
                            <ul className="nav-ul">
                                <li><a href="/"><b>TRANG CHỦ</b></a></li>
                                <li><a href='/'>
                                    <b>MENU</b>
                                    <i className="fas fa-sort-down"></i>
                                    <div id="sub-nav">
                                        <div className="sub-nav-item-container">
                                            <div className="sub-nav-item">
                                                <a href='/menuPizza'><img src={pizza} alt="" style={{
                                                    backgroundPosition: 'center',
                                                    backgroundRepeat: 'no-repeate',
                                                    height: '90px',
                                                    width: '90px'
                                                }} /></a>
                                                <span>Pizza</span>
                                            </div>
                                            <div className="sub-nav-item">
                                                <a href='/menuBurger'><img src={burger} alt=""
                                                    style={{
                                                        backgroundPosition: 'center',
                                                        backgroundRepeat: 'no-repeate',
                                                        height: '90px',
                                                        width: '90px'
                                                    }} />
                                                </a>
                                                <span>Hamburger</span>
                                            </div>
                                            <div className="sub-nav-item">
                                                <a href='/menuMilktea'><img src={milktea} alt=""
                                                    style={{
                                                        backgroundPosition: 'center',
                                                        backgroundRepeat: 'no-repeate',
                                                        height: '90px',
                                                        width: '90px'
                                                    }} /></a>
                                                <span>Milk Tea</span>
                                            </div>
                                        </div>
                                    </div>
                                </a></li>
                                <li><a href="#" onClick={this.viewOrder}><b>ĐƠN HÀNG</b></a></li>
                            </ul>
                        </div>

                        <form autoComplete='Off' className="input-form">
                            <input type="text" name="productSearch" id="productSearch" onChange={this.handleChange} placeholder="Tìm kiếm sản phẩm" />
                            <div className='search-container-1'>
                                {prefix}
                            </div>
                            <a>
                                <button className="i-2" onClick={(e) => this.handleSubmit(e)}>
                                    <i className="fas fa-search search-icon"></i>
                                </button>
                            </a>
                            <input type="text" name="orderSearch" id="orderSearch" onChange={this.handleChange} placeholder="Tìm kiếm đơn hàng" />
                            <a href='/order-detail'>
                                <button className="i-1" onClick={(e) => this.handleSubmit(e)}>
                                    <i className="fas fa-search search-icon"></i>
                                </button>
                            </a>
                        </form>
                        {/* <div className="hot-words">
                            <div className="hot-words-list">
                                <a href="/product">Pizaa</a>
                                <a href="/product">Chicken</a>
                                <a href="/product">Hamburger</a>
                                <a href="/product">Milk tea</a>
                                <a href="/product">Pizaa</a>
                                <a href="/product">Chicken</a>
                                <a href="/product">Hamburger</a>
                                <a href="/product">Milk tea</a>
                            </div>
                        </div> */}
                        <div className="cart">
                            <div className="ic-cart" >
                                <a href="#" onClick={this.viewCart}>
                                    <i className="fas fa-cart-plus"></i>
                                    <span className="number-cart">{this.props.count}</span>
                                </a>
                            </div>
                            <div className="text-cart">
                                <h5 className="txt-small">Giỏ hàng</h5>
                                <h4 className="txt-medium">
                                    {this.props.Total}đ
                                        <i className="fas fa-sort-down"></i>
                                </h4>
                            </div>
                            <div className="list-cart">
                                {displayItems}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;