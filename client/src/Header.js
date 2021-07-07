import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

function Header() {
  return (
    <div className='Header'>
      <Box>
        <Heading size='lg' fontSize='50px' textAlign='center' m={8}>
          Welcome to Nurses Day Celebration at TLR 2021
        </Heading>
      </Box>
    </div>
  );
}

export default Header;
