import React, { Component } from 'react';
import '../Css/sign-up.css';
import axios from '../axios';
import Navbar from './NavBar';

class SignUp extends Component {
    state = {
        username: '',
        password: '',
        passwordcf: '',
        name: '',
        phone: '',
        address: '',
        hasAgreed: false
    }

    handleChange=(event) => {
        let target = event.target;
        let value = target.type === 'checkbox' ?
        target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.state.password === this.state.passwordcf ?
        axios
          .post('/customer/register',{
              username: this.state.username,
              password: this.state.password,
              name: this.state.name,
              address: this.state.address,
              phone: this.state.phone
          })
          .then(data => {
            console.log('The form was submitted with the following data:');
            console.log(data.data);
            alert("Đăng ký thành công");
            setTimeout(function(){ window.location.href='/signin'; }, 1000);          
          })
          .catch(err => console.log(err))
          : alert("Mật khẩu nhập lại không đúng")
        // console.log(this.state);
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="signup">
                    <div className="signup-bottom">
                        <div className="sign-up-header">Đăng ký tài khoản</div>
                        <form  onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Username</label>
                                <input type="text" className="form-control"  placeholder="User name" id="username" name="username" value={this.state.username} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Mật khẩu</label>
                                <input type="password" className="form-control"  placeholder="Password" id="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Xác nhận mật khẩu</label>
                                <input type="password" className="form-control"  placeholder="Password Confirm" id="passwordcf" name="passwordcf" value={this.state.passwordcf} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Tên khách hàng</label>
                                <input type="text" className="form-control"  placeholder="Full Name" id="name" name="name" value={this.state.name} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Điện thoại</label>
                                <input type="text" className="form-control"  placeholder="Phone" id="phone" name="phone" value={this.state.phone} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Địa chỉ</label>
                                <input type="text" className="form-control"  placeholder="Adress" id="address" name="address" value={this.state.address} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck" id="hasAgreed" name="hasAgreed" value={this.state.hasAgreed} onChange={this.handleChange}/>
                                    <label className="form-check-label" htmlFor="gridCheck">
                                    Xác nhận
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Đăng ký</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;