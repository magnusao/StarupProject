import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as GalleryActions from './actions.js'

export class Gallery extends Component {
	componentDidMount(){
		this.props.loadImages();
	}
  render() {
    const {images, selectedImage, selectImage} = this.props;
    return (
      <div className="image-gallery">
          {images.map((image, index) => (
            <InstagramImage image={image} key={index} />
          ))}
      </div>
    )
  }
}

class InstagramImage extends Component {
  render() {
    const {image} = this.props;
    console.log(image);
    return (
          <div className="gallery-image">
            <image className="gallery-image-picture" src={image.url.standard_resolution}></image>
            <div className="gallery-image-text">{image.text}</div>
            <div className="gallery-image-likes">{image.likes.count}</div>
          </div>
    )
  }
}

function mapStateToProps(state){
	return {
		images: state.images,
		selectedImage: state.selectedImage
	}
}

function mapActionCreatorsToProps(dispatch){
	return bindActionCreators(GalleryActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(Gallery)