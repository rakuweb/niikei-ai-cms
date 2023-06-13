/* eslint-disable jsx-a11y/alt-text */
import React, { FC, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Pagecircle } from './Pagecircle';
// ページネーションコンポーネント
export type PresenterProps = {
  currentPage: number;
  totalData: number;
  itemsPerPage: number;
  handlePageChange: (newPage: number) => void;
};

export const Presenter: FC<PresenterProps> = ({
  currentPage,
  totalData,
  itemsPerPage,
  handlePageChange,
}) => {
  const totalPages = Math.ceil(totalData / itemsPerPage);
  return (
    <Flex
      w={`fit-content`}
      h={`${37 / 19.2}vw`}
      letterSpacing={`0`}
      mt={`${40 / 19.2}vw`}
      pb={`${40 / 19.2}vw`}
      mx={`auto`}
      alignItems={`center`}
      fontSize={`${16 / 19.2}vw`}
    >
      <Box
        onClick={() => {
          if (currentPage !== 1) {
            handlePageChange(currentPage - 1);
          }
        }}
        // style
        color={currentPage === 1 ? 'gray' : 'inherit'}
        cursor={currentPage === 1 ? 'default' : 'pointer'}
        pointerEvents={currentPage === 1 ? 'none' : 'auto'}
        mr={`1vw`}
      >
        戻る
      </Box>

      {currentPage > 2 && <Box>{`…`}</Box>}

      {Array.from({ length: 4 }, (_, i) => currentPage - 2 + i).map(
        (pageNumber) =>
          pageNumber > 0 &&
          pageNumber <= totalPages && (
            <Pagecircle
              key={pageNumber}
              pagenumber={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              border={
                pageNumber === currentPage ? `1px solid #49BAC0` : undefined
              }
            />
          )
      )}

      {currentPage < totalPages - 1 && <Box>{`…`}</Box>}

      <Box
        onClick={() => handlePageChange(currentPage + 1)}
        // style
        color={currentPage == totalPages ? 'gray' : 'inherit'}
        cursor={currentPage == totalPages ? 'default' : 'pointer'}
        pointerEvents={currentPage === totalPages ? 'none' : 'auto'}
        ml={`1vw`}
      >
        次へ
      </Box>
    </Flex>
  );
};
