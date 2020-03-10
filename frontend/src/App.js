import React, { Component } from 'react';
import axios from './axios.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './containers/Home';
import Product from './components/Product';
import MenuPizza from './components/MenuPizza';
import MenuBurger from './components/MenuBurger';
import MenuMilktea from './components/MenuMilktea';
import Cart from './components/Cart';
import OrderList from './components/OrderList';
import OrderDetail from './components/OrderDetail';

import Footer from '../src/components/Footer';
import './App.scss';
import OrderListSearch from './components/OrderListSearch.js';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;


class App extends Component {
  state = {
    products: [],
    count: 0,
    Total: 0
  }

  componentDidMount() {
    axios.get(`/cart/${localStorage.getItem('username')}`)
      .then(data => {
        this.setState({
          products: data.data.data
        })
        this.state.products.map(item => {
          this.setState({
            Total: this.state.Total + item.Price * item.Quantity,
          })
          this.setState({count:this.state.count+item.Quantity})
        })
      })
      .catch(err => console.log(err))
  }

  _onLogin = (username, password) => {
    axios.post('/customer/login', {
      username: username,
      password: password
    })
      .then(response => {
        if (response.data.success !== false) {
          this.setState({
            username: response.data.username,
            id: response.data.id
          })
          console.log(this.state)
          localStorage.setItem('username', response.data.username)
          console.log(response.data.username)
          window.location.href = '/';
        }
        else {
          alert("Wrong username or password");
        }
      })
      .catch(err => console.log(err))
  }

  _addtoCart = (item, quantity, event) => {
    event.preventDefault();
    const username = localStorage.getItem('username');
    if (username) {
      axios.post('/cart/add', {
        username: username,
        productID: item.ProductID,
        quantity: quantity,
        name: item.Name,
        image: item.Image
      })
        .then(response => {
          console.log(response.data.success)
        })
        .catch(err => console.log(err));
      axios.get(`/cart/${localStorage.getItem('username')}`)
        .then(data => {
          this.setState({
            products: data.data.data
          })
        })
        .catch(err => console.log(err));
        this.setState({
          count: this.state.count + quantity,
          Total: this.state.Total + item.Price*quantity
        })
    }
    else {
      alert('You must log in first');
    }
  }

  Decrease = (item,event) => {
    event.preventDefault();
    if(item.Quantity>1){
      item.Quantity--;
      this.setState({
        count:this.state.count-1,
        Total:this.state.Total-item.Price
      });
      axios.post('/cart/update',{
        quantity:item.Quantity,
        username:localStorage.getItem('username'),
        productID:item.ProductID
      })
      .then(response => {
        console.log(response.data.success)
      })
      .catch(err => console.log(err));  
    } 
}

Increase = (item,event) => {
  event.preventDefault();
    item.Quantity++;
    this.setState({
      count:this.state.count+1,
      Total: this.state.Total+item.Price
    })
    this.setState({Total:this.state.Total+item.Price});
  axios.post('/cart/update',{
      quantity:item.Quantity,
      username:localStorage.getItem('username'),
      productID:item.ProductID
  })
  .then(response => {
      console.log(response.data.success)
    })
  .catch(err => console.log(err));
}

  render() {
    return (
      <div>
        <BrowserRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/" render={(props) => {
                return <Home {...props} addtoCart={this._addtoCart} state={this.state} />
              }} />
              <Route exact path="/signin" render={(props) => {
                return <SignIn {...props} state={this.state} _onLogin={this._onLogin} />
              }} />
              <Route exact path="/product/:productID" render={(props) => {
                return <Product {...props} addtoCart={this._addtoCart} state={this.state} />
              }} />
              <Route exact path="/signup" render={(props) => {
                return <SignUp {...props} state={this.state} />
              }} />
              <Route exact path="/cart" render={(props) => {
                return <Cart {...props} Decrease={this.Decrease} Increase={this.Increase} state={this.state} />
              }} />
              <Route exact path="/order-list" render={(props) => {
                return <OrderList {...props} state={this.state} />
              }} />
              <Route exact path="/order-detail/:orderID" render={(props) => {
                return <OrderDetail {...props} state={this.state} />
              }} />
              <Route exact path="/menupizza" render={(props) => {
                return <MenuPizza {...props} addtoCart={this._addtoCart}state={this.state} />
              }} />
              <Route exact path="/menuburger" render={(props) => {
                return <MenuBurger {...props} addtoCart={this._addtoCart}state={this.state} />
              }} />
              <Route exact path="/menumilktea" render={(props) => {
                return <MenuMilktea {...props} addtoCart={this._addtoCart} state={this.state} />
              }} />
              <Route exact path="/order/list/:orderID" render={(props) => {
                return <OrderListSearch {...props} state={this.state} />
              }} />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
        <Footer/>
      </div>

    );
  }
}

export default App;
