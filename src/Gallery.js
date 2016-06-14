import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as GalleryActions from './actions.js'
import {RECENT, POPULAR, DEFAULT} from './fetcher'

export class Gallery extends Component {
	componentDidMount(){
		this.props.loadImages();
	}
  render() {
    const {images, selectedImage, selectImage, loadImages, sortingChanged, loadNextPage, loadPreviousPage} = this.props;
    return (
      <div className="image-gallery">
          <span>
            <button onClick={loadImages}>Last bilder</button>
            <button onClick={() => sortingChanged(RECENT)}>Nyeste</button>
            <button onClick={() => sortingChanged(POPULAR)}>Mest populære</button>
            <button onClick={() => sortingChanged(DEFAULT)}>Ingen sortering</button>
            <button onClick={loadPreviousPage}>Forrige side</button>
            <button onClick={loadNextPage}>Neste side</button>
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