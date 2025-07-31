import React from 'react';
import { MapPin, Bookmark, Bell, FileText, Settings, HelpCircle, User } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export function TopNavigation() {
  return (
    <div className="p-[6px] px-[6px] py-[16px]">
      <nav className="bg-primary border border-border rounded-[12px] p-[8px] px-[12px] py-[8px]">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center gap-6">
            {/* NIMBUS Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-destructive text-destructive-foreground px-3 py-1 rounded-md font-bold text-sm">
                NIMBUS
              </div>
            </div>
            
            {/* Navigation Items */}
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
              >
                <MapPin className="w-4 h-4" />
                Map
              </Button>
              
              {/* Saved Sites - Active/Selected */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-2 text-primary-foreground bg-primary-foreground/20 hover:bg-primary-foreground/30"
              >
                <Bookmark className="w-4 h-4" />
                Saved Sites
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Bell className="w-4 h-4" />
                Alerts
                {/* Notification Badge */}
                <Badge 
                  variant="destructive"
                  className="min-w-[20px] h-5 flex items-center justify-center rounded-full bg-warning text-warning-foreground"
                  style={{
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-medium)',
                    lineHeight: '1.33'
                  }}
                >
                  99
                </Badge>
              </Button>
            </div>
          </div>
          
          {/* Right side - Icons and User */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <FileText className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Settings className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <HelpCircle className="w-4 h-4" />
            </Button>
            
            {/* User Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-primary-foreground/20">
              <div className="w-8 h-8 bg-info rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}