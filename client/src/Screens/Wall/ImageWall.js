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
  const [imageWallData, setImageWallData] = useState([]);

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
          console.log(i);
          if (i.postType != "message") {
            return (
              <Box
                p={10}
                w='xxs'
                shadow='lg'
                rounded='lg'
                overflow='hidden'
                mx='auto'
              >
                {i.postType == "image" && (
                  <Image
                    w='full'
                    h={500}
                    fit='contain'
                    src={i.cdnURL}
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
                  {/* <Button m={3} colorScheme='teal' variant='outline'>
                    Like 👍
                  </Button> */}
                </Box>
              </Box>
            );
          }
        })}
      </SimpleGrid>
    </Flex>
  );
}

export default ImageWall;
