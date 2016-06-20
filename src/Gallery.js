import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as GalleryActions from './actions.js';
import {DEFAULT, LIKE, TIME} from './fetcher';
import {store} from './main';
import { WithContext as ReactTags } from 'react-tag-input';
import { DragSource } from 'react-dnd';



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
    <div className="content">
    <MenuBar sorting={sorting} loadImages={loadImages} sortingChanged={sortingChanged} tags={tags} selectedTags={selectedTags} addTag={addTag} removeTag={removeTag}/>
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
            <div className="gallery-image-likes">{image.likes.count}</div>
          </div>
    )
  }
}

class MenuBar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {menuOpen: false};
  };
  toggleMenu() {
    this.setState({menuOpen: !this.state.menuOpen});
  }
  render(){
    const {sorting, loadImages, sortingChanged, tags, selectedTags, addTag, removeTag} = this.props;
    const {menuOpen} = this.state;
    function radioSelected(selected){
        sortingChanged(selected);
        loadImages();
    }

    function handleDelete(index, tag){
      let indexOfLastTag  = (selectedTags.length - 1);
      removeTag(indexOfLastTag, selectedTags[indexOfLastTag])
      loadImages();
    }

    function handleAdd(tag){
      addTag(tag)
      loadImages();
    }

    let placeholder = "tagger"
    let suggestions = Object.keys(tags);
    let menubarContentClass = "menubar-content";
    if (!menuOpen) menubarContentClass += " open";
    return (
      <div className="menubar">
          <div className={menubarContentClass}>
          <img id="logo" src="http://localhost:3000/resources/logo.svg" onClick={this.toggleMenu.bind(this)}></img>
            <div className="menubar-input">
              <form className="sort-buttons">
                <text>Popularitet</text><input type="radio" name="sorting" checked={sorting == DEFAULT} onChange={() => radioSelected(DEFAULT)}/>
                <text>Likes</text><input type="radio" name="sorting" checked={sorting == LIKE} onChange={() => radioSelected(LIKE)}/>
                <text>Tid</text><input type="radio" name="sorting" checked={sorting == TIME} onChange={() => radioSelected(TIME)}/>
              </form>
              
              <SeletedTags selectedTags={selectedTags} addTag={handleAdd} removeTag={removeTag} loadImages={loadImages}></SeletedTags>
              <ReactTags
                suggestions={suggestions}
                labelField={'name'}
                placeholder={placeholder}
                handleAddition={handleAdd}
                handleDelete={handleDelete}
                autocomplete={true}
                minQueryLength={2}
                allowDeleteFromEmptyInput={true}/>
          </div>
        </div>
        </div>);
  }
};

class SeletedTags extends Component {
  render(){
    function handleDelete(index, tag){
      removeTag(index, tag);
      loadImages();
    }
    const {selectedTags, addTag, removeTag, loadImages} =  this.props;
    return (<div className="selectedTags">
      {selectedTags.map((tag, index) => {return (
          <button key={index} type="button" className="selectedTagDeleteButton" onClick={handleDelete.bind(this, index, tag)}> #{tag}</button> )})}
      </div>)
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

export default connect(mapStateToProps, mapActionCreatorsToProps)(Gallery)
