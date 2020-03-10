import React, { Component } from 'react';

class SearchField extends Component {

    state = {
        searchText:''
    }

    onChange = (e) => {
        this.setState({searchText:e.target.value});
    }

    handleSubmit = e => {
        e.preventDefault();
        if(this.state.searchText) this.props.handleSearch(this.state.searchText);
    }

    render() {
        return (
            <div className="search-menu">
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Tìm kiếm sản phẩm" onChange={this.onChange}/>
                    <button type='submit' className='btn btn-primary'>Click</button>
                </form>
                
            </div>
        );
    }
}

export default SearchField;