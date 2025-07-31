import React, { useState } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { 
  Box, 
  Flex, 
  Button, 
  Input, 
  InputGroup, 
  InputLeftElement,
  InputRightElement,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Checkbox,
  Badge,
  Select
} from '@chakra-ui/react';

interface SearchResult {
  type: 'stage' | 'site';
  id: string;
  columnId?: string;
  siteId?: string;
  matchText: string;
}

interface HeaderProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  onSearchExecute: () => void;
  onClearSearch: () => void;
  searchResults: SearchResult[];
  selectedUsers: string[];
  onUserFilter: (users: string[]) => void;
  selectedTags?: string[];
  onTagFilter?: (tag: string) => void;
  sortBy?: string;
  onSort?: (sortOption: string) => void;
}

export function Header({
  searchTerm,
  onSearch,
  onSearchExecute,
  onClearSearch,
  searchResults,
  selectedUsers,
  onUserFilter,
  selectedTags = [],
  onTagFilter = () => {},
  sortBy = 'A–Z',
  onSort = () => {}
}: HeaderProps) {
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  
  const allUsers = ['TR', 'CK', 'VN', 'ZN'];
  
  // Available tags
  const availableTags = [
    'Commercial',
    'Residential', 
    'Industrial',
    'Premium',
    'High Priority',
    'Urgent',
    'Available',
    'Hot Lead',
    'Large Scale',
    'Potential',
    'Follow Up',
    'Completed',
    'Success'
  ];
  
  // Get user colors
  const getUserColor = (user: string) => {
    const colors = {
      'TR': 'blue.600',
      'CK': 'green.600', 
      'VN': 'purple.600',
      'ZN': 'orange.600'
    };
    return colors[user as keyof typeof colors] || 'blue.600';
  };

  const handleUserToggle = (user: string) => {
    const newSelection = selectedUsers.includes(user)
      ? selectedUsers.filter(u => u !== user)
      : [...selectedUsers, user];
    onUserFilter(newSelection);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearchExecute();
    }
  };

  const getSelectedTagsCount = () => {
    return selectedTags.length;
  };

  const handleTagToggle = (tag: string) => {
    onTagFilter(tag);
  };

  const handleClearAllTags = () => {
    // Clear all selected tags by calling onTagFilter for each selected tag
    selectedTags.forEach(tag => onTagFilter(tag));
  };

  return (
    <Box bg="white" borderBottom="1px solid" borderColor="gray.200" p={4}>
      {/* Single line layout */}
      <Flex justify="space-between" align="center">
        {/* Left side - My Sites, Search, Filters, Sort */}
        <Flex align="center" gap={4}>
          {/* Page title */}
          <Text fontSize="xl" fontWeight="bold" color="gray.700">My Sites</Text>
          
          {/* Search */}
          <Box position="relative" w="320px">
            <InputGroup>
              <InputLeftElement>
                <Search size={16} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search on My Sites"
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                borderColor="gray.300"
                _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
                pr={searchTerm ? 10 : 3}
              />
              {searchTerm && (
                <InputRightElement>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearSearch}
                    p={1}
                    minW="auto"
                    h="auto"
                    color="gray.400"
                    _hover={{ color: "gray.600" }}
                  >
                    <X size={16} />
                  </Button>
                </InputRightElement>
              )}
            </InputGroup>
          </Box>

          {/* Multi-Select Tags Dropdown */}
          <Popover isOpen={isTagsOpen} onClose={() => setIsTagsOpen(false)}>
            <PopoverTrigger>
              <Button
                variant="ghost"
                w="176px"
                justifyContent="space-between"
                border="none"
                bg="transparent"
                color="blue.600"
                _hover={{ bg: "gray.100" }}
                onClick={() => setIsTagsOpen(!isTagsOpen)}
                rightIcon={<ChevronDown size={16} />}
              >
                <Text>
                  Filter by Tags {getSelectedTagsCount() > 0 && `(${getSelectedTagsCount()})`}
                </Text>
              </Button>
            </PopoverTrigger>
            <PopoverContent w="256px">
              <PopoverBody p={4}>
                <Flex justify="space-between" align="center" mb={3}>
                  <Text fontWeight="medium" fontSize="sm">Filter by Tags</Text>
                  {selectedTags.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearAllTags}
                      h="auto"
                      p={1}
                      fontSize="xs"
                      color="gray.500"
                      _hover={{ color: "gray.700" }}
                    >
                      Clear all
                    </Button>
                  )}
                </Flex>
                
                <Box maxH="256px" overflowY="auto">
                  {availableTags.map((tag) => (
                    <Flex key={tag} align="center" gap={2} mb={2}>
                      <Checkbox
                        isChecked={selectedTags.includes(tag)}
                        onChange={() => handleTagToggle(tag)}
                        mr={2}
                      />
                      <Text fontSize="sm" cursor="pointer" onClick={() => handleTagToggle(tag)}>
                        {tag}
                      </Text>
                    </Flex>
                  ))}
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          {/* Sort Dropdown */}
          <Select 
            value={sortBy} 
            onChange={(e) => onSort(e.target.value)}
            w="176px"
            border="none"
            bg="transparent"
            color="blue.600"
            _hover={{ bg: "gray.100" }}
            _focus={{ bg: "gray.100" }}
          >
            <option value="A–Z">Sort by: A–Z</option>
            <option value="Z–A">Sort by: Z–A</option>
            <option value="newest">Sort by: Newest</option>
            <option value="oldest">Sort by: Oldest</option>
          </Select>
        </Flex>

        {/* Right side - User Avatars and Letter Generation */}
        <Flex align="center" gap={3}>
          {/* User Avatars */}
          <Flex align="center">
            {allUsers.map((user, index) => (
              <Button
                key={user}
                onClick={() => handleUserToggle(user)}
                w={8}
                h={8}
                minW="auto"
                borderRadius="full"
                bg={getUserColor(user)}
                color="white"
                fontSize="xs"
                fontWeight="medium"
                transition="all 0.2s"
                _hover={{ transform: "scale(1.1)" }}
                opacity={selectedUsers.includes(user) ? 1 : 0.5}
                ml={index > 0 ? -1 : 0}
                zIndex={allUsers.length - index}
              >
                {user}
              </Button>
            ))}
          </Flex>

          {/* Letter Generation button */}
          <Button 
            bg="blue.600"
            color="white"
            _hover={{ bg: "blue.700" }}
          >
            Letter Generation
          </Button>
        </Flex>
      </Flex>

      {/* Show selected tags if any */}
      {selectedTags.length > 0 && (
        <Flex align="center" gap={2} mt={3}>
          <Text fontSize="sm" color="gray.500">Filtered by tags:</Text>
          {selectedTags.map((tag) => (
            <Badge 
              key={tag}
              variant="solid"
              bg="blue.100"
              color="blue.800"
              border="1px solid"
              borderColor="blue.600"
              cursor="pointer"
              fontSize="xs"
              fontWeight="medium"
              _hover={{ bg: "blue.200" }}
              onClick={() => onTagFilter(tag)}
            >
              {tag} ×
            </Badge>
          ))}
        </Flex>
      )}
    </Box>
  );
}