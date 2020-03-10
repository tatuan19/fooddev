import React, { Component } from 'react';
import '../Css/home.css';

class HomeContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            trendingproducts: [],
            products: [],
            total: 0,
            currentCategory: 'Pizza',
            currentPageNumber: 1,
            maxPageNumber: 1,
        }
        this.getTrending();
        this.getData(1);
    }

    getTrending = async () => {
        try {
            const data = await fetch(`http://localhost:5000/product/best-seller`,
            ).then((res) => { return res.json(); });
            this.setState({
                trendingproducts: data.data
            });
        } catch (err) {
            window.alert(err.message);
        }
    }
    getData = async (pageNumber) => {
        try {
            const data = await fetch(`http://localhost:5000/filter/category?pageNumber=${pageNumber}&pageSize=5&category=${this.state.currentCategory}`,
            ).then((res) => { return res.json(); });
            this.setState({
                total: data.data.total,
                products: data.data.recordset,
                maxPageNumber: Math.ceil(data.data.total / 4)
            });
        } catch (err) {
            window.alert(err.message);
        }
    }

    handlePageChange = (pageNumber) => {
        this.getData(pageNumber);
        this.setState({
            currentPageNumber: pageNumber
        });
    }

    handlePrevClick = () => {
        if (this.state.currentPageNumber > 1) {
            this.getData(this.state.currentPageNumber - 1);
            this.setState({
                currentPageNumber: (this.state.currentPageNumber - 1)
            });
        }
    }

    handleNextClick = () => {
        if (this.state.currentPageNumber < this.state.maxPageNumber) {
            this.getData(this.state.currentPageNumber + 1);
            this.setState({
                currentPageNumber: (this.state.currentPageNumber + 1)
            });
        }
    }

    render() {
        const paginations = [];
        for (let i = 1; i <= this.state.maxPageNumber; i++) {
            paginations.push(i);
        }
        const Trending = this.state.trendingproducts.map(item => (
            <div key={item.ProductID} className='trending-item-root'>
                <div className="trending-item" data-aos="fade-right" data-aos-delay="500">
                    <div className="trending-item-img">
                        <a href={`/product/${item.ProductID}`} target="__blank">
                            <img src={`http://localhost:5000/image/products/${item.Image}.png`} alt={item.Name} 
                            style={{
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeate',
                                height: '300px',
                                width: '100%'
                            }}/>
                        </a>
                    </div>
                    <div className="trending-item-text">
                        <a href={`/product/${item.ProductID}`} target="__blank">
                            <h2>{item.Name}</h2>
                        </a>
                    </div>
                    <div className="trending-item-cost">
                        <span>{item.Price}đ</span>
                    </div>
                    <div>Số lượng đã bán: {item.Sold}</div>
                    <a href='/' onClick={(event) => { this.props.addtoCart(item, 1, event) }}>
                        <div className="trending-item-expand">
                            <div className="expand-cart">
                                <i className="fas fa-cart-plus"></i>
                                <p> Thêm vào giỏ hàng</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        ))
        const Products = this.state.products.map(item => (
            <div key={item.ProductID} className='trending-item-root'>
                <div className="trending-item" data-aos="fade-right" data-aos-delay="500">
                    <div className="trending-item-img">
                        <a href={`/product/${item.ProductID}`} target="__blank">
                            <img src={`http://localhost:5000/image/products/${item.Image}.png`} alt={item.Name} />
                        </a>
                    </div>
                    <div className="trending-item-text">
                        <a href={`/product/${item.ProductID}`} target="__blank">
                            <h2>{item.Name}</h2>
                        </a>
                    </div>
                    <div className="trending-item-cost">
                        <span>{item.Price}đ</span>
                    </div>
                    <div>Số lượng đã bán: {item.Sold}</div>
                    <a href='/' onClick={(event) => { this.props.addtoCart(item, 1, event) }}>
                        <div className="trending-item-expand">
                            <div className="expand-cart">
                                <i className="fas fa-cart-plus"></i>
                                <p>Thêm vào giỏ hàng</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        ))

        return (
            //  content
            <div id="home" >
                <div className="home-top">
                    <a href="/">Trang chủ</a>
                </div>
                {/* Carousel */}
                <div id="carouselExampleIndicators" className="carousel slide my-carousel" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src='http://localhost:5000/image/products/carousel-4.jpg' className="d-block w-100 my-img" alt="carousel4" />
                        </div>
                        <div className="carousel-item">
                            <img src='http://localhost:5000/image/products/carousel-5.jpg' className="d-block w-100 my-img" alt="carousel5" />
                        </div>
                        <div className="carousel-item">
                            <img src='http://localhost:5000/image/products/carousel-6.jpg' className="d-block w-100 my-img" alt="carousel6" />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
                {/* Trending  */}
                <div className="trending-product">
                    <div className="trending-header">
                        <h1>Sản phẩm bán chạy</h1>
                    </div>
                    <div className="trending-item-container" >
                        {Trending}
                    </div>
                </div>
                {/* main-menu */}
                <div className="main-menu-2">
                    <div className="main-menu-header">
                        <div className="main-menu-top">VỊ NGON TRÊN TỪNG MÓNG TAY♪♫♪♫ </div>
                        <div className="main-menu-center">Choose & enjoy</div>
                        <div className="main-menu-bottom">
                            Thực đơn gồm có Hamburger, Pizza và Milktea hảo hạng. Nhanh tay đặt hàng thôi.
                        </div>
                    </div>
                    {/* pagination */}
                    <div className="pagination">
                        <div className="pagination-item pag-1"
                            onClick={() => {
                                this.setState({
                                    currentCategory: 'Pizza',
                                    currentPageNumber: 1,
                                });
                                this.getData(1);
                            }} >
                            <i className="fas fa-pizza-slice"></i>
                            <h2>Pizza</h2>
                        </div>
                        <div className="pagination-item pag-2"
                            onClick={() => {
                                this.setState({
                                    currentCategory: 'Hamburger',
                                    currentPageNumber: 1,
                                });
                                this.getData(1);
                            }} >
                            <i className="fas fa-hamburger"></i>
                            <h2>Burger</h2>
                        </div>
                        <div className="pagination-item pag-3"
                            onClick={() => {
                                this.setState({
                                    currentCategory: 'Milktea',
                                    currentPageNumber: 1
                                });
                                this.getData(1);
                            }} >
                            <i className="fas fa-cocktail"></i>
                            <h2>Milk Tea</h2>
                        </div>
                    </div>
                    {/* main-manu-display */}
                    <div className="main-menu-display-container area-1">
                        <div className="sub-main-menu-display-container">
                            {Products}
                        </div>

                        {/* TODO: Pagination */}
                        <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-center pagination-temp">
                                <li className={`page-item ${this.state.currentPageNumber === 1 ? 'disabled' : ''}`}
                                    onClick={this.handlePrevClick}>
                                    <a className="page-link" href='/' onClick={e => e.preventDefault()} aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>

                                {paginations.map((item) => {
                                    return (
                                        <li className={`page-item ${item === this.state.currentPageNumber ? 'active' : ''}`}
                                            key={item}
                                            onClick={() => { this.handlePageChange(item) }}
                                        >
                                            <a className="page-link" href='/' onClick={e => e.preventDefault()}>{item}</a>
                                        </li>
                                    );
                                })}

                                <li className={`page-item ${this.state.currentPageNumber === this.state.maxPageNumber ? 'disabled' : ''}`}
                                    onClick={this.handleNextClick}>
                                    <a className="page-link" href='/' onClick={e => e.preventDefault()} aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeContent;