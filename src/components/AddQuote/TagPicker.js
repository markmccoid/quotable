import React from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../DataProvider';
import { Select } from 'antd';
const Option = Select.Option;

const TagPicker = props => {
  return (
    <AppContext.Consumer>
      {({ tags }) => {
        
        return (<Select
          style={{width: "300px"}}
          allowClear
          showSearch
          placeholder="Tags"
          mode= {props.mode}
          value={props.selectedTags}
          onChange={(tag) => props.setSelectedTags(tag) }
        >
          {tags.map(tag => {
              return <Option key={tag} value={tag}>{tag}</Option>
            })
          }
        </Select>)
      }
      }
    </AppContext.Consumer>)
};

TagPicker.propTypes = {
  setSelectedTags: PropTypes.func,
  selectedTags: PropTypes.array
}
TagPicker.defaultProps = {
  mode: "multiple"
}
export default TagPicker;