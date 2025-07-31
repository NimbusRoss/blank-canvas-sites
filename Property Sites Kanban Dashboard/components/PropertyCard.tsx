import React, { useState } from 'react';
import { MessageCircle, Paperclip, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { useDrag } from 'react-dnd';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Checkbox } from './ui/checkbox';

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
        <mark key={index} className="bg-warning/30 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const visibleTags = site.tags.slice(0, 2);
  const hiddenTagsCount = site.tags.length - 2;

  // Card highlight style
  const cardHighlightStyle = isHighlighted ? {
    boxShadow: '0 0 0 3px rgb(var(--color-primary) / 0.3)',
    borderColor: 'rgb(var(--color-primary))',
    borderWidth: '2px',
  } : {};

  return (
    <div
      ref={drag}
      data-site-id={site.id}
      className={`transition-all duration-200 ${
        isDragging 
          ? 'opacity-50 scale-105 rotate-2 z-50' 
          : 'opacity-100 scale-100 rotate-0'
      }`}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <Card 
        className="bg-card select-none shadow-sm border-0"
        style={{
          borderRadius: '8px',
          ...cardHighlightStyle
        }}
      >
        <CardContent className="p-[16px]">
          {/* Header with Checkbox, Address and Action Buttons */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3 flex-1 pr-2 min-w-0">
              {/* Site Checkbox */}
              <Checkbox
                checked={site.isSelected || false}
                onCheckedChange={handleSiteCheckboxChange}
                className="flex-shrink-0 mt-1"
              />
              
              {/* Address */}
              <div className="flex-1 min-w-0">
                <div 
                  className="cursor-pointer hover:text-info transition-colors"
                  onClick={handleAddressClick}
                  style={{
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-weight-bold)',
                    lineHeight: '1.2',
                    color: 'rgb(var(--color-foreground))',
                    marginBottom: '4px'
                  }}
                >
                  {highlightSearchTerm(site.address, searchTerm)}
                </div>
              </div>
            </div>
            
            <div className="flex items-center flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="p-1 h-auto rounded-full text-primary hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleCardCollapse}
                className="p-1 h-auto rounded-full text-primary hover:bg-primary/10"
              >
                {isCardCollapsed ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronUp className="w-3 h-3" />
                )}
              </Button>
            </div>
          </div>

          {/* Collapsible Content */}
          {!isCardCollapsed && (
            <>
              {/* Secondary Address */}
              <div className="mb-3 ml-7">
                <p className="text-sm text-muted-foreground">{site.secondaryAddress}</p>
              </div>

              {/* Description */}
              <p 
                className="text-muted-foreground mb-3 leading-relaxed ml-7"
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-normal)',
                  lineHeight: '1.5'
                }}
              >
                {site.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4 ml-7">
                {visibleTags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="cursor-pointer"
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--font-weight-medium)',
                      lineHeight: '1.33'
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
                {hiddenTagsCount > 0 && (
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer hover:bg-muted"
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--font-weight-medium)',
                      lineHeight: '1.33'
                    }}
                  >
                    {hiddenTagsCount} more
                  </Badge>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-border ml-7">
                {/* Left side - Date only */}
                <div className="flex items-center">
                  <span className="text-xs text-muted-foreground">{site.date}</span>
                </div>

                {/* Right side - Comments and Documents */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MessageCircle className="w-3 h-3" />
                    <span className="text-xs">{site.comments}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Paperclip className="w-3 h-3" />
                    <span className="text-xs">{site.documents}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}