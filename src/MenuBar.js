import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MenuBarActions from './actions.js';
import {DEFAULT, LIKE, TIME} from './fetcher';
import { WithContext as ReactTags } from 'react-tag-input';


class MenuBar extends Component {
  constructor(props, context) {
	super(props, context);
  };
  render(){
	const {sorting, loadImages, sortingChanged, tags, menuOpen, selectedTags, addTag, removeTag, toggleMenu} = this.props;
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
	let menubarInputClass = "menubar-input";
	if (menuOpen) menubarInputClass += " open";
	return (
	  <div className="menubar">
		  <div className="menubar-content">
		  <img className="logo menubar-element" src="resources/menu.svg" onClick={toggleMenu}></img>
			<div className={menubarInputClass}>
			<SeletedTags selectedTags={selectedTags} addTag={handleAdd} removeTag={removeTag} loadImages={loadImages}></SeletedTags>
			<TagInput tags={tags} addTag={addTag} removeTag={removeTag} loadImages={loadImages} selectedTags={selectedTags}/>
			<form className="sort-buttons">
				<input type="radio" name="sorting" checked={sorting == DEFAULT} onChange={() => radioSelected(DEFAULT)}/><text>Most popular</text>
				<input type="radio" name="sorting" checked={sorting == LIKE} onChange={() => radioSelected(LIKE)}/><text>Most liked</text>
				<input type="radio" name="sorting" checked={sorting == TIME} onChange={() => radioSelected(TIME)}/><text>Newest</text>
			</form>
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
	return (<div className="selectedTags menubar-element">
	  {selectedTags.map((tag, index) => {return (
		  <button key={index} type="button" className="selectedTagDeleteButton" onClick={handleDelete.bind(this, index, tag)}> #{tag}</button> )})}
	  </div>)
  }
}

class TagInput extends Component{

  constructor(props, context){
	super(props, context)
	this.state = {
		inputValue: "", 
		suggestions: []
	  }  }

  handleAddTag(tag){
	  const {loadImages, addTag, removeTag} = this.props
	  addTag(tag);
	  loadImages()
	  this.setState({inputValue: "", suggestions: []})
  }
  handleKeyDown(e){
	const ENTER_KEY_CODE = 13;
	const BACKSPACE_KEY_CODE = 8;
	const {loadImages, addTag, removeTag, selectedTags} = this.props
	if (e.keyCode == ENTER_KEY_CODE){
	  this.handleAddTag(this.state.suggestions[0].text)
	} 

	if ((e.keyCode == BACKSPACE_KEY_CODE) && (this.state.inputValue == "")){
	  let indexOfLastTag = selectedTags.length-1
	  removeTag(indexOfLastTag, "")
	  loadImages();
	}
  }
  render(){ 
	const {tags} = this.props;
	const MIN_INPUT_LENGTH = 2;

	function handleChange(input){
	let searchText = input.target.value.toLowerCase();
	this.state.inputValue = searchText;
	if (searchText.length >= MIN_INPUT_LENGTH){
		let suggestions = Object.keys(tags).filter((t)=> (t.indexOf(searchText) != -1));
		
		suggestions = suggestions.map((t) => {
			let searchTextIndex = t.indexOf(searchText);
			return {
				text: t,
				prefix: t.slice(0, searchTextIndex),
				selection: t.slice(searchTextIndex, searchTextIndex + searchText.length),
				suffix: t.slice(searchTextIndex + searchText.length)
				}
		  })
	  this.setState({suggestions: suggestions})
	} else {
		this.setState({suggestions: []})
	}
	}
	
	return (<div className="TagInput">
			  <input type="text" placeholder="#" value={this.state.inputValue} onKeyDown={this.handleKeyDown.bind(this)} onChange={handleChange.bind(this)}></input>
			  <ul className="TagInputSuggestions">
				{this.state.suggestions.map((tag,index) => {return (<li onClick={this.handleAddTag.bind(this, tag.text)} key={index}>{tag.prefix}<mark>{tag.selection}</mark>{tag.suffix}</li>)})}                
			  </ul>
			</div>)
  }
}

function mapStateToProps(state){
  return {
	sorting: state.sorting,
	tags: state.tags,
	selectedTags: state.selectedTags,
	menuOpen: state.menuOpen
  }
}

function mapActionCreatorsToProps(dispatch){
  return bindActionCreators(MenuBarActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(MenuBar);