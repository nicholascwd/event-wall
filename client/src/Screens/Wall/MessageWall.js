import React, { useState, useEffect } from "react";

import {
  Box,
  Container,
  Stack,
  Text,
  Tabs,
  TabList,
  Tab,
  Flex,
  Video,
  SimpleGrid,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Tag,
  Button,
  Heading,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
const axios = require("axios");
function ImageWall() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentURL, setCurrentURL } = useState();
  const finalRef = React.useRef();
  const [imageWallData, setImageWallData] = useState([]);
  const [likes, setLikes] = useState([]);
  const storedUser = localStorage.getItem("username");

  useEffect(() => {
    getPosts();
  }, []);

  function getPosts() {
    axios
      .get("https://eventwall.cloud1.nicholascheow.com/allPosts")
      .then(function (response) {
        // handle success
        // console.log(response);
        setImageWallData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  function likePost(data) {
    // console.log(data);

    axios
      .post("https://eventwall.cloud1.nicholascheow.com/newLike", {
        _id: data,
        user: storedUser,
      })
      .then(function (response) {
        // handle success
        console.log(response);
        getPosts();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  function updateLikes(data) {
    console.log("data ", data.likes);
    if (data.likes) {
      setLikes(data.likes);
    }
    onOpen();
  }

  return (
    <Flex p={50} w='full' alignItems='center' justifyContent='center'>
      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        {imageWallData.map((i) => {
          console.log(i);
          if (i.postType == "message") {
            return (
              <Box
                w='xxs'
                p={10}
                shadow='lg'
                rounded='lg'
                overflow='hidden'
                mx='auto'
              >
                <Box py={5} textAlign='center'>
                  <Text
                    display='block'
                    fontSize='2xl'
                    color='gray.800'
                    fontWeight='bold'
                  >
                    {i.name}
                  </Text>
                  <Text fontSize='sm' color='gray.700'>
                    {i.message}
                  </Text>
                  <Tag
                    m={3}
                    onClick={() => {
                      updateLikes(i);
                    }}
                  >
                    {i.likes.length} Likes
                  </Tag>
                  <br></br>
                  {!i.likes.includes(storedUser) && (
                    <>
                      <Button
                        m={3}
                        colorScheme='teal'
                        variant='outline'
                        onClick={() => {
                          likePost(i._id);
                        }}
                      >
                        Like 👍
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            );
          }
        })}
      </SimpleGrid>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Likes</ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <ul ml={10}>
              {likes && (
                <>
                  {likes?.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                  <br></br>
                </>
              )}
            </ul>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default ImageWall;
