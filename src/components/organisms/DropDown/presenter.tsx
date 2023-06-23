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
    <Flex alignItems={'center'}>
      <Select
        onChange={handleChange}
        value={selectedValue}
        placeholder="選択してください"
        w={'10vw'}
        fontSize={'0.8vw'}
        borderRadius={'0'}
        h={'2vw'}
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
        borderRadius={'2px'}
        h={'2vw'}
        ml={'0.5vw'}
      >
        実行
      </Button>
    </Flex>
  );
};
