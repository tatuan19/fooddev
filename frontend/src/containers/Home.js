import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import HomeContent from '../components/HomeContent';

class Home extends Component {
    state={

    }
    render() {
        return (
            <div>
                <NavBar products={this.props.state.products} Total={this.props.state.Total} count={this.props.state.count}/>
                <HomeContent addtoCart={this.props.addtoCart}/>
            </div>
        );
    }
}

export default Home;