import React, { Component } from 'react';

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title : '',
            body : ''
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const post = {
            title: this.state.title,
            body: this.state.body
        }

    }

    
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="content-main">Add Post</h1>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Title : </label><br />
                                <input className="form-control" type="text" name="title" onChange={this.onChange} value={this.state.title} />
                            </div>
                            <br />
                            <div className="form-group">
                                <label>Body : </label><br />
                                <textarea className="form-control" name="body" onChange={this.onChange} value={this.state.body} />
                            </div>
                            <br />
                            <button type="submit">Submit</button>
                        </form>
                        <hr />
                    </div>
                    <div className="col-md-6">
                        <img src="../../images/explore-section1.jpg" alt="" className="img-fluid mb-3 rounded-circle" />
                    </div>
                </div>
            </div>
        )
    }
}

export default PostForm;