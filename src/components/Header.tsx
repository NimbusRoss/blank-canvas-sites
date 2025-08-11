import React, { useState } from 'react';
import { Search, X, Plus, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';

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
  const [showUserDropdown, setShowUserDropdown] = useState(false);
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
      'TR': 'bg-chart-1',
      'CK': 'bg-chart-2', 
      'VN': 'bg-chart-3',
      'ZN': 'bg-chart-4'
    };
    return colors[user as keyof typeof colors] || 'bg-primary';
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
    <div className="bg-card border-b border-border p-4">
      {/* Single line layout */}
      <div className="flex items-center justify-between">
        {/* Left side - My Sites, Search, Filters, Sort */}
        <div className="flex items-center gap-4">
          {/* Page title */}
          <h3 className="text-foreground">My Sites</h3>
          
          {/* Search */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search on My Sites"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-8 border-border focus:border-ring focus:ring-ring/50"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-auto text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Multi-Select Tags Dropdown */}
          <Popover open={isTagsOpen} onOpenChange={setIsTagsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="w-44 justify-between border-0 bg-transparent hover:bg-muted focus:bg-muted data-[state=open]:bg-muted text-primary [&>svg]:text-primary"
              >
                <span>
                  Filter by Tags {getSelectedTagsCount() > 0 && `(${getSelectedTagsCount()})`}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0" align="start">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-sm">Filter by Tags</span>
                  {selectedTags.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearAllTags}
                      className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Clear all
                    </Button>
                  )}
                </div>
                
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {availableTags.map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tag-${tag}`}
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={() => handleTagToggle(tag)}
                      />
                      <label
                        htmlFor={`tag-${tag}`}
                        className="text-sm font-normal cursor-pointer flex-1"
                      >
                        {tag}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={onSort}>
            <SelectTrigger className="w-44 border-0 bg-transparent hover:bg-muted focus:bg-muted data-[state=open]:bg-muted text-primary [&>svg]:text-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A–Z">Sort by: A–Z</SelectItem>
              <SelectItem value="Z–A">Sort by: Z–A</SelectItem>
              <SelectItem value="newest">Sort by: Newest</SelectItem>
              <SelectItem value="oldest">Sort by: Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Right side - User Avatars and Letter Generation (close together) */}
        <div className="flex items-center gap-3">
          {/* User Avatars */}
          <div className="flex items-center">
            {allUsers.map((user, index) => (
              <button
                key={user}
                onClick={() => handleUserToggle(user)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium transition-all duration-200 hover:scale-110 ${getUserColor(user)} ${
                  selectedUsers.includes(user) 
                    ? 'opacity-100 ring-2 ring-primary ring-offset-2' 
                    : 'opacity-50 hover:opacity-75'
                }`}
                style={{
                  marginLeft: index > 0 ? '-4px' : '0',
                  zIndex: allUsers.length - index
                }}
              >
                {user}
              </button>
            ))}
          </div>

          {/* Letter Generation button */}
          <Button 
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Letter Generation
          </Button>
        </div>
      </div>

      {/* Show selected tags if any */}
      {selectedTags.length > 0 && (
        <div className="flex items-center gap-2 mt-3">
          <span className="text-sm text-muted-foreground">Filtered by tags:</span>
          {selectedTags.map((tag) => (
            <Badge 
              key={tag}
              variant="default"
              className="cursor-pointer bg-accent text-accent-foreground border border-primary hover:bg-accent/80"
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-medium)',
                lineHeight: '1.33'
              }}
              onClick={() => onTagFilter(tag)}
            >
              {tag} ×
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}