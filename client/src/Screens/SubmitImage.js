import React, { useState } from "react";
import axios from "axios";

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
  const [file, setFile] = useState();
  const [message, setMessage] = useState();
  const [submitButton, setSubmitButton] = useState("Submit");

  function onChangeMessage(e) {
    setMessage(e.target.value);
  }
  function onChangeFile(e) {
    setFile(e.target.files[0]);
    console.log(file);
    console.log(e.target.files[0]);
  }
  function submitPost() {
    setSubmitButton("Uploading...");
    let url = "https://eventwall.cloud1.nicholascheow.com/newImagePost";
    // let url = "http://localhost:4000/newImagePost";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userName", props.user);
    formData.append("message", message);
    if (props.type == "image") {
      formData.append("postType", "image");
    }
    if (props.type == "video") {
      formData.append("postType", "video");
    }

    axios
      .post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        props.value("");
      });

    console.log(props.user);
  }
  return (
    <Box px={4} py={32} mx='auto'>
      Message: {message}
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
            <Input onChange={onChangeMessage} mb={6} placeholder='' />
            {props.type == "image" && (
              <>
                <Text>Select Image</Text>
                <Input
                  mt={0}
                  mb={6}
                  size='lg'
                  type='file'
                  accept='image/*'
                  required='true'
                  onChange={onChangeFile}
                />{" "}
                <br></br>
              </>
            )}
            {props.type == "video" && (
              <>
                <Text>Select Video</Text>
                <Input
                  mt={0}
                  mb={6}
                  size='lg'
                  type='file'
                  accept='video/*'
                  required='true'
                  onChange={onChangeFile}
                />
              </>
            )}
            <br></br>

            <br></br>
            <Button
              as={GridItem}
              w='full'
              variant='solid'
              colSpan={{ base: "auto", lg: 2 }}
              size='lg'
              type='submit'
              colorScheme='teal'
              onClick={submitPost}
            >
              {submitButton}
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
