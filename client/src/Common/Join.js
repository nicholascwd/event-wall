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

function Join(props) {
  const [username, setUsername] = useState();

  function onChange(e) {
    setUsername(e.target.value);
  }
  function setUser() {
    localStorage.setItem("username", username);
    props.value("a");
  }
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
          Welcome to TLR's Nurse Day Celebration
        </Heading>
        <Text
          mb={6}
          fontSize={{ base: "lg", md: "xl" }}
          color='gray.500'
          lineHeight='base'
        >
          Key in your name below to join in.
        </Text>
        <SimpleGrid
          as='form'
          w={{ base: "full", md: 7 / 12 }}
          columns={{ base: 1, lg: 6 }}
          spacing={3}
          pt={1}
          mx='auto'
          mb={8}
        >
          <GridItem as='label' colSpan={{ base: "auto", lg: 4 }}>
            <VisuallyHidden>Your Email</VisuallyHidden>
            <Input
              mt={0}
              size='lg'
              type='text'
              placeholder='Enter your name...'
              required='true'
              onChange={onChange}
            />
          </GridItem>
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
            Join
          </Button>
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Join;
