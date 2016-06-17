import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as GalleryActions from './actions.js';
import {DEFAULT, LIKE, TIME} from './fetcher';
import {store} from './main';
import { WithContext as ReactTags } from 'react-tag-input';


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
    const {images, selectedImage, selectImage, sortingChanged, sorting, loadImages, loadTags, currentIndex, tags} = this.props;
    const topRow = images.slice(currentIndex + 0, currentIndex + 6).reverse().map((image, index) => (
              <InstagramSmallImage image={image} key={guid()} index={index}/>
            ));
    const leftColumn = images.slice(currentIndex + 6, currentIndex + 11).map((image, index) => (
                    <InstagramSmallImage image={image}  key={guid()} index={index}/>
                ));
    return (
    <div className="content">
    <MenuBar sorting={sorting} loadImages={loadImages} sortingChanged={sortingChanged} tags={tags}/>
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

      </div>
    )
  }

}

class InstagramSmallImage extends Component {
  componentDidMount () {
    var img = ReactDOM.findDOMNode(this.refs.img);
    if (this.props.index != 0) {
      img.style.transitionDelay = this.props.index / 10 +"s";  
    }
    setTimeout(()=>img.classList.add("enter-active"), 1);
  }
  render() {
    const {image, index} = this.props;
    return (
          <div className="gallery-image" ref="img">
            <img className="gallery-image-picture" src={image.url.standard_resolution}></img>
          </div>
    )
  }
}

class InstagramImage extends Component {
  render() {
    const {image} = this.props;
    return (
          <div className="gallery-image">
            <img className="gallery-image-picture" src={image.url.standard_resolution}></img>
            <div className="gallery-image-text">{image.text}</div>
            <div className="gallery-image-likes">{image.likes.count}</div>
          </div>
    )
  }
}

class MenuBar extends Component {
  render(){
    const {sorting, loadImages, sortingChanged, tags} = this.props;
    function radioSelected(selected){
        sortingChanged(selected);
        loadImages();
    }

    function handleAddition(tag){
      console.log(tag)
    }
    function handleDelete(i){
      console.log(tag)
    }
    let placeholder = "#tagger"
    let selectedTags =  [ {id: 1, text: "Apples"} ]
    let suggestions = Object.keys(tags);
    return (
      <div className="menubar">
          <form>
          <text> Sorter etter: </text>
            <text>Popularitet</text><input type="radio" name="sorting" checked={sorting == DEFAULT} onChange={() => radioSelected(DEFAULT)}/> 
            <text>Likes</text><input type="radio" name="sorting" checked={sorting == LIKE} onChange={() => radioSelected(LIKE)}/>
            <text>Tid</text><input type="radio" name="sorting" checked={sorting == TIME} onChange={() => radioSelected(TIME)}/>
            <span className="tagselect"><ReactTags  tags={selectedTags} suggestions={suggestions} labelField={'name'}  placeholder={placeholder} handleAddition={handleAddition} handleDelete={handleDelete} /> </span>
            </form>

        </div>)
  }
}

function mapStateToProps(state){
	return {
		images: state.images,
		selectedImage: state.selectedImage,
    currentIndex: state.currentIndex,
    tags: state.tags,
    sorting: state.sorting
	}
}

function mapActionCreatorsToProps(dispatch){
	return bindActionCreators(GalleryActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(Gallery)