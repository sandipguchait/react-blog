import React from 'react';
import ReactDOM from 'react-dom';
import Welcome  from './components/Welcome/index';
import { BrowserRouter, Route, withRouter  } from 'react-router-dom';

//components
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/index';
import CreateArticle from './components/CreateArticle/index';
import Login from './components/Login/index';
import SingleArticle from './components/SingleArticle/index';
import Signup from './components/Signup';

class App extends React.Component {

    state = {
        authUser: null
    }

    componentDidMount = ()=> {
        const user = localStorage.getItem('user')
        if (user) {
            this.setState({ authUser: JSON.parse(user)})
        }
    }

    setAuthUser = (authUser)=> {
        this.setState({
            authUser
        })
    }

    render() {
        const {location} = this.props;
        return (
            <div>
                {
                    location.pathname !== '/login' && location.pathname !== '/signup' && <Navbar authUser={this.state.authUser}/>
                }
                <Route exact path="/" component={Welcome} />
                <Route  path="/login" render={(props)=> <Login {...props} setAuthUser={this.setAuthUser} />}/>
                <Route  path="/signup" render={(props) => <Signup  {...props}  setAuthUser={this.setAuthUser}/>}/>
                <Route  path="/article/:id" component={SingleArticle}/>
                <Route  path="/articles/create" component={CreateArticle}/>
                {
                    location.pathname !== '/login' && location.pathname !== '/signup' && <Footer/>
                }
            </div>
        )
    }
}


// Hiding navbar and footer with authentication pages 
const Main = withRouter((props)=> {
    return(
        <App {...props}/>
    )
})

const Root = ()=> (
    <BrowserRouter>
        <Main/>
    </BrowserRouter>
)


ReactDOM.render(<Root/>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}