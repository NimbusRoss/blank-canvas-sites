import React, { useState } from 'react';
import { MessageCircle, Paperclip, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { useDrag } from 'react-dnd';
import { Box, Flex, Button, Badge, Text, Checkbox } from '@chakra-ui/react';

interface Site {
  id: string;
  address: string;
  secondaryAddress: string;
  description: string;
  tags: string[];
  date: string;
  comments: number;
  documents: number;
  isExpanded: boolean;
  isSelected: boolean;
}

interface PropertyCardProps {
  site: Site;
  columnId: string;
  isHighlighted?: boolean;
  searchTerm?: string;
  onUpdate: (site: Site) => void;
  onDelete: (siteId: string) => void;
  onDuplicate: (site: Site) => void;
  onSiteSelect: (site: Site) => void;
  onSiteCheckboxChange: (columnId: string, siteId: string, isChecked: boolean) => void;
}

export function PropertyCard({ 
  site, 
  columnId, 
  isHighlighted = false,
  searchTerm = '',
  onUpdate, 
  onDelete, 
  onDuplicate, 
  onSiteSelect,
  onSiteCheckboxChange
}: PropertyCardProps) {
  const [isCardCollapsed, setIsCardCollapsed] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: 'SITE_CARD',
    item: () => ({ 
      type: 'SITE_CARD', 
      id: site.id, 
      columnId: columnId,
      site: site 
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleToggleCardCollapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCardCollapsed(!isCardCollapsed);
  };

  const handleAddressClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSiteSelect(site);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(site.id);
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDuplicate(site);
  };

  const handleSiteCheckboxChange = (checked: boolean) => {
    onSiteCheckboxChange(columnId, site.id, checked);
  };

  // Function to highlight search term in text
  const highlightSearchTerm = (text: string, term: string) => {
    if (!term.trim()) return text;
    
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <Text as="mark" key={index} bg="yellow.200" px={1} borderRadius="sm">
          {part}
        </Text>
      ) : part
    );
  };

  const visibleTags = site.tags.slice(0, 2);
  const hiddenTagsCount = site.tags.length - 2;

  // Card highlight style
  const cardHighlightStyle = isHighlighted ? {
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)',
    borderColor: 'blue.500',
    borderWidth: '2px',
  } : {};

  return (
    <Box
      ref={drag}
      data-site-id={site.id}
      transition="all 0.2s"
      opacity={isDragging ? 0.5 : 1}
      transform={isDragging ? 'scale(1.05) rotate(2deg)' : 'scale(1) rotate(0deg)'}
      zIndex={isDragging ? 50 : 1}
      cursor={isDragging ? 'grabbing' : 'grab'}
    >
      <Box 
        bg="white"
        userSelect="none"
        shadow="sm"
        border="none"
        borderRadius="8px"
        sx={cardHighlightStyle}
      >
        <Box p="16px">
          {/* Header with Checkbox, Address and Action Buttons */}
          <Flex justify="space-between" align="flex-start" mb={3}>
            <Flex align="flex-start" gap={3} flex={1} pr={2} minW={0}>
              {/* Site Checkbox */}
              <Checkbox
                isChecked={site.isSelected || false}
                onChange={(e) => handleSiteCheckboxChange(e.target.checked)}
                flexShrink={0}
                mt={1}
              />
              
              {/* Address */}
              <Box flex={1} minW={0}>
                <Text 
                  cursor="pointer"
                  color="gray.700"
                  _hover={{ color: "blue.500" }}
                  transition="colors 0.2s"
                  onClick={handleAddressClick}
                  fontSize="base"
                  fontWeight="bold"
                  lineHeight="1.2"
                  mb="4px"
                >
                  {highlightSearchTerm(site.address, searchTerm)}
                </Text>
              </Box>
            </Flex>
            
            <Flex align="center" flexShrink={0}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                p={1}
                minW="auto"
                h="auto"
                borderRadius="full"
                color="blue.600"
                _hover={{ color: "red.500", bg: "red.50" }}
              >
                <Trash2 size={12} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleCardCollapse}
                p={1}
                minW="auto"
                h="auto"
                borderRadius="full"
                color="blue.600"
                _hover={{ bg: "blue.50" }}
              >
                {isCardCollapsed ? (
                  <ChevronDown size={12} />
                ) : (
                  <ChevronUp size={12} />
                )}
              </Button>
            </Flex>
          </Flex>

          {/* Collapsible Content */}
          {!isCardCollapsed && (
            <>
              {/* Secondary Address */}
              <Box mb={3} ml={7}>
                <Text fontSize="sm" color="gray.500">{site.secondaryAddress}</Text>
              </Box>

              {/* Description */}
              <Text 
                color="gray.500"
                mb={3}
                lineHeight="1.5"
                ml={7}
                fontSize="sm"
                fontWeight="normal"
              >
                {site.description}
              </Text>

              {/* Tags */}
              <Flex flexWrap="wrap" gap={2} mb={4} ml={7}>
                {visibleTags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="solid" 
                    bg="gray.100"
                    color="gray.700"
                    cursor="pointer"
                    fontSize="xs"
                    fontWeight="medium"
                  >
                    {tag}
                  </Badge>
                ))}
                {hiddenTagsCount > 0 && (
                  <Badge 
                    variant="outline" 
                    cursor="pointer"
                    _hover={{ bg: "gray.100" }}
                    fontSize="xs"
                    fontWeight="medium"
                  >
                    {hiddenTagsCount} more
                  </Badge>
                )}
              </Flex>

              {/* Footer */}
              <Flex justify="space-between" align="center" pt={3} borderTop="1px solid" borderColor="gray.200" ml={7}>
                {/* Left side - Date only */}
                <Flex align="center">
                  <Text fontSize="xs" color="gray.500">{site.date}</Text>
                </Flex>

                {/* Right side - Comments and Documents */}
                <Flex align="center" gap={3}>
                  <Flex align="center" gap={1} color="gray.500">
                    <MessageCircle size={12} />
                    <Text fontSize="xs">{site.comments}</Text>
                  </Flex>
                  <Flex align="center" gap={1} color="gray.500">
                    <Paperclip size={12} />
                    <Text fontSize="xs">{site.documents}</Text>
                  </Flex>
                </Flex>
              </Flex>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}