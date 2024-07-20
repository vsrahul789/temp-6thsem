import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const BookingForm = () => {
  const { restaurantId } = useParams();
  const [bookingDate, setBookingDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [slotId, setSlotId] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const toast = useToast();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get(`http://localhost:8080/restaurants/getRestaurant/${restaurantId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setRestaurantName(response.data.restaurantName);
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error fetching restaurant details',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchRestaurant();
  }, [restaurantId, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.post(
        'http://localhost:8080/api/bookings/addBooking',
        { restaurantId, bookingDate, numberOfPeople, slotId },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      toast({
        title: 'Booking Successful',
        description: 'Your booking has been made successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Booking Failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bgImage="url('https://images.pexels.com/photos/744780/pexels-photo-744780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bg="rgba(255, 255, 255, 0.8)" // Semi-transparent background
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        maxW="md"
        mx="auto"
      >
        <Heading as="h1" size="lg" textAlign="center" mb={6}>
          Book a table at {restaurantName}
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="bookingDate">
              <FormLabel>Booking Date</FormLabel>
              <Input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="numberOfPeople">
              <FormLabel>Number of People</FormLabel>
              <Input
                type="number"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="slotId">
              <FormLabel>Slot ID</FormLabel>
              <Input
                type="text"
                value={slotId}
                onChange={(e) => setSlotId(e.target.value)}
                required
              />
            </FormControl>
            <Button mt={4} colorScheme="teal" type="submit" width="full">
              Book Slot
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default BookingForm;
