import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postActions';


class Posts extends Component {
    

    componentWillMount() {
        this.props.fetchPosts();
    }

    render() {
        const postItems = this.props.posts.map(post => (
            <div className="wrapper" key={post.id}>
                <h3 className="content-main" >{post.title}</h3>
                <p className="content-secondary">{post.body}</p>
            </div>
        ))
        
        return (
            <div className="container">
                <h1>Posts</h1>
                { postItems}
            </div>
        )
    };
}

Posts.propTypes = {
    fetchPosts : PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    posts: state.posts.items
});

export default connect(mapStateToProps, { fetchPosts })(Posts);