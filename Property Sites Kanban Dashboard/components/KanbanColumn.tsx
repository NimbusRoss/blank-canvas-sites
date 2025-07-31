import React, { useState, useEffect } from 'react';
import { MoreVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { useDrop } from 'react-dnd';
import { Button } from './ui/button';
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
  isSelected?: boolean;
}

interface Column {
  id: string;
  name: string;
  color: string;
  borderColor: string;
  count: number;
  sites: Site[];
  isSelected?: boolean;
}

interface KanbanColumnProps {
  column: Column;
  isCollapsed: boolean;
  isHighlighted?: boolean;
  searchTerm?: string;
  onUpdateColumn: (column: Column) => void;
  onSiteSelect: (site: Site) => void;
  onMoveSite: (siteId: string, fromColumnId: string, toColumnId: string) => void;
  highlightedSites?: Set<string>;
  onSiteCheckboxChange: (columnId: string, siteId: string, isChecked: boolean) => void;
}

interface DragItem {
  type: string;
  id: string;
  columnId: string;
  site: Site;
}

export function KanbanColumn({ 
  column, 
  isCollapsed, 
  isHighlighted = false,
  searchTerm = '',
  onUpdateColumn, 
  onSiteSelect, 
  onMoveSite,
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

  // Determine drop zone styling
  const getDropZoneStyle = () => {
    if (isOver && canDrop) {
      return {
        backgroundColor: 'rgb(var(--color-info) / 0.1)',
        borderColor: 'rgb(var(--color-info))',
        borderWidth: '2px',
        borderStyle: 'dashed',
      };
    }
    if (canDrop) {
      return {
        borderColor: 'rgb(var(--color-border))',
        borderWidth: '2px',
        borderStyle: 'dashed',
      };
    }
    return {};
  };

  // Highlight style for search matches
  const getHighlightStyle = () => {
    if (isHighlighted) {
      return {
        boxShadow: '0 0 0 3px rgb(var(--color-primary) / 0.3)',
        borderColor: 'rgb(var(--color-primary))',
        borderWidth: '2px',
      };
    }
    return {};
  };

  // Combine styles
  const combinedStyle = {
    ...getDropZoneStyle(),
    ...getHighlightStyle(),
  };

  return (
    <div 
      ref={drop}
      data-column-id={column.id}
      className={`flex-shrink-0 w-96 ${column.color} shadow-md overflow-hidden transition-all duration-200 ${collapsed ? 'h-16' : ''}`}
      style={{
        borderRadius: '16px',
        ...combinedStyle
      }}
    >
      {/* Column Header */}
      <div className="h-16 border-b border-border bg-card/50 flex items-center p-4 rounded-t-[16px] rounded-b-[0px]">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Stage Name with max width */}
            <h4 
              className={`text-foreground truncate flex-1 max-w-[200px] ${isHighlighted ? 'bg-warning/30 px-1 rounded' : ''}`}
              title={column.name} // Show full name on hover
            >
              {column.name}
            </h4>
            
            <span 
              className="px-2 py-1 rounded-full flex-shrink-0 bg-primary text-primary-foreground"
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-medium)',
                lineHeight: '1.33'
              }}
            >
              {column.count}
            </span>
          </div>
          
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleCollapse}
              className="p-1 h-auto rounded-full text-primary hover:bg-primary/10"
              disabled={isCollapsed} // Disable individual toggle when globally collapsed
            >
              {collapsed ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronUp className="w-4 h-4" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleMenuClick}
              className="p-1 h-auto rounded-full text-primary hover:bg-primary/10"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Column Content */}
      {!collapsed && (
        <div className="space-y-[6px] max-h-[calc(100vh-200px)] overflow-y-auto p-4 rounded-t-[0px] rounded-b-[16px]">
          {column.sites.map((site, index) => (
            <PropertyCard
              key={site.id}
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
          ))}
          
          {column.sites.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No sites in this stage</p>
              {isOver && canDrop && (
                <p className="text-sm mt-2 text-info font-medium">Release to drop here</p>
              )}
              {canDrop && !isOver && (
                <p className="text-sm mt-2 text-muted-foreground">Drag cards here</p>
              )}
            </div>
          )}
          
          {/* Drop indicator when dragging over with content */}
          {isOver && canDrop && column.sites.length > 0 && (
            <div className="border-2 border-dashed border-info bg-info/10 rounded-lg p-4 text-center text-info font-medium">
              Drop here to move to {column.name}
            </div>
          )}
        </div>
      )}
    </div>
  );
}