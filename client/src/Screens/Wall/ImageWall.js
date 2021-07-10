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
  const [imageWallData, setImageWallData] = useState([
    {
      id: 1,
      name: "Nurse One",
      message:
        "I would like to thank all my colleagues for the good work this past year! 🥳",
      likes: ["Nic", "Emily"],
      imageURL:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
      id: 2,
      name: "Nurse Two",
      message:
        "I would like to thank all my colleagues for the good work this past year! 🥳",
      likes: ["Nic", "Emily", "Galye"],
      imageURL: "",
    },
    {
      id: 3,
      name: "Nurse Three",
      message:
        "I would like to thank all my colleagues for the good work this past year! 🥳",
      likes: [],
      imageURL:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
      id: 1,
      name: "Nurse Four",
      message:
        "I would like to thank all my colleagues for the good work this past year! 🥳",
      likes: ["Nic", "Emily", "Galye"],
      imageURL:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
  ]);

  useEffect(() => {
    axios
      .get("https://eventwall.cloud1.nicholascheow.com/allPosts")
      .then(function (response) {
        // handle success
        console.log(response);
        setImageWallData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <Flex p={50} w='full' alignItems='center' justifyContent='center'>
      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        {imageWallData.map((i) => {
          return (
            <Box w='xxs' shadow='lg' rounded='lg' overflow='hidden' mx='auto'>
              {i.postType == "image" && (
                <Image
                  w='full'
                  h={500}
                  fit='contain'
                  src={i.assetURL}
                  alt='avatar'
                />
              )}
              {i.postType == "video" && (
                <video
                  autoPlay
                  muted
                  playsInline
                  controls='true'
                  loop
                  width='250'
                >
                  <source src={i.assetURL} type='video/mp4' />
                </video>
              )}

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
                {/* <Tag m={3}>{i.likes.length} Likes</Tag> */}
                <br></br>
                <Button m={3} colorScheme='teal' variant='outline'>
                  Like 👍
                </Button>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
    </Flex>
  );
}

export default ImageWall;
