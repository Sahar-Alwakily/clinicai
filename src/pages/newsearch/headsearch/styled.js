/*
 * @Author: heping
 * @Date: 2020-07-29 21:14:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-30 22:37:14
 * @Description:
 */

import styled from "styled-components";

const Hotsearchdiv = styled.div`
  width: 100%;
  padding: 0.3rem;
  margin-bottom: 0.2rem;
  background-color: #fff;
  h3 {
    font-size: 0.28rem;
    color: #b8b8b8;
    margin-bottom: 0.3rem;
  }
`;

const Hotsearchlistdiv = styled.div`
  display: flex;
  flex-flow: wrap;
  div {
    color: #fc5d7b;
    background: #f5f5f5;
    min-width: 2rem;
    border-radius: 999px;
    font-size: 0.26rem;
    line-height: 0.48rem;
    text-align: center;
    margin-right: 0.2rem;
    margin-bottom: 0.2rem;
  }
`;
const SearchHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.12rem;
  padding: 0.15rem 0.2rem;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.4rem;
  height: 0.4rem;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;
  flex-shrink: 0;
  color: #374151;
  
  svg {
    width: 0.24rem;
    height: 0.24rem;
  }
  
  &:hover {
    background: rgba(251, 207, 232, 0.2);
    color: #EC4899;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const Searchinput = styled.div`
  flex: 1;
  height: 0.64rem;
  justify-content: space-between;
  align-items: center;
  .am-search {
    background-color: #f5f5f5;
    height: 0.64rem;
    padding-left: 0.4rem;
    padding-right: 0.3rem;
    flex: 1;
    font-size: 0.22rem;
    border: 1px solid #e0e0e0;
    border-radius: 999px;
    display: flex;
    transition: all 0.3s ease;
    
    &:focus-within {
      border-color: #EC4899;
      background-color: #fff;
    }
    
    .am-search-synthetic-ph {
      background-color: #f5f5f5;
    }
    
    .am-search-cancel-show {
      width: 0.8rem;
      margin-left: 0.3rem;
      color: #EC4899;
      font-weight: 500;
    }
  }
  
  @media (min-width: 769px) {
    .am-search {
      font-size: 0.24rem;
    }
  }
`;

const SearchHistory = styled.div`
  margin-bottom: 0.2rem;
  background-color: #fff;
  h3 {
    height: 0.8rem;
    line-height: 0.8rem;
    padding: 0 0.3rem;
    border-bottom: 1px solid #ccc;
    font-size: 0.28rem;
    color: #b8b8b8;
    margin-bottom: 0.3rem;
  }
  .searchhistory-list {
    padding: 0 0.3rem;
    display: flex;
    flex-direction: column;
    div {
      line-height: 0.8rem;
      border-bottom: 1px solid #ccc;
    }
  }
  .searchhistory-clean {
    line-height: 0.8rem;
    text-align: center;
    font-size: 0.28rem;
    color: #b8b8b8;
  }
`;
export { Searchinput, Hotsearchdiv, Hotsearchlistdiv, SearchHistory, SearchHeader, BackButton };
