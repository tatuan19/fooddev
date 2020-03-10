import React, { Component } from 'react';
import '../Css/menu.css';
import axios from '../axios';
import NavBar from './NavBar';

class Menu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            trendingproducts: [],
            products: [],
            total: 0,
            currentCategory: 'Milktea',
            currentPageNumber: 1,
            maxPageNumber: 1,
            menu: true,
            activeField: [true, false, false],
            sortDirection: 1,
            sortField: 'ProductID',

            priceSort: 'Sắp xếp giá'
        }
        this.handleSort('ProductID', 1, 1)
    }

    handlePageChange = (pageNumber) => {
        this.handleSort(this.state.sortField, this.state.sortDirection, pageNumber);
        this.setState({
            currentPageNumber: pageNumber
        });
    }

    handlePrevClick = () => {
        if (this.state.currentPageNumber > 1) {
            this.handleSort(this.state.sortField, this.state.sortDirection, this.state.currentPageNumber - 1);
            this.setState({
                currentPageNumber: (this.state.currentPageNumber - 1)
            });
        }
    }

    handleNextClick = () => {
        if (this.state.currentPageNumber < this.state.maxPageNumber) {
            this.handleSort(this.state.sortField, this.state.sortDirection, this.state.currentPageNumber + 1);
            this.setState({
                currentPageNumber: (this.state.currentPageNumber + 1)
            });
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSort = (field, direction, pageNumber) => {
        console.log(field, direction);
        let active = [];
        if (field === 'ProductID') { active = [1, 0, 0]; }
        if (field === 'Sold') { active = [0, 1, 0]; }
        if (field === 'Price') { active = [0, 0, 1]; }
        this.setState({
            currentPageNumber: 1,
            activeField: active,
            sortDirection: direction,
            sortField: field
        });
        if (this.state.from && this.state.to) {
            axios.get(`filter/price?from=${this.state.from}&to=${this.state.to}&pageNumber=${pageNumber}&pageSize=4&sortField=${field}&category=${this.state.currentCategory}&sortDirection=${direction}`)
                .then(data => {
                    this.setState({
                        total: data.data.data.total,
                        products: data.data.data.recordset,
                        maxPageNumber: Math.ceil(data.data.data.total / 4)
                    })
                })
                .catch(err => console.log(err));
        } else {
            axios.get(`filter/category?pageNumber=${pageNumber}&pageSize=4&sortField=${field}&category=${this.state.currentCategory}&sortDirection=${direction}`)
                .then(data => {
                    console.log(data.data)
                    this.setState({
                        total: data.data.data.total,
                        products: data.data.data.recordset,
                        maxPageNumber: Math.ceil(data.data.data.total / 4)
                    })
                })
                .catch(err => console.log(err));
        }
    }

    handleFilter = (pageNumber, event) => {
        event.preventDefault();
        this.setState({
            currentPageNumber: 1,
            activeField: [1, 0, 0],
            sortDirection: 1,
            sortField: 'ProductID'
        });
        if (this.state.from && this.state.to) {
            axios.get(`filter/price?from=${this.state.from}&to=${this.state.to}&pageNumber=${pageNumber}&pageSize=4&category=${this.state.currentCategory}&sortDirection=1`)
                .then(data => {
                    this.setState({
                        total: data.data.data.total,
                        products: data.data.data.recordset,
                        maxPageNumber: Math.ceil(data.data.data.total / 4)
                    })
                })
                .catch(err => console.log(err))
        }
    }

    render() {
        const paginations = [];
        for (let i = 1; i <= this.state.maxPageNumber; i++) {
            paginations.push(i);
        }
        const Products = this.state.products.map(item => (
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
                                }} />
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
                    <a href='/menuBurger' onClick={(event) => { this.props.addtoCart(item, 1, event) }}>
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
            <div>
                {/* FIXME: */}
                <NavBar products={this.props.state.products} Total={this.props.state.Total} count={this.props.state.count} />
                <div id="content">
                    <div className="content-top">
                        <a href="/">Trang chủ</a>
                        <i className="fas fa-chevron-right" />
                        <a href="/menu">Menu</a>
                    </div>
                    {/* main-menu */}
                    <div className="main-menu">
                        <div className="main-menu-header">
                            <div className="main-menu-top">VỊ NGON TRÊN TỪNG MÓNG TAY♪♫♪♫</div>
                            <div className="main-menu-center">{this.state.currentCategory}</div>
                            <div className="main-menu-bottom">
                                Đồ uống được tài trợ bải Citea fun, 1 trong những thương hiệu hàng đầu Việt Nam♥♥♥
                        </div>
                        </div>

                        {/* sort menu */}
                        <div className="sort-menu">
                            <div className="sort-menu-left">
                                <span className="sort-label">Bộ lọc</span>
                                <div className="sort-option">
                                    <div className="option-item"
                                        style={this.state.activeField[0] ? {
                                            color: "white",
                                            backgroundColor: "#f7462e"
                                        } : {}}
                                        onClick={(event) => {
                                            this.handleSort('ProductID', 1, 1);
                                        }}>Sản phẩm</div>
                                    <div className="option-item"
                                        style={this.state.activeField[1] ? {
                                            color: "white",
                                            backgroundColor: "#f7462e"
                                        } : {}}
                                        onClick={(event) => {
                                            this.handleSort('Sold', 0, 1);
                                        }}>Bán chạy</div>
                                    <div className="dropdown">
                                        <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                            style={this.state.activeField[2] ? {
                                                color: "white",
                                                backgroundColor: "#f7462e",
                                                width: "100%",
                                                height: "60%",
                                                marginRight: "10px",
                                                cursor: "pointer",
                                                textAlign: "center",
                                                border: "#dae1e7",
                                                borderRadius: "5px",
                                                lineHeight: "36px"
                                            } : {
                                                    backgroundColor: "white",
                                                    width: "100%",
                                                    height: "60%",
                                                    marginRight: "10px",
                                                    cursor: "pointer",
                                                    textAlign: "center",
                                                    border: "#dae1e7",
                                                    borderRadius: "5px",
                                                    lineHeight: "36px"
                                                }}>
                                            {this.state.priceSort}
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <div className="dropdown-item"
                                                onClick={(event) => {
                                                    this.setState({
                                                        priceSort: "Giá tăng dần"
                                                    });
                                                    this.handleSort('Price', 1, 1);
                                                }}>Giá tăng dần</div>
                                            <div className="dropdown-item"
                                                onClick={(event) => {
                                                    this.setState({
                                                        priceSort: "Giá giảm dần"
                                                    });
                                                    this.handleSort('Price', 0, 1);
                                                }}>Giá giảm dần</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sort-menu-right">
                                <div className="price-range">
                                    <div className="price-range-header">Khoảng giá:</div>
                                    <div className="price-range-value">
                                        <input type="text" placeholder="từ" name='from' onChange={this.handleChange} />
                                        <div>-</div>
                                        <input type="text" placeholder="đến" name='to' onChange={this.handleChange} />
                                    </div>
                                    <button onClick={(event) => { this.handleFilter(1, event); }} className="price-range-confirm btn btn-primary">Lọc</button></div>
                            </div>
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
            </div >
        );
    }
}

export default Menu;