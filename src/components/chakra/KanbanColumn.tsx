import React, { useState, useEffect } from 'react';
import { MoreVertical, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import { useDrop, useDrag } from 'react-dnd';
import { Box, Flex, Button, Text, Badge } from '@chakra-ui/react';
import { PropertyCard } from './PropertyCard';

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

interface Column {
  id: string;
  name: string;
  color: string;
  borderColor: string;
  count: number;
  sites: Site[];
  isSelected: boolean;
}

interface KanbanColumnProps {
  column: Column;
  isCollapsed: boolean;
  isHighlighted?: boolean;
  searchTerm?: string;
  onUpdateColumn: (column: Column) => void;
  onSiteSelect: (site: Site) => void;
  onMoveSite: (siteId: string, fromColumnId: string, toColumnId: string) => void;
  onMoveColumn: (draggedColumnId: string, targetColumnId: string) => void;
  highlightedSites?: Set<string>;
  onSiteCheckboxChange: (columnId: string, siteId: string, isChecked: boolean) => void;
}

interface DragItem {
  type: string;
  id: string;
  columnId: string;
  site: Site;
}

interface ColumnDragItem {
  type: string;
  id: string;
  column: Column;
}

export function KanbanColumn({ 
  column, 
  isCollapsed, 
  isHighlighted = false,
  searchTerm = '',
  onUpdateColumn, 
  onSiteSelect, 
  onMoveSite,
  onMoveColumn,
  highlightedSites = new Set(),
  onSiteCheckboxChange
}: KanbanColumnProps) {
  const [localCollapsed, setLocalCollapsed] = useState(false);
  
  // Reset local collapsed state when global collapse changes
  useEffect(() => {
    if (isCollapsed) {
      setLocalCollapsed(false); // Reset local state when globally collapsed
    }
  }, [isCollapsed]);
  
  // Column is collapsed if either globally collapsed or locally collapsed (but global takes precedence)
  const collapsed = isCollapsed || localCollapsed;

  // Drag and drop for sites within columns
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'SITE_CARD',
    drop: (item: DragItem, monitor) => {
      if (monitor.didDrop()) {
        return; // If already handled by a nested target
      }
      console.log('Dropping item:', item, 'into column:', column.id);
      onMoveSite(item.id, item.columnId, column.id);
    },
    canDrop: (item: DragItem) => {
      return item.columnId !== column.id;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  });

  // Drag and drop for column reordering
  const [{ isDragging }, dragColumn] = useDrag({
    type: 'COLUMN',
    item: () => ({ 
      type: 'COLUMN', 
      id: column.id, 
      column: column 
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOverColumn }, dropColumn] = useDrop({
    accept: 'COLUMN',
    drop: (item: ColumnDragItem, monitor) => {
      if (monitor.didDrop()) {
        return; // If already handled by a nested target
      }
      if (item.id !== column.id) {
        console.log('Moving column:', item.id, 'to position of:', column.id);
        onMoveColumn(item.id, column.id);
      }
    },
    collect: (monitor) => ({
      isOverColumn: monitor.isOver({ shallow: true }),
    }),
  });

  const handleToggleCollapse = () => {
    // Only allow local toggle if not globally collapsed
    if (!isCollapsed) {
      setLocalCollapsed(!localCollapsed);
    }
  };

  const handleMenuClick = () => {
    // Handle menu actions for the stage
    console.log('Stage menu clicked for:', column.name);
  };

  const handleUpdateSite = (updatedSite: Site) => {
    const updatedSites = column.sites.map(site => 
      site.id === updatedSite.id ? updatedSite : site
    );
    onUpdateColumn({ ...column, sites: updatedSites });
  };

  const handleDeleteSite = (siteId: string) => {
    const updatedSites = column.sites.filter(site => site.id !== siteId);
    onUpdateColumn({ ...column, sites: updatedSites, count: updatedSites.length });
  };

  const handleDuplicateSite = (site: Site) => {
    const duplicatedSite = {
      ...site,
      id: `${site.id}-copy-${Date.now()}`,
      address: `${site.address} (Copy)`
    };
    const updatedSites = [...column.sites, duplicatedSite];
    onUpdateColumn({ ...column, sites: updatedSites, count: updatedSites.length });
  };

  // Determine drop zone styling for sites
  const getDropZoneStyle = () => {
    let style: any = {};
    
    if (isOver && canDrop) {
      style.backgroundColor = 'blue.50';
      style.borderColor = 'blue.500';
      style.borderWidth = '2px';
      style.borderStyle = 'dashed';
    } else if (canDrop) {
      style.borderColor = 'gray.300';
      style.borderWidth = '2px';
      style.borderStyle = 'dashed';
    }
    
    if (isHighlighted) {
      style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.3)';
      style.borderColor = 'blue.500';
      style.borderWidth = '2px';
    }
    
    // Column reordering visual feedback
    if (isOverColumn) {
      style.transform = 'scale(1.02)';
      style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.5)';
    }
    
    if (isDragging) {
      style.opacity = 0.5;
      style.transform = 'rotate(5deg)';
    }
    
    return style;
  };

  // Combine drop refs
  const combinedRef = (el: HTMLDivElement | null) => {
    drop(el);
    dropColumn(el);
  };

  return (
    <Box 
      ref={combinedRef}
      data-column-id={column.id}
      flexShrink={0}
      w="384px"
      bg={column.color}
      shadow="md"
      overflow="hidden"
      transition="all 0.2s"
      h={collapsed ? "64px" : "auto"}
      borderRadius="16px"
      sx={getDropZoneStyle()}
    >
      {/* Column Header - Draggable */}
      <Box 
        ref={dragColumn}
        h="64px" 
        borderBottom="1px solid" 
        borderColor="gray.200" 
        bg="white" 
        display="flex" 
        alignItems="center" 
        p={4} 
        borderTopRadius="16px"
        cursor={isDragging ? 'grabbing' : 'grab'}
        transition="all 0.2s"
        _hover={{ bg: 'gray.50' }}
      >
        <Flex justify="space-between" align="center" w="full">
          <Flex align="center" gap={2} flex={1} minW={0}>
            {/* Drag Handle Icon */}
            <Box color="gray.400" _hover={{ color: 'gray.600' }} transition="colors 0.2s">
              <GripVertical size={16} />
            </Box>
            {/* Stage Name with max width */}
            <Text 
              color="gray.700"
              isTruncated
              flex={1}
              maxW="200px"
              title={column.name} // Show full name on hover
              bg={isHighlighted ? "yellow.100" : "transparent"}
              px={isHighlighted ? 1 : 0}
              borderRadius={isHighlighted ? "md" : 0}
            >
              {column.name}
            </Text>
            
            <Badge 
              px={2}
              py={1}
              borderRadius="full"
              flexShrink={0}
              bg="blue.600"
              color="white"
              fontSize="xs"
              fontWeight="medium"
            >
              {column.count}
            </Badge>
          </Flex>
          
          <Flex align="center" gap={1} flexShrink={0}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleCollapse}
              p={1}
              minW="auto"
              h="auto"
              borderRadius="full"
              color="blue.600"
              _hover={{ bg: "blue.50" }}
              isDisabled={isCollapsed} // Disable individual toggle when globally collapsed
            >
              {collapsed ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronUp size={16} />
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleMenuClick}
              p={1}
              minW="auto"
              h="auto"
              borderRadius="full"
              color="blue.600"
              _hover={{ bg: "blue.50" }}
            >
              <MoreVertical size={16} />
            </Button>
          </Flex>
        </Flex>
      </Box>

      {/* Column Content */}
      {!collapsed && (
        <Box gap="6px" maxH="calc(100vh - 200px)" overflowY="auto" p={4} borderBottomRadius="16px">
          {column.sites.map((site, index) => (
            <Box key={site.id} mb="6px">
              <PropertyCard
                site={site}
                columnId={column.id}
                isHighlighted={highlightedSites.has(`site-${site.id}`)}
                searchTerm={searchTerm}
                onUpdate={handleUpdateSite}
                onDelete={handleDeleteSite}
                onDuplicate={handleDuplicateSite}
                onSiteSelect={onSiteSelect}
                onSiteCheckboxChange={onSiteCheckboxChange}
              />
            </Box>
          ))}
          
          {column.sites.length === 0 && (
            <Box textAlign="center" py={8} color="gray.500">
              <Text>No sites in this stage</Text>
              {isOver && canDrop && (
                <Text fontSize="sm" mt={2} color="blue.600" fontWeight="medium">Release to drop here</Text>
              )}
              {canDrop && !isOver && (
                <Text fontSize="sm" mt={2} color="gray.500">Drag cards here</Text>
              )}
            </Box>
          )}
          
          {/* Drop indicator when dragging over with content */}
          {isOver && canDrop && column.sites.length > 0 && (
            <Box border="2px dashed" borderColor="blue.500" bg="blue.50" borderRadius="lg" p={4} textAlign="center" color="blue.600" fontWeight="medium">
              Drop here to move to {column.name}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}