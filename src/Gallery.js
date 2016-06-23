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
    setInterval(this.props.newImage, 10000);

	}
  render() {
    const {images, selectedImage, selectImage, sortingChanged, sorting, loadImages, loadTags, currentIndex, tags, selectedTags, addTag, removeTag} = this.props;
    const leftColumn = images.slice(currentIndex + 0, currentIndex + 5).map((image, index) => (
                    <InstagramSmallImage image={image}  key={guid()} index={index}/>
                ));
    return (
      <div className="image-gallery">
              <div className="image-gallery-left">
                {leftColumn}
              </div>
              <div className="image-gallery-right">
              {images.slice(currentIndex + 0, currentIndex + 1).map((image, index) => (
                <InstagramImage image={image} key={guid()} />
              ))}
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
    setTimeout(()=>this.setState({animationClass:"gallery-image enter-active"}),10);
  }
  render() {
    const {image, index} = this.props;

    return (
          <div className={this.state.animationClass} >
            <img className="gallery-image-picture" src={image.imageUrl.thumbnail}></img>
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
    setTimeout(()=>this.setState({animationClass:"gallery-image enter-active"}),10);
  }
  markHashtags(text){
    const hashtagRegEx = /[#|@]\w+/g
    let tags = text.match(hashtagRegEx)
    let textArray = [];

    tags.forEach((tag)=>{
      let startIndex = text.indexOf(tag)
      let endIndex = startIndex + tag.length
      textArray.push({
        isTag: false,
        text: text.slice(0, startIndex)
      })
      textArray.push({
        isTag: true,
        text: text.slice(startIndex, endIndex)
      })
      text = text.slice(endIndex, text.length)
    })
    return textArray;
  }
  render() {
    const {image} = this.props;
    let media;
    if (image.type === "video") {
      media = (<video className="gallery-image-picture" autoPlay loop>
        <source src={image.videoUrl.standard_resolution} type="video/mp4" />
      </video>);
    } else {
      media = <img className="gallery-image-picture" src={image.imageUrl.standard_resolution}></img>;
    }


    return (
          <div className={this.state.animationClass}>
            {media}

            <div className= "gallery-image-info">
            <div className="gallery-image-likes"><span>{image.likes.count}</span></div>
            <div className="gallery-image-text">{this.markHashtags(image.text).map((text) =>  {
              if (text.isTag) return (<span className="hashtag" > {text.text} </span>)
              return text.text;

            })}</div>
            <img alt = "logo" className="gallery-image-logo" src = "/resources/NLlogo.svg"/>
            </div>
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
