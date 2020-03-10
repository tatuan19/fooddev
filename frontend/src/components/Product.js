import React, { Component } from 'react';
import '../Css/product.css';
import NavBar from './NavBar';
import axios from '../axios';

class Product extends Component {
    state = {
        product: {},
        quantity: 1
    }

    componentDidMount() {
        axios
            .get(`/product/${this.props.match.params.productID}`)
            .then(data => {
                console.log(data.data)
                this.setState({
                    product: data.data.data
                })
                console.log(this.state.product)
            })
            .catch(err => console.log(err))
    }

    Increment = (event) => {
        event.preventDefault();
        this.setState({ quantity: this.state.quantity + 1 });
    }

    Decrease = (event) => {
        event.preventDefault();
        if (this.state.quantity > 1) {
            this.setState({ quantity: this.state.quantity - 1 });
        }
    }

    render() {
        return (
            <div>
                <NavBar products={this.props.state.products} handleSearch={this.props.handleSearch} Total={this.props.state.Total} count={this.props.state.count} />
                <div className="product">
                    <div className="product-top">
                        <a href="/">Trang chủ</a>
                        <i className="fas fa-chevron-right"></i>
                        <a href="/menu">Menu</a>
                        <i className="fas fa-chevron-right"></i>
                        <a href={`/menu${this.state.product.Category}`}>{this.state.product.Category}</a>
                        <i className="fas fa-chevron-right"></i>
                        <a href={`/product/${this.state.product.ProductID}`}>{this.state.product.Name}</a>
                    </div>
                    <div className="product-bottom">
                        <div className="product-bottom-left">
                            <div className="product-bottom-left-img">
                                <img src={`http://localhost:5000/image/products/${this.state.product.Image}.png`} alt="" />
                            </div>
                            <div className="product-bottom-left-share">
                            <div class="fb-share-button" data-href="https://www.foody.vn/ha-noi/citea-fun-tea-coffee-ta-quang-buu" data-layout="button_count" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.foody.vn%2Fha-noi%2Fcitea-fun-tea-coffee-ta-quang-buu&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Chia sẻ</a></div>
                                <a href={`https://twitter.com/intent/tweet?button_hashtag=food&ref_src=twsrc%5Etfw`} className="twitter-hashtag-button" data-url="https://developers.facebook.com/docs/sharing/messenger/web/" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                            </div>
                        </div>
                        <div className="product-bottom-right">
                            <div className="product-name">{this.state.product.Name}</div>
                            <div className="product-description">
                                {this.state.product.Info}
                            </div>
                            <div className="product-price">{this.state.product.Price}đ</div>
                            <div className="product-option">
                                <div>Số lượng đã bán: {this.state.product.Sold}</div>
                                <div className="option-quantity">
                                    <div>Số lượng</div>
                                    <div className="quantity">

                                        <button type="button" onClick={this.Decrease} className="btn btn-dark"><i className="fas fa-minus" href="/"></i></button>
                                        <input type="text" placeholder={this.state.quantity} />
                                        <button type="button" onClick={this.Increment} className="btn btn-light"><i className="fas fa-plus"></i></button>

                                    </div>

                                </div>
                            </div>
                            <div className="product-purchase">
                                <button onClick={(event) => { this.props.addtoCart(this.state.product, this.state.quantity, event) }} type="button" className="btn btn-primary add-to-cart" >
                                    <i className="fas fa-cart-plus"></i>
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;