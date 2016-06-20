import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as GalleryActions from './actions.js';
import {store} from './main';



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
    this.props.loadTags();
		this.props.loadImages();
    setInterval(this.props.newImage, 5000);

	}
  render() {
    const {images, selectedImage, selectImage, sortingChanged, sorting, loadImages, loadTags, currentIndex, tags, selectedTags, addTag, removeTag} = this.props;
    const topRow = images.slice(currentIndex + 0, currentIndex + 6).reverse().map((image, index) => (
              <InstagramSmallImage image={image} key={guid()} index={index}/>
            ));
    const leftColumn = images.slice(currentIndex + 6, currentIndex + 11).map((image, index) => (
                    <InstagramSmallImage image={image}  key={guid()} index={index}/>
                ));
    return (
      <div className="image-gallery">
          <div className="image-gallery-top">
            {topRow}
          </div>
          <div className="image-gallery-bottom">
              <div className="image-gallery-bottom-left">
                {leftColumn}
              </div>
              <div className="image-gallery-bottom-right">
              {images.slice(currentIndex + 0, currentIndex + 1).map((image, index) => (
                <InstagramImage image={image} key={guid()} />
              ))}
              </div>
          </div>
      </div>
    )
  }

}

class InstagramSmallImage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {animationClass: "gallery-image"};
  };
  componentDidMount () {
    //this.setState({animationClass:"gallery-image enter-active"});
    setTimeout(()=>this.setState({animationClass:"gallery-image enter-active"}),1);
  }
  render() {
    const {image, index} = this.props;

    console.log("Rendering " + this.state.animationClass);
    return (
          <div className={this.state.animationClass} >
            <img className="gallery-image-picture" src={image.url.standard_resolution}></img>
          </div>
    )
  }
}

class InstagramImage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {animationClass: "gallery-image"};
  };
  componentDidMount () {
    //this.setState({animationClass:"gallery-image enter-active"});
    setTimeout(()=>this.setState({animationClass:"gallery-image enter-active"}),1);
  }
  render() {
    const {image} = this.props;
    return (
          <div className={this.state.animationClass}>
            <img className="gallery-image-picture" src={image.url.standard_resolution}></img>
            <div className="gallery-image-text">{image.text}</div>
            <div className="gallery-image-likes"><span>{image.likes.count}</span></div>
          </div>
    )
  }
}

function mapStateToProps(state){
	return {
		images: state.images,
		selectedImage: state.selectedImage,
    currentIndex: state.currentIndex,
    sorting: state.sorting,
    tags: state.tags,
    selectedTags: state.selectedTags

	}
}

function mapActionCreatorsToProps(dispatch){
	return bindActionCreators(GalleryActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(Gallery);
