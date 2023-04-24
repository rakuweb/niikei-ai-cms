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
        border={'0.5vw solid #353845'}
        borderRadius={'0'}
        boxShadow={'none'}
        w={'15vw'}
        top={'-1.7vw'}
      >
        <PopoverArrow
          backgroundColor={'#353845'}
          border={'2vw solid #353845'}
          boxShadow={'none'}
        />

        <PopoverBody>
          {links.map((link, index) => (
            <Link key={index} href={link.url} color="#fff" fontSize="1vw">
              {link.text}
            </Link>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Popup;
