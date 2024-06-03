import React, { useState } from "react";
import { Container, VStack, Text, Input, Button, Box, List, ListItem, IconButton, useToast } from "@chakra-ui/react";
import { FaEnvelope, FaRobot, FaTrash } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);
  const [actionItems, setActionItems] = useState([]);
  const toast = useToast();

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleAddEmail = () => {
    if (email) {
      setEmails([...emails, email]);
      setEmail("");
      toast({
        title: "Email added.",
        description: "We've added your email to the list.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleProcessEmails = () => {
    const newActionItems = emails.map((email, index) => `Action item for email ${index + 1}: ${email}`);
    setActionItems(newActionItems);
    toast({
      title: "Emails processed.",
      description: "We've generated action items from your emails.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeleteEmail = (index) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
    toast({
      title: "Email deleted.",
      description: "We've removed the email from the list.",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Smart Email Processor</Text>
        <Box width="100%">
          <Input placeholder="Enter your email" value={email} onChange={handleEmailChange} />
          <Button leftIcon={<FaEnvelope />} colorScheme="teal" onClick={handleAddEmail} mt={2}>
            Add Email
          </Button>
        </Box>
        <Box width="100%">
          <Button leftIcon={<FaRobot />} colorScheme="blue" onClick={handleProcessEmails} mt={2}>
            Process Emails
          </Button>
        </Box>
        <Box width="100%">
          <Text fontSize="lg" mt={4}>
            Emails:
          </Text>
          <List spacing={3}>
            {emails.map((email, index) => (
              <ListItem key={index} display="flex" justifyContent="space-between" alignItems="center">
                {email}
                <IconButton aria-label="Delete email" icon={<FaTrash />} colorScheme="red" onClick={() => handleDeleteEmail(index)} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box width="100%">
          <Text fontSize="lg" mt={4}>
            Action Items:
          </Text>
          <List spacing={3}>
            {actionItems.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
