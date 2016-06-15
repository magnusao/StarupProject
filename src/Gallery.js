import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as GalleryActions from './actions.js'
import {DEFAULT, LIKE, TIME} from './fetcher'


export class Gallery extends Component {
	componentDidMount(){
		this.props.loadImages();
    setInterval(this.props.newImage, 1000000);

	}
  render() {
    const {images, selectedImage, selectImage, sortingChanged, currentIndex} = this.props;
    console.log(currentIndex);
    console.log(images);
    return (
      <div className="image-gallery">
          <div className="image-gallery-top">
          {images.slice(currentIndex + 4, currentIndex + 9).map((image, index) => (
            <InstagramSmallImage image={image} key={index} />
          ))}
          </div>
          <div className="image-gallery-bottom">
              <div className="image-gallery-bottom-left">
              {images.slice(currentIndex + 0, currentIndex + 4).map((image, index) => (
                <InstagramSmallImage image={image} key={index} />
              ))}
              </div>
              <div className="image-gallery-bottom-right">
              {images.slice(currentIndex + 9, currentIndex + 10).map((image, index) => (
                <InstagramImage image={image} key={index} />
              ))}
              </div>
          
          </div>
          
      </div>
    )
  }
}

class InstagramSmallImage extends Component {
  render() {
    const {image} = this.props;
    return (
          <div className="gallery-image">
            <image className="gallery-image-picture" src={image.url.standard_resolution}></image>
          </div>
    )
  }
}

class InstagramImage extends Component {
  render() {
    const {image} = this.props;
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
		selectedImage: state.selectedImage,
    currentIndex: state.currentIndex
	}
}

function mapActionCreatorsToProps(dispatch){
	return bindActionCreators(GalleryActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(Gallery)