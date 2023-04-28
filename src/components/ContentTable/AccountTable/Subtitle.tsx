import { Text } from 'components/texts/Text';

const Subtitle = ({ title }) => {
  return (
    <Text
      fontSize={`${20 / 19.2}vw`}
      fontWeight={`500`}
      lineHeight={`1.45em`}
      mb={`${10 / 19.2}vw`}
    >
      {title}
    </Text>
  );
};

export default Subtitle;
