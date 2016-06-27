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
  getSublist(list, start, length) {
    let currList = list.slice(start, start + length);
    let remaining = length - currList.length;
    if (remaining === 0) return currList;
    let toAdd = list.slice(0, remaining);
    return currList.concat(toAdd);
  }
	componentDidMount(){
    this.props.loadTags();
		this.props.loadImages();
    setInterval(this.props.newImage, 10000);

	}
  render() {
    const {images, selectedImage, selectImage, sortingChanged, sorting, loadImages, loadTags, currentIndex, tags, selectedTags, addTag, removeTag} = this.props;
    const leftColumn = images.length <= 1 ? null: this.getSublist(images, currentIndex, 5).map((image, index) => (
                    <InstagramSmallImage image={image}  key={guid()} index={index}/>
                ));
    return (
      <div className="image-gallery">
              <div className="image-gallery-left">
                {leftColumn}
              </div>
              <div className="image-gallery-right image-gallery-container">
              {this.getSublist(images, currentIndex, 1).map((image, index) => (
                <InstagramImage image={image} key={guid()} />
              ))}
              </div>
              <div className="image-gallery-container twitter-container">
              <a className="twitter-timeline"  data-dnt="true" data-chrome="noscrollbar nofooter" data-link-color="#6960a6" data-width="500" data-height="800" href="https://twitter.com/netlight">Tweets by netlight</a>
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
    // This delay is set to force react to first render the component and afterwards
    // change the class, triggering the ccs animation. 
    // Not a good solution.
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
    // This delay is set to force react to first render the component and afterwards
    // change the class, triggering the ccs animation.
    // Not a good solution.
      setTimeout(()=>this.setState({animationClass:"gallery-image enter-active"}),10);
    }
    markHashtags(text){
        const hashtagRegEx = /[#|@]\w+/g
        let tags = text.match(hashtagRegEx)
        let textArray = [];
    
        if (tags != null){
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
    return [{isTag:false, text:text}];
    
  }

timeSince(date) {
    date = new Date(parseInt(date)*1000)

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}

  render() {
    const {image} = this.props;
    let media;
    console.log(image)
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
            <div className="gallery-image-date">{this.timeSince(image.created_time)}</div>
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
