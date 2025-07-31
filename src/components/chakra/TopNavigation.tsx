import React from 'react';
import { MapPin, Bookmark, Bell, FileText, Settings, HelpCircle, User } from 'lucide-react';
import { Box, Flex, Button, Text, Badge } from '@chakra-ui/react';

export function TopNavigation() {
  return (
    <Box p="6px" px="6px" py="16px">
      <Box as="nav" bg="blue.600" border="1px solid" borderColor="gray.200" borderRadius="12px" p="8px" px="12px" py="8px">
        <Flex justify="space-between" align="center">
          {/* Left side - Logo and Navigation */}
          <Flex align="center" gap={6}>
            {/* NIMBUS Logo */}
            <Flex align="center" gap={2}>
              <Box bg="red.500" color="white" px={3} py={1} borderRadius="md" fontWeight="bold" fontSize="sm">
                NIMBUS
              </Box>
            </Flex>
            
            {/* Navigation Items */}
            <Flex align="center" gap={4}>
              <Button 
                variant="ghost" 
                size="sm" 
                color="whiteAlpha.700"
                _hover={{ color: "white", bg: "whiteAlpha.100" }}
                leftIcon={<MapPin size={16} />}
              >
                Map
              </Button>
              
              {/* Saved Sites - Active/Selected */}
              <Button 
                variant="ghost" 
                size="sm" 
                color="white"
                bg="whiteAlpha.200"
                _hover={{ bg: "whiteAlpha.300" }}
                leftIcon={<Bookmark size={16} />}
              >
                Saved Sites
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                color="whiteAlpha.700"
                _hover={{ color: "white", bg: "whiteAlpha.100" }}
                leftIcon={<Bell size={16} />}
                rightIcon={
                  <Badge 
                    bg="orange.400"
                    color="white"
                    fontSize="xs"
                    fontWeight="medium"
                    minW="20px"
                    h="20px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="full"
                  >
                    99
                  </Badge>
                }
              >
                Alerts
              </Button>
            </Flex>
          </Flex>
          
          {/* Right side - Icons and User */}
          <Flex align="center" gap={3}>
            <Button 
              variant="ghost" 
              size="sm" 
              p={2}
              color="whiteAlpha.700"
              _hover={{ color: "white", bg: "whiteAlpha.100" }}
            >
              <FileText size={16} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              p={2}
              color="whiteAlpha.700"
              _hover={{ color: "white", bg: "whiteAlpha.100" }}
            >
              <Settings size={16} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              p={2}
              color="whiteAlpha.700"
              _hover={{ color: "white", bg: "whiteAlpha.100" }}
            >
              <HelpCircle size={16} />
            </Button>
            
            {/* User Profile */}
            <Flex align="center" gap={2} pl={2} borderLeft="1px solid" borderColor="whiteAlpha.200">
              <Box w={8} h={8} bg="blue.400" borderRadius="full" display="flex" alignItems="center" justifyContent="center">
                <User size={16} color="white" />
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}