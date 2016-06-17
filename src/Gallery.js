import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as GalleryActions from './actions.js'
import {DEFAULT, LIKE, TIME} from './fetcher'
import {store} from './main'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const guid = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export class Gallery extends Component {
	componentDidMount(){
		this.props.loadImages();
    setInterval(this.props.newImage, 5000);

	}
  render() {
    const {images, selectedImage, selectImage, sortingChanged, loadImages, currentIndex} = this.props;
    const topRow = images.slice(currentIndex + 0, currentIndex + 6).reverse().map((image, index) => (
              <InstagramSmallImage image={image} key={guid()} index={index}/>
            ));
    const leftColumn = images.slice(currentIndex + 6, currentIndex + 11).map((image, index) => (
                    <InstagramSmallImage image={image}  key={guid()} index={index}/>
                ));
    return (
    <div className="content">
      <div className="menubar">
          <text> Sorter etter: </text>
          <form>
            <text>Popularitet</text><input type="radio" name="sorting" checked={store.getState().sorting == DEFAULT} onChange={() => onRadioSelected(DEFAULT, sortingChanged, loadImages)}/> 
            <text>Likes</text><input type="radio" name="sorting" checked={store.getState().sorting == LIKE} onChange={() => onRadioSelected(LIKE, sortingChanged, loadImages)}/>
            <text>Tid</text><input type="radio" name="sorting" checked={store.getState().sorting == TIME} onChange={() => onRadioSelected(TIME, sortingChanged, loadImages)}/>
          </form>
        </div>
      <div className="image-gallery">
          <div className="image-gallery-top">
            {topRow}
          </div>
          <div className="image-gallery-bottom">
              <div className="image-gallery-bottom-left">
                {leftColumn}
              </div>
              <div className="image-gallery-bottom-right">
              <ReactCSSTransitionGroup transitionName="center-img">
              {images.slice(currentIndex + 0, currentIndex + 1).map((image, index) => (
                <InstagramImage image={image} key={index} />
              ))}
              </ReactCSSTransitionGroup>
              </div>
          </div>
      </div>
      </div>
    )
  }

}

class InstagramSmallImage extends Component {
  componentDidMount () {
    var img = React.findDOMNode(this.refs.img);
    if (this.props.index != 0) {
      img.style.transitionDelay = this.props.index / 10 +"s";  
    }
    setTimeout(()=>img.classList.add("enter-active"), 1);
  }
  render() {
    const {image, index} = this.props;
    return (
          <div className="gallery-image" ref="img">
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

function onRadioSelected(selected, sortingChanged, loadImages){
  sortingChanged(selected);
  loadImages();
}

function mapActionCreatorsToProps(dispatch){
	return bindActionCreators(GalleryActions, dispatch);
}



export default connect(mapStateToProps, mapActionCreatorsToProps)(Gallery)