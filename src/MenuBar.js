import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MenuBarActions from './actions.js';
import {DEFAULT, LIKE, TIME} from './fetcher';
import { WithContext as ReactTags } from 'react-tag-input';


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

    let placeholder = "#"
    let suggestions = Object.keys(tags);
    let menubarContentClass = "menubar-content";
    if (menuOpen) menubarContentClass += " open";
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
    sorting: state.sorting,
    tags: state.tags,
    selectedTags: state.selectedTags

  }
}

function mapActionCreatorsToProps(dispatch){
  return bindActionCreators(MenuBarActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(MenuBar);