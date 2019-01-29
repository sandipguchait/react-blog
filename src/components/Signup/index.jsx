import React from 'react';

// Importing Indicator for user validation
import { validateAll } from 'indicative';

class SignUp extends React.Component {

    state = {
      name:'',
      email :'',
      password :'',
      password_confirmation:''
    } 

    handleInputChange=(event)=>{
      this.setState({ 
        [event.target.name]: event.target.value
      })
    }

    handleSubmit=(event)=> {
      event.preventDefault();
      console.log(this.state);
      // Validating User using indicative Package
      //take the data from state 
      const data = this.state;
      const  rules = {
        name: 'required|string',
        email: 'required|email',
        password:'required|string|min:6|confirmed'
      };

      validateAll( data, rules )
        .then(() => {
          console.log('success')
        })
        .catch(errors => {
          console.log(errors);
          // show erroes to user
          const formattedErrors = {}
          errors.forEach( error => formattedErrors[error.field] = error.message )
          console.log(formattedErrors);
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
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Email address" name="email"onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="Password (confirm)" name="password_confirmation" onChange={this.handleInputChange} />
            </div>
            <br />
            <button className="btn btn-bold btn-block btn-primary" type="submit">Register</button>
          </form>
          <hr className="w-30" />
          <p className="text-center text-muted fs-13 mt-20">Already have an account?
            <a href="login.html">Sign in</a>
          </p>
        </div>
      </div>
      
    );
  }
};

export default SignUp;