import React from 'react';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import * as queryString from 'query-string';
import { Select, Input, Button } from 'antd';

import TagPicker from '../AddQuote/TagPicker';

const Option = Select.Option;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 25px;
  @media(max-width: 1470px) {
    flex-direction: column;
  }
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-right: 25px;
  @media(max-width: 1470px) {
    justify-content: flex-start;
    margin-bottom: 5px;
  }
`;

const FieldLabel = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 5px;
  @media(max-width: 1470px) {
    width: 150px;
  }
`;

const FilterBar = (props) => {
  const { authors } = props;
  return (
    <Wrapper>
      <FieldWrapper>
        <FieldLabel>Authors</FieldLabel>
        <Select
          style={{width: "300px"}}
          placeholder="Filter by Authors"
          allowClear
          showSearch
          mode="multiple"
          onChange={(author) => props.setSelectedAuthors(author)
          }
        >
          {authors.map(author => {
              return <Option key={author.author} value={author.author}>{author.author}</Option>
            })
          }
        </Select>
      </FieldWrapper>
      <FieldWrapper>
        <FieldLabel>Tags</FieldLabel>
        <TagPicker 
          setSelectedTags={props.setSelectedTags}
          selectedTags={props.selectedTags}
        />
      </FieldWrapper>
      <FieldWrapper>
        <FieldLabel>Search Quotes</FieldLabel>
        <Input
          placeholder="Search Quote Text"
          style={{width: "300px"}}
          value={props.searchText}
          onChange={(e) => props.setSearchText(e.target.value)}
        />
        <Button 
          type="danger"
          icon="close-circle"
          title="Clear Search"
          onClick={() => props.setSearchText('')}
        />
      </FieldWrapper>
      <FieldWrapper>
        <FieldLabel>Rating</FieldLabel>
        <Select
          style={{width: "50px"}}
          allowClear
          onChange={(rating) => props.setFilterRating(rating)}
        >
          {[1,2,3,4,5].map(rating => <Select.Option key={rating}>{rating}</Select.Option>)}
        </Select>
      </FieldWrapper>
    </Wrapper>
  )
};

export default FilterBar;
