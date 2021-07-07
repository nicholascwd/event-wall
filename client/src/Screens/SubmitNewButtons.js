import {
  Box,
  Container,
  Stack,
  Text,
  Button,
  Link,
  Flex,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";

function SubmitNewButtons() {
  return (
    <div className='SubmitButtons'>
      <Box m={8} alignItems='right' justifyContent='space-between'>
        <Stack spacing={4} direction='row' align='center'>
          <Button colorScheme='teal' size='md'>
            Submit Photo
          </Button>
          <Button colorScheme='teal' size='md'>
            Submit Message
          </Button>
        </Stack>
      </Box>
    </div>
  );
}

export default SubmitNewButtons;
