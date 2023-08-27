import React, { useState } from "react";
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { Link } from "react-router-dom";

const ShowSearchBar = () => {
  const [query, setQuery] = useState("");
  return (
    <InputGroup size='md'>
      <Input 
        placeholder='Search for a TV Show'
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <InputRightElement width='4.5rem'>
        {
          query
            ? (
              <Link to={`/shows/search/${encodeURIComponent(query.trim())}`}>
                <SearchButton />
              </Link>
            )
            : (
              <SearchButton />
            )
        }
      </InputRightElement>
    </InputGroup>
  );
}

const SearchButton = () => {
  return (
    <Button 
      h='1.75rem' 
      size='sm' 
    >
      Search
    </Button>
  )
}

export default ShowSearchBar;