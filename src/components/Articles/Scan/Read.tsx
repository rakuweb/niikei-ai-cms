import React, { useEffect, useState } from 'react';
import { Flex, Textarea } from '@chakra-ui/react';
import axios from 'axios';

import { Text } from 'components/texts/Text';
import { BigWideButton } from 'components/Button/BigWideButton';
import { Popup } from '../PopupComponent';
import { apiRoutes } from '@/constants/routes';

const Read = ({ text }) => {
  const [isButtonActive, setButtonActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [popupText, setPopupText] = useState('');
  const [categories, setCategories] = useState([]);
  const [textAreaValue, setTextAreaValue] = useState('');

  useEffect(() => {
    setButtonActive(!!text);
    setPopupText(text);
  }, [text]);

  const downloadText = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'download.txt';
    a.click();
  };
  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const url = apiRoutes.wpCategories;
    const handler = async () => {
      const res = await axios.get(url);
      const data = res.data;

      setCategories(
        data.categories.map((category) => ({
          id: category.id,
          name: category.name,
        }))
      );
    };

    handler();
  }, []);

  useEffect(() => {
    if (text == '') return;
    setTextAreaValue((prev) => {
      const next = prev + text;

      return next;
    });
  }, [text]);

  return (
    <div>
      <Text mb={`${40 / 19.2}vw`} letterSpacing={`0`}>
        <Textarea
          w={`${600 / 19.2}vw`}
          h={`${360 / 19.2}vw`}
          placeholder="ここに読み取った文章が出力されます。"
          borderRadius={`0`}
          borderColor={`#D6D6D6`}
          fontSize={`${16 / 19.2}vw`}
          value={textAreaValue}
          onChange={(e) => setTextAreaValue(e.target.value)}
          // value={text || undefined}
        />
      </Text>
      <Flex justify={`space-between`}>
        {!isButtonActive ? (
          <BigWideButton
            text="保存する"
            w={`${280 / 19.2}vw`}
            bg={`#D6D6D6`}
            color={`#BABABA`}
          />
        ) : (
          <BigWideButton
            onClick={downloadText}
            text="保存する"
            w={`${280 / 19.2}vw`}
            bg={`#8D9696`}
            color={`white`}
          />
        )}
        <BigWideButton
          text="記事作成に進む"
          onClick={openPopup}
          w={`${280 / 19.2}vw`}
        />
        <Popup
          isOpen={isOpen}
          onClose={closePopup}
          text={textAreaValue}
          setText={setPopupText}
          list={categories}
        />
      </Flex>
    </div>
  );
};

export default Read;
