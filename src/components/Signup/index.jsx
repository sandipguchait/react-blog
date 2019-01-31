import React from 'react';
import config from '../../config/index';

// Importing Indicator for user validation
import { validateAll } from 'indicative';
import { Link } from 'react-router-dom';

//importing axios
import Axios from 'axios'

class SignUp extends React.Component {

    state = {
      name:'',
      email :'',
      password :'',
      // for indicative to work  you should have a password_confirmation as name in input 
      password_confirmation:'',
      errors: {}
    } 

    handleInputChange=(event)=>{
      this.setState({ 
        [event.target.name]: event.target.value
      })
    }

    handleSubmit=(event)=> {
      event.preventDefault();
      // Validating User using indicative Package
      //take the input data from state 
      const data = this.state;
      const  rules = {
        name: 'required|string',
        email: 'required|email',
        password:'required|string|min:6|confirmed' // confirmed will check for the password confirmation 
      };

      // Displaying custom messages for errors
      const messages = {
        required: ' This {{ field }} is required.',
        'email.email': 'The email is invalid.',
        'password.confirmed': 'The password doesnot match'
      }

      validateAll( data, rules, messages )
        .then(() => {
          //register the user
            Axios.post(`${config.apiUrl}/auth/register`, {
              name: this.state.name,
              email: this.state.email,
              password: this.state.password
            })
            .then(response => {
              localStorage.setItem('user', JSON.stringify(response.data.data)) // persising registration data to local storage
              this.props.setAuthUser(response.data.data)
              this.props.history.push('/') // on register user is redirected to another page(homepage)
            })
            .catch(errors => {
              console.log(errors.response)
              // showing error if email is already used or taken
              const formattedErrors = {};
              if(errors.response && errors.response.status === 422 ){
                formattedErrors['email'] = errors.response.data['email'][0]; // we fetch the error from response.data with the name of email and in 1st position [0].
              }
              this.setState({ errors: formattedErrors })
            })
          })
        .catch(errors => {
          console.log(errors);
          // show erroes to user
          const formattedErrors = {}
          errors.forEach( error => formattedErrors[error.field] = error.message )
          this.setState({ errors: formattedErrors })
        })
    }

  render() {
      return (
        <div className="mh-fullscreen bg-img center-vh p-20" style={{backgroundImage: 'url(assets/img/bg-girl.jpg)'}}>
        <div className="card card-shadowed p-50 w-400 mb-0" style={{maxWidth: '100%'}}>
          <h5 className="text-uppercase text-center">Register</h5>
          <br />
          <br />
          <form className="form-type-material" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Username" name="name" onChange={this.handleInputChange}/>
              {
                this.state.errors['name'] && 
                <small className="text-danger">{this.state.errors['name']}</small>
              }
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Email address" name="email"onChange={this.handleInputChange} />
              {
                this.state.errors['email'] && 
                <small className="text-danger">{this.state.errors['email']}</small>
              }
            </div>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleInputChange} />
              {
                this.state.errors['password'] && 
                <small className="text-danger">{this.state.errors['password']}</small>
              }
            </div>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="Password (confirm)" name="password_confirmation" onChange={this.handleInputChange} />
            </div>
            <br />
            <button className="btn btn-bold btn-block btn-primary" type="submit">Register</button>
          </form>
          <hr className="w-30" />
          <p className="text-center text-muted fs-13 mt-20">Already have an account?
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
      
    );
  }
};

export default SignUp;