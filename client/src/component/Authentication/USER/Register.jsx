import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container, Box, VStack, FormControl, FormLabel, Input, Button, Text,
  InputGroup, InputRightElement, IconButton, Select, Spinner,
  useColorModeValue, Heading, Flex
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import '@fontsource/advent-pro';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [preferredCuisine, setPreferredCuisine] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const boxBgColor = useColorModeValue('white', 'gray.700');

  async function registerUser(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/auth/register/user', {
        username,
        email,
        password,
        age: Number(age),
        preferredCuisine,
      });
      alert('Registration successful!');
      navigate('/register/verify');
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center" bg={bgColor}>
      <Container maxW="md" py={12}>
        <Box
          bg={boxBgColor}
          boxShadow="2xl"
          rounded="lg"
          p={8}
          textAlign="center"
        >
          <VStack spacing={8}>
            <Flex
              w={20}
              h={20}
              align="center"
              justify="center"
              color="white"
              rounded="full"
              bg="purple.500"
              mb={1}
              fontSize="2xl"
              fontWeight="bold"
              fontFamily="'Advent Pro', sans-serif"
            >
              DE
            </Flex>
            <Heading fontSize="2xl">User Registration</Heading>
            <form onSubmit={registerUser} style={{ width: '100%' }}>
              <VStack spacing={4}>
                <FormControl id="username" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    borderRadius="full"
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    borderRadius="full"
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      borderRadius="full"
                    />
                    <InputRightElement width="3rem">
                      <IconButton
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        variant="ghost"
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl id="age" isRequired>
                  <FormLabel>Age</FormLabel>
                  <Input
                    type="number"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    borderRadius="full"
                  />
                </FormControl>
                <FormControl id="preferred-cuisine" isRequired>
                  <FormLabel>Preferred Cuisine</FormLabel>
                  <Select
                    placeholder="Select preferred cuisine"
                    value={preferredCuisine}
                    onChange={(e) => setPreferredCuisine(e.target.value)}
                    focusBorderColor="purple.500"
                    borderRadius="full"
                  >
                    <option value="VEGETARIAN">VEGETARIAN</option>
                    <option value="NON_VEGETARIAN">NON VEGETARIAN</option>
                  </Select>
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="purple"
                  size="lg"
                  fontSize="md"
                  borderRadius="full"
                  width="full"
                  isDisabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : 'Register'}
                </Button>
              </VStack>
            </form>
          </VStack>
          <Text mt={6}>
            Already have an account?{' '}
            <Link to="/login/user" style={{ color: 'purple.500', fontWeight: 'semibold' }}>
              Login here
            </Link>
          </Text>
        </Box>
      </Container>
    </Flex>
  );
};

export default Register;
