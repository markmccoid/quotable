import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
/**
 * props: searchArray: [], searchOn: bool
 * if searchOn === false, then just a regular input/textarea 
 * Uses the passed searchArray and display like google predictive search
 * Escape key press turns off
 * Renders the passed child function (input or textarea) and spreads the needed
 * props to perform the search.
 * Example implementation:
 * <SearchInput 
      searchArray={authors.map(author => author.author)}
      updateAuthor={(e) => this.setState({author: e})}
    >
      {(props) => {
          return (
            <input 
              {...props} 
              value={this.state.author}
              className="ant-input"
              placeholder="Enter an Author"  
            />
          )
        }
      }
    </SearchInput>
 */
const SearchInput = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [backspace, setBackspace] = useState(false);
  const [escKey, setEscKey] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [endPos, setEndPos] = useState(0);
  const inputEl = useRef();

  const onKeyDown = (e) => {
    const keyPressed = e.key;
    //Check keyPressed and set selection
    switch (keyPressed) {
      case 'ArrowRight':
        setStartPos(inputEl.current.selectionStart+1)
        setEndPos(inputEl.current.selectionStart+1)
        break;
      case 'ArrowLeft': 
        setStartPos(inputEl.current.selectionStart-1)
        setEndPos(inputEl.current.selectionStart-1)
        break;
      case 'Backspace': 
        if(startPos !== endPos) {
          setStartPos(inputEl.current.selectionStart)
          setEndPos(inputEl.current.selectionStart)
        } else {
          setStartPos(inputEl.current.selectionStart-1)
          setEndPos(inputEl.current.selectionStart-1)
        }
        setBackspace(true);
        break;
      case 'Delete': 
        setStartPos(inputEl.current.selectionStart)
        setEndPos(inputEl.current.selectionStart)
        setBackspace(true);
        break;
      case 'Escape':
        setStartPos(inputEl.current.selectionStart)
        setEndPos(inputEl.current.selectionStart)
        setEscKey(!escKey)
        break;
      default:
        break;
    }
  }
  const onInputChange = (e) => {
      //Get input value
      //CHECK FOR this.state.backspace and if true, set state to target.value passed
      // and set backspace to false
      const inputValue = e.target.value;
      if (!props.searchOn) {
        props.updateAuthor(inputValue);
        return
      }
      // console.log(`inputValue: ${inputValue}`);
      if (backspace || escKey) {
        setInputValue(inputValue);
        props.updateAuthor(inputValue)
        setBackspace(false);
        return
      }
      //Setup match expression
      const matchExpr = inputValue.length > 0 ? '^' + inputValue : /.^/;
      //Create RegExp Object
      const expr = new RegExp(matchExpr, 'ig');
      //Try and Find a match in array of service inputValues
      const foundItem = props.searchArray.find((desc) => desc.match(expr));
      // console.log(`foundItem ${foundItem}`);
      //If not found, return inputValue, else return found item and set selection range
      const finalValue = foundItem || inputValue;
  
      setStartPos(inputValue.length);
      setEndPos(finalValue.length);
      // console.log(`startpos: ${startPos} -- endpos: ${endPos} -- foundItem: ${foundItem}`)
      setInputValue(finalValue);
      props.updateAuthor(finalValue)
  }
  useEffect(() => {
    if (startPos !== endPos) {
      inputEl.current.setSelectionRange(startPos, endPos);
    } 
  })

  return (
    props.children({ref: inputEl, value: inputValue,onKeyDown: onKeyDown, onChange: onInputChange})
  )
}
SearchInput.defaultProps = {
  searchArray: [],
  searchOn: true
}
SearchInput.propTypes = {
  searchArray: PropTypes.array,
  searchOn: PropTypes.bool
}
export default SearchInput;