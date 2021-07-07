import React, { useState } from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Tabs,
  TabList,
  Tab,
  Flex,
  SimpleGrid,
  Image,
  Tag,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

function ImageWall() {
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
      imageURL:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
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
  return (
    <Flex p={50} w='full' alignItems='center' justifyContent='center'>
      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        {imageWallData.map((i) => {
          return (
            <Box w='xxs' shadow='lg' rounded='lg' overflow='hidden' mx='auto'>
              <Image
                w='full'
                h={56}
                fit='contain'
                src={i.imageURL}
                alt='avatar'
              />

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
                <Tag m={3}>{i.likes.length} Likes</Tag>
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
