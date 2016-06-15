import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as GalleryActions from './actions.js'
import {DEFAULT, LIKE, TIME} from './fetcher'
import {store} from './main'



export class Gallery extends Component {
	componentDidMount(){
		this.props.loadImages();
	}
  render() {
    const {images, selectedImage, selectImage, sortingChanged, loadImages} = this.props;
    return (

      <div className="image-gallery">
        <div className="menubar">
          <text> Sorter etter: </text>
          <form>
            <text>Popularitet</text><input type="radio" name="sorting" checked={store.getState().sorting == DEFAULT} onChange={() => onRadioSelected(DEFAULT, sortingChanged, loadImages)}/> 
            <text>Likes</text><input type="radio" name="sorting" checked={store.getState().sorting == LIKE} onChange={() => onRadioSelected(LIKE, sortingChanged, loadImages)}/>
            <text>Tid</text><input type="radio" name="sorting" checked={store.getState().sorting == TIME} onChange={() => onRadioSelected(TIME, sortingChanged, loadImages)}/>
          </form>
        </div>
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
    const divStyle = {backgroundImage: 'url(' + image.url.standard_resolution + ')'};
    return (
          <div className="gallery-image" style={divStyle}>
            <span className="gallery-image-text">{image.text}</span>
            <span className="gallery-image-likes">{image.likes.count}</span>
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

function onRadioSelected(selected, sortingChanged, loadImages){
  sortingChanged(selected);
  loadImages();
}

function mapActionCreatorsToProps(dispatch){
	return bindActionCreators(GalleryActions, dispatch);
}



export default connect(mapStateToProps, mapActionCreatorsToProps)(Gallery)