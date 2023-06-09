import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Link,
} from '@chakra-ui/react';

const Popup = ({ title, logo, links, href }) => {
  return (
    <Popover trigger="hover" placement="right-start">
      <PopoverTrigger>
        <Link
          color={'#BABABA'}
          display={'flex'}
          alignItems={'center'}
          href={href}
        >
          {logo}
          {title}
        </Link>
      </PopoverTrigger>
      {links.length > 0 && (
        <PopoverContent
          backgroundColor={'#353845'}
          border={'0.5vw solid #353845'}
          borderRadius={'0'}
          boxShadow={'none'}
          w={'15vw'}
          minH={'6vw'}
          top={'-2.3vw'}
        >
          <PopoverArrow
            backgroundColor={'#353845'}
            border={'2vw solid #353845'}
            boxShadow={'none'}
          />

          <PopoverBody mt={`0.5vw`}>
            {links.map((link, index) => (
              <Link
                key={index}
                w={`fit-content`}
                href={link.url}
                color="#fff"
                fontSize="1vw"
                mt={`0.5vw`}
              >
                {link.text}
              </Link>
            ))}
          </PopoverBody>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default Popup;
