import React, { Component } from 'react';
import Banner from '../Banner/index';

 import getCategories from './article';
 import { ArticleUpload } from './article';

class CreateArticle extends Component {

    state= {
        title:'',
        image:null,
        content:'',
        channel:null,
        errors:{},
        categories:[]
    }

    handleInputChange=(event)=>{
        this.setState({ 
          [event.target.name]: event.target.type === 'file' ? event.target.files[0]: event.target.value,
        })
      }

    async componentWillMount(){
        const categories = await getCategories();
        this.setState({
            categories
        })
    }

    handleSubmit = async (event)=> {
        event.preventDefault();
       try {
         const article = await ArticleUpload(this.state, this.props.token.token)
         this.props.history.push('/')
       } catch (errors){
           console.log(errors)
           this.setState({ errors })
       }
    }

    render() {
        const { categories } = this.state;
        return (
        <div>
            <Banner 
                backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-laptop.jpg)`}
                title="Write an Article"
                subTitle="Write what you love"
            />
            {/* Main container */}
            <main className="main-content">
                <section className="section">
                <div className="container">
                    <div className="row">
                    <div className="col-12 col-lg-12">
                        <form className="p-30 bg-gray rounded" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="form-group col-md-12 my-5">
                            <input 
                                type="file" 
                                name="image"
                                className="form-control" 
                                onChange={this.handleInputChange}
                            />
                            </div>
                            <div className="form-group col-12 col-md-6">
                            <input 
                                className="form-control form-control-lg" 
                                type="text" 
                                name="title" 
                                placeholder="Title"
                                onChange={this.handleInputChange} 
                            />
                            </div>
                            <div className="form-group col-12 col-md-6">
                            <select 
                                name="channel" 
                                id className="form-control form-control-lg"
                                onChange={this.handleInputChange}
                            >
                                <option value>Select category</option>
                                { categories && categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                                
                            </select>
                            </div>
                        </div>
                        <div className="form-group">
                        <textarea
                            className="form-control form-control-lg"
                            rows={4}
                            placeholder="Content"
                            name="content"
                            defaultValue=""
                            onChange={this.handleInputChange}
                        />
                        </div>
                        <div className="text-center">
                            <button className="btn btn-lg btn-primary" type="submit">Create Article</button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </section>
            </main>
        </div>

        );
    }
}

export default CreateArticle;