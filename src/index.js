import React from 'react';
import ReactDOM from 'react-dom';
import Welcome  from './components/Welcome/index';
import { BrowserRouter, Route,  } from 'react-router-dom';

//components
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/index';
import CreateArticle from './components/CreateArticle/index';
import Login from './components/Login/index';

const Home =()=>(
    <h1> This is the Home Page </h1>
)

const About =()=>(
    <h1> This is the About Page </h1>
)


const Root = ()=> (
    <BrowserRouter>
    <div>
        <Navbar/>
        <Route exact path="/" component={Welcome} />
        <Route  path="/home" component={Home} />
        <Route  path="/about" component={About} />
        <Route path="/login" component={Login}/>
        <Route path="/articles/create" component={CreateArticle}/>
        <Footer/>
    </div>
    </BrowserRouter>
)


ReactDOM.render(<Root/>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}