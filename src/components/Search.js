import React, { useState } from "react";

const Search = props => {
  /**
   * hooks useState
   * 在设置initial state
   * 返回一个数组，第一个为初始值，第二个为更新方式，类似 this.setState
   */
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  }

  const resetInputField = () => {
    setSearchValue("");
  }

  const callSearchFn = e => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  }

  return (
    <form className="search">
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input
        onClick={callSearchFn}
        type="submit"
        value="搜索"
      />
    </form>
  )
}

export default Search;