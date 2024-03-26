import { useList } from "../hooks/useList";
import { useState } from "react";
import ListContent from "../componentes/ListContent";
import styled from "styled-components";
import Pagination from "rc-pagination";

const ListWrapper = styled.div`
  position: absolute;
  width: 400px;
  height: 619px;
  left: 30px;
  top: 152px;
  overflow-y: scroll;
  overflow-x: hidden;

  background: #f8f8f8;
  border-radius: 16px;

  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0cb46c;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #ebebeb;
    border-radius: 10px;
  }

  ${(props) =>
    props.$custom
      ? `
    /* Frame 62 */

    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 20px;
    

    position: absolute;
    width: 1012px;
    height: 596px;
    left: 658px;
    top: 224px;
  `
      : ` `}
  @media (max-width: 786px) {
    /* Frame 11 */

    position: absolute;
    width: 385px;
    height: 516px;
    left: 15px;
    top: 112px;
  }
`;

export const StyledPagination = styled(Pagination)`
  /* Frame 24 */
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  width: 302px;
  height: 40px;
  left: calc(50% - 365px / 2);
  top: 770px;

  ${(props) =>
    props.$custom &&
    `
    /* Frame 29 */

    position: absolute;
    width: 302px;
    height: 40px;
    left: calc(50% - 302px/2 + 204px);
    top: 840px;
  `}

  @media (max-width: 786px) {
    /* Frame 24 */

    position: absolute;
    width: 302px;
    height: 40px;
    left: calc(50% - 365px / 2);
    top: 638px;
  }

  a,
  a:hover,
  a:focus {
    text-decoration: none;
    transition: 0.5s;
    outline: none;
  }
  .pagination-data {
    padding: 0;
    margin: 0;
  }
  .pagination-data li {
    list-style: none;
  }
  .table-filter-info {
    padding: 15px;
  }
  .thead-primary tr th {
    background-color: #5a8dee;
    border-color: #5a8dee;
    color: #fff;
  }

  .rc-pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .rc-pagination-item,
  .rc-pagination-prev,
  .rc-pagination-jump-prev,
  .rc-pagination-jump-next {
    margin-right: 8px;
  }

  .rc-pagination-total-text {
    margin-right: 12px;
    cursor: initial;
  }

  .rc-pagination-jump-next,
  .rc-pagination-jump-prev,
  .rc-pagination-next,
  .rc-pagination-prev {
    display: inline-block;
    min-width: 28px;
    height: 28px;
    color: rgba(0, 0, 0, 0.85);
    font-family: Arial;
    line-height: 28px;
    text-align: center;
    vertical-align: middle;
    list-style: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s;
  }
  .rc-pagination-jump-next button,
  .rc-pagination-jump-prev button {
    background: transparent;
    border: none;
    cursor: pointer;
    color: #666;
    list-style: none;
  }
  .rc-pagination-item,
  .rc-pagination-prev,
  .rc-pagination-next,
  .rc-pagination-total-text {
    min-width: initial;
    height: auto;
    line-height: initial;
    background-color: transparent;
    border: none;
    cursor: pointer;
    list-style: none;
  }
  .rc-pagination-item a,
  .rc-pagination-item button,
  .rc-pagination-prev a,
  .rc-pagination-prev button,
  .rc-pagination-next a,
  .rc-pagination-next button,
  .rc-pagination-total-text a,
  .rc-pagination-total-text button {
    padding: 6px 8px;
    height: auto;
    min-width: 32px;
    min-height: 32px;
    border-radius: 8px;
    border: 1px solid transparent;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    font-size: 12px;
    font-weight: 500;
    color: #656f84 !important;
    transition: 0.3s;
    -webkit-transition: 0.3s;
    -moz-transition: 0.3s;
    -o-transition: 0.3s;
  }
  .rc-pagination-item.rc-pagination-item-active a,
  .rc-pagination-item.rc-pagination-item-active a:hover,
  .rc-pagination-prev.rc-pagination-item-active a,
  .rc-pagination-prev.rc-pagination-item-active a:hover,
  .rc-pagination-next.rc-pagination-item-active a,
  .rc-pagination-next.rc-pagination-item-active a:hover,
  .rc-pagination-total-text.rc-pagination-item-active a,
  .rc-pagination-total-text.rc-pagination-item-active a:hover {
    background-color: #0cb46c;
    border-color: #0cb46c;
    color: #ffffff !important;
  }
  .rc-pagination-item a:hover,
  .rc-pagination-item button:hover,
  .rc-pagination-prev a:hover,
  .rc-pagination-prev button:hover,
  .rc-pagination-next a:hover,
  .rc-pagination-next button:hover,
  .rc-pagination-total-text a:hover,
  .rc-pagination-total-text button:hover {
    background-color: #eceff5;
    border-color: #eceff5;
    list-style: none;
  }
`;

function MeariList({ data, $custom }) {
  const { mearilist } = useList(data);
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);

  const PerPageChange = (mearilist, value) => {
    setSize(value);
    const newPerPage = Math.ceil(mearilist.length / value);
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  };

  const getData = (current, pageSize, mearilist) => {
    // Normally you should get the data from the server
    return mearilist.slice((current - 1) * pageSize, current * pageSize);
  };

  const PaginationChange = (page, pageSize) => {
    setCurrent(page);
    setSize(pageSize);
  };

  const PrevNextArrow = (current, type, originalElement) => {
    if (type === "prev") {
      return (
        <button>
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.8284 7.0007L7.7782 11.9504L6.364 13.3646L0 7.0007L6.364 0.636719L7.7782 2.05093L2.8284 7.0007Z"
              fill="#B2B0B0"
            />
          </svg>
        </button>
      );
    }
    if (type === "next") {
      return (
        <button>
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.1716 7.0007L0.2218 11.9504L1.636 13.3646L8 7.0007L1.636 0.636719L0.2218 2.05093L5.1716 7.0007Z"
              fill="#B2B0B0"
            />
          </svg>
        </button>
      );
    }
    return originalElement;
  };

  return (
    <>
      <ListWrapper $custom={$custom}>
        {mearilist
          ? getData(current, size, mearilist).map((item, index) => (
              <ListContent
                key={index}
                value={item?.content}
                author={item?.nickName}
                $custom={$custom}
              />
            ))
          : null}
      </ListWrapper>
      <StyledPagination
        className="pagination-data"
        onChange={PaginationChange}
        total={mearilist.length}
        current={current}
        pageSize={size}
        showSizeChanger={false}
        itemRender={PrevNextArrow}
        onShowSizeChange={PerPageChange}
        showTitle={false}
        $custom={$custom}
      />
    </>
  );
}

export default MeariList;
