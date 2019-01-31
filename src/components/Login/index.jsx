import React from 'react';
import Axios from 'axios'

import { validateAll } from 'indicative';
import config from '../../config/index';

import LoginForm from '../loginForm/index';


class Login extends React.Component {

  state = {
    email:'',
    password:'',
    errors:{}
  }

  handleInputChange=(event)=>{
    this.setState({ 
      [event.target.name]: event.target.value
    })
  }

  handleSubmit =(event)=> {
    event.preventDefault();
    console.log(this.state)

    const data = this.state;
      const  rules = {
        email: 'required|email',
        password:'required|string' // confirmed will check for the password confirmation 
      };

      // Displaying custom messages for errors
      const messages = {
        required: ' This {{ field }} is required.',
        'email.email': 'The email is invalid.'
      }

      validateAll( data, rules, messages )
        .then(() => {
          //register the user
            Axios.post(`${config.apiUrl}/auth/login`, {
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
              if( errors.response && errors.response.status === 401 ){
                formattedErrors['email'] = 'Incorrect email or password'; // we fetch the error from response.data with the name of email and in 1st position [0].
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

  render(){
    return(
      <LoginForm  
      handleInputChange={this.handleInputChange}
      handleSubmit={this.handleSubmit}
      errors={this.state.errors}
      />
    )
  }
}

export default Login;