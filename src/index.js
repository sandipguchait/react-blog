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

// Hiding navbar and footer with authentication pages 
const Main = withRouter(({ location  })=> {
    return(
        <div>
        {
            location.pathname !== '/login' && location.pathname !== '/signup' && <Navbar/>
        }
        <Route exact path="/" component={Welcome} />
        <Route  path="/login" component={Login}/>
        <Route  path="/signup" component={Signup}/>
        <Route  path="/article/:id" component={SingleArticle}/>
        <Route  path="/articles/create" component={CreateArticle}/>
        {
            location.pathname !== '/login' && location.pathname !== '/signup' && <Footer/>
        }
    </div>
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