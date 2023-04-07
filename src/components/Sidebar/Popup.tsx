import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Link,
} from '@chakra-ui/react';

const Popup = ({ title, logo, links }) => {
  return (
    <Popover trigger="hover" placement="right-start">
      <PopoverTrigger>
        <Link
          href={'/'}
          color={'#BABABA'}
          display={'flex'}
          alignItems={'center'}
        >
          {logo}
          {title}
        </Link>
      </PopoverTrigger>
      <PopoverContent
        backgroundColor={'#353845'}
        border={'1px solid #353845'}
        borderRadius={'0'}
        boxShadow={'none'}
        w={'210px'}
        top={'-5px'}
      >
        <PopoverArrow
          backgroundColor={'#353845'}
          border={'10px solid #353845'}
          boxShadow={'none'}
        />

        <PopoverBody>
          {links.map((link, index) => (
            <Link key={index} href={link.url} color="#fff" fontSize="sm">
              {link.text}
            </Link>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Popup;
