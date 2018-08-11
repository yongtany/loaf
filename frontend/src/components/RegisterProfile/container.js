import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RegisterProfile from './presenter';


class Container extends Component {
    
    state = {
        file : '',
        profile_image: "",
        address: "",
        school: "",
        major: "",
        website: "",
        bio: "",
        tags: [],   
    };

    static propTypes ={
        createProfile : PropTypes.func.isRequired
    };
    
    
    
    render() {
        const { address, school, major, website, bio, tags} = this.state;
        return(
            <RegisterProfile
                addressValue = {address}
                schoolValue = {school}
                majorValue = {major}
                websiteValue = {website}
                bioValue = {bio}
                tags = {tags}
                tagsValue = { this._handleUpdateTags}
                handleInputChange={this._handleInputChange}
                handleSubmit={this._handleSubmit}
            />
        )
    };

    _handleUpdateTags = (tags) => {
        this.setState({ tags });
    }

    _handleInputChange = event => {
        const { target : { value, name}} = event;
        this.setState({
            [name] : value
        });
    }
    _handleSubmit = event => {
        const { createProfile } = this.props;
        const { profile_image, address, school, major, website, bio, tags } = this.state;
        event.preventDefault();
 //       let formData = new FormData();
 //       formData.append('file', this.state.file);
        // redux will be here
        createProfile(profile_image, address, school, major, website, bio, tags);
    }

}

export default Container;
