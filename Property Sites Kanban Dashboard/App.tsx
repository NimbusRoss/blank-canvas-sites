import React, { useState, useRef } from 'react';
import { ChevronDown, Plus, Search, X } from 'lucide-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TopNavigation } from './components/TopNavigation';
import { Header } from './components/Header';
import { KanbanColumn } from './components/KanbanColumn';
import { SiteInfoDrawer } from './components/SiteInfoDrawer';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Checkbox } from './components/ui/checkbox';
import { Input } from './components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';

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

interface SearchResult {
  type: 'stage' | 'site';
  id: string;
  columnId?: string;
  siteId?: string;
  matchText: string;
}

// Mock data for demonstration
const mockData = {
  columns: [
    {
      id: 'nielsen',
      name: 'Nielsen',
      color: 'bg-info/10',
      borderColor: 'border-info/20',
      count: 2,
      isSelected: false,
      sites: [
        {
          id: '1',
          address: '123 Tenth Avenue, Manhattan, NY',
          secondaryAddress: '{Sites Address}',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
          tags: ['Tag Name 897', 'Commercial', 'Premium', 'High Priority', 'Urgent', 'Available', 'Hot Lead'],
          date: '23.02.24',
          comments: 5,
          documents: 12,
          isExpanded: false,
          isSelected: false
        },
        {
          id: '2',
          address: '456 Park Avenue, Manhattan, NY',
          secondaryAddress: '{Sites Address}',
          description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
          tags: ['Tag Name 898', 'Residential'],
          date: '24.02.24',
          comments: 3,
          documents: 8,
          isExpanded: false,
          isSelected: false
        }
      ]
    },
    {
      id: 'westinghouse',
      name: 'Westinghouse Electric Company',
      color: 'bg-warning/10',
      borderColor: 'border-warning/20',
      count: 1,
      isSelected: false,
      sites: [
        {
          id: '3',
          address: '789 Broadway, Manhattan, NY',
          secondaryAddress: '{Sites Address}',
          description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
          tags: ['Industrial', 'Large Scale'],
          date: '25.02.24',
          comments: 7,
          documents: 15,
          isExpanded: false,
          isSelected: false
        }
      ]
    },
    {
      id: 'prospects',
      name: 'Prospects',
      color: 'bg-secondary/10',
      borderColor: 'border-secondary/20',
      count: 1,
      isSelected: false,
      sites: [
        {
          id: '4',
          address: '321 Fifth Avenue, Manhattan, NY',
          secondaryAddress: '{Sites Address}',
          description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
          tags: ['Potential', 'Follow Up'],
          date: '26.02.24',
          comments: 2,
          documents: 4,
          isExpanded: false,
          isSelected: false
        }
      ]
    },
    {
      id: 'closed',
      name: 'Closed Deals',
      color: 'bg-success/10',
      borderColor: 'border-success/20',
      count: 1,
      isSelected: false,
      sites: [
        {
          id: '5',
          address: '654 Madison Avenue, Manhattan, NY',
          secondaryAddress: '{Sites Address}',
          description: 'Mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error.',
          tags: ['Completed', 'Success'],
          date: '27.02.24',
          comments: 1,
          documents: 20,
          isExpanded: false,
          isSelected: false
        }
      ]
    }
  ]
};

export default function App() {
  const [columns, setColumns] = useState(mockData.columns);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('A–Z');
  const [selectedUsers, setSelectedUsers] = useState(['TR', 'CK', 'VN', 'ZN']);
  const [allCollapsed, setAllCollapsed] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [highlightedResults, setHighlightedResults] = useState<Set<string>>(new Set());
  const [allSelected, setAllSelected] = useState(false);
  
  // Ref for the columns container to enable scrolling to new stages
  const columnsContainerRef = useRef<HTMLDivElement>(null);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setSearchResults([]);
      setHighlightedResults(new Set());
    }
  };

  const executeSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setHighlightedResults(new Set());
      return;
    }

    const results: SearchResult[] = [];
    const highlighted = new Set<string>();
    const searchLower = searchTerm.toLowerCase().trim();

    // Search through stage names
    columns.forEach(column => {
      if (column.name.toLowerCase().includes(searchLower)) {
        results.push({
          type: 'stage',
          id: column.id,
          matchText: column.name
        });
        highlighted.add(`stage-${column.id}`);
      }

      // Search through site addresses in this column
      column.sites.forEach(site => {
        if (site.address.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'site',
            id: site.id,
            columnId: column.id,
            siteId: site.id,
            matchText: site.address
          });
          highlighted.add(`site-${site.id}`);
        }
      });
    });

    setSearchResults(results);
    setHighlightedResults(highlighted);

    // Scroll to first result if any
    if (results.length > 0) {
      scrollToFirstResult(results[0]);
    }
  };

  const scrollToFirstResult = (firstResult: SearchResult) => {
    // If it's a stage, scroll to that column
    if (firstResult.type === 'stage') {
      const columnElement = document.querySelector(`[data-column-id="${firstResult.id}"]`);
      if (columnElement) {
        columnElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
    // If it's a site, scroll to that site card
    else if (firstResult.type === 'site') {
      const siteElement = document.querySelector(`[data-site-id="${firstResult.siteId}"]`);
      if (siteElement) {
        siteElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setHighlightedResults(new Set());
  };

  const handleSort = (sortOption: string) => {
    setSortBy(sortOption);
  };

  const handleUserFilter = (users: string[]) => {
    setSelectedUsers(users);
  };

  const handleCollapseAll = () => {
    setAllCollapsed(!allCollapsed);
  };

  const handleSelectAll = (checked: boolean) => {
    setAllSelected(checked);
    setColumns(prevColumns => {
      return prevColumns.map(column => ({
        ...column,
        isSelected: checked,
        sites: column.sites.map(site => ({
          ...site,
          isSelected: checked
        }))
      }));
    });
  };

  const handleAddNewStage = () => {
    const newColumn = {
      id: `new-stage-${Date.now()}`,
      name: 'New Stage',
      color: 'bg-muted',
      borderColor: 'border-border',
      count: 0,
      isSelected: false,
      sites: []
    };
    
    setColumns([...columns, newColumn]);
    
    // Scroll to the right to show the new stage after a brief delay
    setTimeout(() => {
      if (columnsContainerRef.current) {
        columnsContainerRef.current.scrollTo({
          left: columnsContainerRef.current.scrollWidth,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleTagFilter = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSiteSelect = (site: Site) => {
    setSelectedSite(site);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedSite(null);
  };

  const handleMoveSite = (siteId: string, fromColumnId: string, toColumnId: string) => {
    console.log(`Moving site ${siteId} from ${fromColumnId} to ${toColumnId}`);
    
    if (fromColumnId === toColumnId) {
      console.log('Same column, no move needed');
      return;
    }

    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      
      // Find the columns
      const fromColumnIndex = newColumns.findIndex(col => col.id === fromColumnId);
      const toColumnIndex = newColumns.findIndex(col => col.id === toColumnId);
      
      if (fromColumnIndex === -1 || toColumnIndex === -1) {
        console.log('Column not found');
        return prevColumns;
      }
      
      // Find the site to move
      const fromColumn = { ...newColumns[fromColumnIndex] };
      const toColumn = { ...newColumns[toColumnIndex] };
      
      const siteIndex = fromColumn.sites.findIndex(site => site.id === siteId);
      if (siteIndex === -1) {
        console.log('Site not found');
        return prevColumns;
      }
      
      // Move the site
      const siteToMove = fromColumn.sites[siteIndex];
      fromColumn.sites = fromColumn.sites.filter(site => site.id !== siteId);
      toColumn.sites = [...toColumn.sites, siteToMove];
      
      // Update counts
      fromColumn.count = fromColumn.sites.length;
      toColumn.count = toColumn.sites.length;
      
      // Update the columns array
      newColumns[fromColumnIndex] = fromColumn;
      newColumns[toColumnIndex] = toColumn;
      
      console.log('Move completed successfully');
      return newColumns;
    });
  };

  const handleSiteCheckboxChange = (columnId: string, siteId: string, isChecked: boolean) => {
    setColumns(prevColumns => {
      return prevColumns.map(column => {
        if (column.id === columnId) {
          const updatedSites = column.sites.map(site => 
            site.id === siteId ? { ...site, isSelected: isChecked } : site
          );
          
          // Check if all sites are selected to update column checkbox
          const allSitesSelected = updatedSites.every(site => site.isSelected);
          
          return {
            ...column,
            sites: updatedSites,
            isSelected: allSitesSelected
          };
        }
        return column;
      });
    });
  };

  // Filter columns based on selected tags
  const getFilteredColumns = () => {
    if (selectedTags.length === 0) {
      return columns;
    }

    return columns.map(column => {
      const filteredSites = column.sites.filter(site => {
        // Check if the site has at least one of the selected tags
        return selectedTags.some(selectedTag => 
          site.tags.some(siteTag => 
            siteTag.toLowerCase().includes(selectedTag.toLowerCase())
          )
        );
      });

      return {
        ...column,
        sites: filteredSites,
        count: filteredSites.length
      };
    });
  };

  // Get all unique tags from all sites
  const allTags = Array.from(new Set(
    columns.flatMap(column => 
      column.sites.flatMap(site => site.tags)
    )
  ));

  const filteredColumns = getFilteredColumns();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-background">
        <TopNavigation />
        <Header
          searchTerm={searchTerm}
          onSearch={handleSearch}
          onSearchExecute={executeSearch}
          onClearSearch={clearSearch}
          searchResults={searchResults}
          selectedUsers={selectedUsers}
          onUserFilter={handleUserFilter}
          selectedTags={selectedTags}
          onTagFilter={handleTagFilter}
          sortBy={sortBy}
          onSort={handleSort}
        />
        
        {/* Controls Section Above Stages */}
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            {/* Left side - Select All and Collapse All */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-foreground">Select all</span>
              </div>
              
              <Button 
                variant="outline" 
                onClick={handleCollapseAll}
                className="border-2 border-primary text-primary bg-background hover:bg-primary/5"
              >
                {allCollapsed ? 'Expand all' : 'Collapse all'}
              </Button>
            </div>

            {/* Right side - Add New Stage */}
            <Button 
              onClick={handleAddNewStage}
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Stage
            </Button>
          </div>
        </div>
        
        <main className="p-4">
          <div 
            ref={columnsContainerRef}
            className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-muted"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgb(var(--color-muted-foreground)) rgb(var(--color-muted))'
            }}
          >
            {filteredColumns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                isCollapsed={allCollapsed}
                isHighlighted={highlightedResults.has(`stage-${column.id}`)}
                searchTerm={searchTerm}
                onUpdateColumn={(updatedColumn) => {
                  setColumns(columns.map(col => 
                    col.id === updatedColumn.id ? updatedColumn : col
                  ));
                }}
                onSiteSelect={handleSiteSelect}
                onMoveSite={handleMoveSite}
                highlightedSites={highlightedResults}
                onSiteCheckboxChange={handleSiteCheckboxChange}
              />
            ))}
          </div>
        </main>

        {/* Site Info Drawer */}
        <SiteInfoDrawer
          site={selectedSite}
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
        />
      </div>
    </DndProvider>
  );
}