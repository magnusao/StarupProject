import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as GalleryActions from './actions.js'
import {DEFAULT, LIKE, TIME} from './fetcher'
import { WithOutContext as ReactTags } from 'react-tag-input';
import {store} from './main'



export class Gallery extends Component {
	componentDidMount(){
		this.props.loadImages();
    console.log(ReactTags)
	}
  render() {
    const {images, selectedImage, selectImage, sortingChanged, loadImages, sorting} = this.props;
    return (

      <div className="image-gallery">
        <MenuBar loadImages={loadImages} sortingChanged={sortingChanged} sorting={sorting}/>
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

class MenuBar extends Component {
  render(){
    const {sorting, loadImages, sortingChanged} = this.props;
    function radioSelected(selected){
        sortingChanged(selected);
        loadImages();
    }

    function handleAddition(tag){
      console.log(tag)
    }
       function handleDelete(tag){
      console.log(tag)
    }
    let suggestions = ["mango", "pineapple", "orange", "pear"];
    let placeholder = "#tagger"
    let tags = []

    return (
      <div className="menubar">
          <form>
          <text> Sorter etter: </text>
            <text>Popularitet</text><input type="radio" name="sorting" checked={sorting == DEFAULT} onChange={() => radioSelected(DEFAULT)}/> 
            <text>Likes</text><input type="radio" name="sorting" checked={sorting == LIKE} onChange={() => radioSelected(LIKE)}/>
            <text>Tid</text><input type="radio" name="sorting" checked={sorting == TIME} onChange={() => radioSelected(TIME)}/>
            <ReactTags tags={tags} suggestions={suggestions} labelField={'name'}  placeholder={placeholder} handleAddition={handleAddition} handleDelete={handleDelete} /> 
            </form>
        </div>)
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