import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as GalleryActions from './actions.js'
 

export class Gallery extends Component {
	componentDidMount(){
		this.props.loadImages();
	}
  render() {
    const {images, selectedImage, selectImage, loadImages, loadPopularImages, loadRecentImages} = this.props;
    return (
      <div className="image-gallery">
          <span>
            <button onClick={loadRecentImages}>Nyeste</button>
            <button onClick={loadPopularImages}>Mest populære</button>
            <button onClick={loadImages}>Ingen sortering</button>
          </span>

        <div className="gallery-image">
          <div>
            <img src={selectedImage} />
          </div>
        </div>
        <div className="image-scroller">
          {images.map((image, index) => (
            <div key={index} onClick={() => selectImage(image)}>
              <img src={image}/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
	return {
		images: state.images,
		selectedImage: state.selectedImage,
    sorting: state.sorting
	}
}

function mapActionCreatorsToProps(dispatch){
	return bindActionCreators(GalleryActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(Gallery)