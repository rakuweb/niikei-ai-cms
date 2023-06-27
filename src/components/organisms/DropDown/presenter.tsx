import React, { FC } from 'react';
import { Flex, Select, Button } from '@chakra-ui/react';

export type PresenterProps = {
  selectedValue: string;
  handleSelect: (value: string) => void;
  handleExecute: () => void;
  handleDeleteSelectedItems?: () => Promise<void>;
  handleSetAllStandBy?: () => Promise<void>;
};

export const Presenter: FC<PresenterProps> = ({
  selectedValue,
  handleSelect,
  handleExecute,
}) => {
  const options = [
    'まとめて削除する',
    'まとめて記事化する',
    'まとめて元に戻す',
  ];

  const handleChange = (e) => {
    handleSelect(e.target.value);
  };

  return (
    <Flex alignItems={'flex-end'}>
      <Select
        onChange={handleChange}
        value={selectedValue}
        placeholder="選択してください"
        w={'10vw'}
        fontSize={'0.8vw'}
        borderRadius={'0'}
        h={'1.6vw'}
        bg={'white'}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
      <Button
        onClick={handleExecute}
        fontSize={'0.8vw'}
        fontWeight={'400'}
        borderRadius={'2px'}
        h={'1.6vw'}
        w={'2.6vw'}
        ml={'0.5vw'}
        color={'#707070'}
        bgColor={'#DEDEDE'}
        border={'1px solid #707070'}
      >
        適応
      </Button>
    </Flex>
  );
};
