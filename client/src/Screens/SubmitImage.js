import React, { useState } from "react";

import {
  Box,
  Container,
  Stack,
  Text,
  Button,
  Link,
  Flex,
  Center,
  Heading,
  SimpleGrid,
  GridItem,
  VisuallyHidden,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";

function SubmitImage(props) {
  const [username, setUsername] = useState();

  function onChange(e) {}
  function setUser() {}
  return (
    <Box px={4} py={32} mx='auto'>
      <Box
        w={{ base: "full", md: 11 / 12, xl: 8 / 12 }}
        textAlign={{ base: "left", md: "center" }}
        mx='auto'
      >
        <Heading
          mb={3}
          fontSize={{ base: "4xl", md: "5xl" }}
          fontWeight={{ base: "bold", md: "extrabold" }}
          color={useColorModeValue("gray.900", "gray.100")}
          lineHeight='shorter'
        >
          Upload Image
        </Heading>
        <Text
          mb={6}
          fontSize={{ base: "lg", md: "xl" }}
          color='gray.500'
          lineHeight='base'
        >
          Key in your message below too
        </Text>
        <Center>
          <Box w='xl'>
            <Text>Your Message</Text>
            <Input mb={6} placeholder='' />

            <Text>Select Image</Text>
            <Input
              mt={0}
              mb={6}
              size='lg'
              type='file'
              accept='image/*'
              placeholder='Enter your username...'
              required='true'
              onChange={onChange}
            />
            <br></br>

            <Button
              as={GridItem}
              w='full'
              variant='solid'
              colSpan={{ base: "auto", lg: 2 }}
              size='lg'
              type='submit'
              colorScheme='teal'
              onClick={setUser}
            >
              Submit
            </Button>
            <Button
              as={GridItem}
              mt={4}
              w='full'
              variant='solid'
              colSpan={{ base: "auto", lg: 2 }}
              size='lg'
              type='submit'
              onClick={props.value}
            >
              Go Back
            </Button>
          </Box>
        </Center>
      </Box>
    </Box>
  );
}

export default SubmitImage;
