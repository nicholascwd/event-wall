import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  Tabs,
  TabList,
  Tab,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import ImageWall from "./ImageWall";
import React, { useState } from "react";
function Wall() {
  const [firstTab, setFirstTab] = useState(true);
  return (
    <Box>
      <Tabs variant='soft-rounded' colorScheme='green' align='center'>
        <TabList>
          <Tab
            onClick={() => {
              setFirstTab(true);
            }}
          >
            Photo Wall
          </Tab>
          <Tab
            onClick={() => {
              setFirstTab(false);
            }}
          >
            Message Wall
          </Tab>
        </TabList>

        {firstTab && <ImageWall />}
      </Tabs>
    </Box>
  );
}

export default Wall;
