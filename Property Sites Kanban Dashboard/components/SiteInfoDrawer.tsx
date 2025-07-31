import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Maximize2, 
  ExternalLink,
  Building,
  Bed,
  Bath,
  Car,
  Map,
  FileText,
  Search,
  Building2,
  Users,
  Zap
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Separator } from './ui/separator';

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

interface SiteInfoDrawerProps {
  site: Site | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SiteInfoDrawer({ site, isOpen, onClose }: SiteInfoDrawerProps) {
  const [activeTab, setActiveTab] = useState('details');

  if (!site) return null;

  // Mock data for the property intelligence panel
  const propertyData = {
    title: '51 Broad Street',
    status: 'On the Market',
    subAddress: 'Reading, RG1 1EU',
    titleNumber: 'HW97157',
    tenure: 'Freehold',
    linkedTitles: 5,
    siteArea: '0.274 acres',
    totalFloorArea: '16,552 ft²',
    lastSaleValue: '£2,750,000',
    lastSaleDate: '15 Jan 2023',
    owner: 'Private Individual',
    propertyType: 'Semi-Detached',
    beds: 'XX',
    receptions: 'XX',
    baths: 'XX'
  };

  const ownershipData = [
    {
      type: 'Company',
      name: 'Broadstone Properties Ltd',
      address: '123 Commercial Road, London, EC1V 2NX',
      buyingDate: '15 Jan 2023'
    },
    {
      type: 'Private',
      name: 'John Smith',
      address: '456 Residential Avenue, Reading, RG1 2AB',
      buyingDate: '03 Mar 2020'
    }
  ];

  const useClassData = [
    { oldClass: 'A1', newClass: 'E', description: 'Retail/Commercial' },
    { oldClass: 'B1', newClass: 'E', description: 'Office/Business' },
    { oldClass: 'D2', newClass: 'F1', description: 'Assembly/Leisure' }
  ];

  const addressData = [
    { address: '51 Broad Street, Reading, RG1 1EU', uprn: '100081234567' },
    { address: '51A Broad Street, Reading, RG1 1EU', uprn: '100081234568' },
    { address: '51B Broad Street, Reading, RG1 1EU', uprn: '100081234569' }
  ];

  const buildingData = [
    {
      name: 'Building 1',
      footprint: '8,276 ft²',
      heightAboveSeaLevel: '52m',
      chimneyHeight: '18m',
      eavesHeight: '12m'
    },
    {
      name: 'Building 2',
      footprint: '4,138 ft²',
      heightAboveSeaLevel: '52m',
      chimneyHeight: '15m',
      eavesHeight: '10m'
    }
  ];

  const commercialHighLevelData = [
    { useType: 'Office', count: 12, totalArea: '8,450 ft²', avgRate: '£45/ft²' },
    { useType: 'Retail', count: 3, totalArea: '2,100 ft²', avgRate: '£65/ft²' },
    { useType: 'Storage', count: 2, totalArea: '1,200 ft²', avgRate: '£15/ft²' }
  ];

  const commercialDetailedData = [
    { zone: 'Ground Floor - Zone A', count: 8, totalArea: '4,200 ft²', avgRate: '£48/ft²' },
    { zone: 'Ground Floor - Zone B', count: 4, totalArea: '2,100 ft²', avgRate: '£42/ft²' },
    { zone: 'First Floor', count: 5, totalArea: '3,450 ft²', avgRate: '£38/ft²' }
  ];

  const epcData = [
    { building: 'Building 1', address: '51 Broad Street', rating: 'C70', potential: 'B85', validUntil: '15 Jan 2033' },
    { building: 'Building 2', address: '51A Broad Street', rating: 'D55', potential: 'C72', validUntil: '22 Mar 2032' }
  ];

  const populationData = [
    { radius: '100m', population: 'XXX', households: 'XXX' },
    { radius: '250m', population: 'XXX', households: 'XXX' },
    { radius: '500m', population: 'XXX', households: 'XXX' },
    { radius: '750m', population: 'XXX', households: 'XXX' },
    { radius: '1km', population: 'XXX', households: 'XXX' }
  ];

  const getRatingColor = (rating: string) => {
    const letter = rating.charAt(0);
    switch (letter) {
      case 'A': return 'bg-green-600';
      case 'B': return 'bg-green-500';
      case 'C': return 'bg-yellow-500';
      case 'D': return 'bg-orange-500';
      case 'E': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:w-[600px] p-0 overflow-hidden">
        <SheetHeader className="sr-only">
          <SheetTitle>Property Details for {propertyData.title}</SheetTitle>
          <SheetDescription>
            Detailed property intelligence information including ownership, building attributes, commercial uses, EPC ratings, and population data.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-card border-b border-border">
            <div className="p-6 pb-4">
              {/* Title Row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="font-bold text-foreground" style={{ fontSize: '18px' }}>{propertyData.title}</h2>
                    <Badge variant="secondary" className="bg-success text-success-foreground text-xs">
                      {propertyData.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3 text-[14px]">
                    <span className="text-muted-foreground">{propertyData.subAddress}</span>
                    <Badge variant="outline" className="text-[14px]">
                      {propertyData.tenure}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="outline" className="text-[14px]">
                      {propertyData.titleNumber}
                    </Badge>
                    <div className="flex items-center gap-1 text-[14px] text-primary">
                      <ExternalLink className="w-3 h-3" />
                      <span>linked to {propertyData.linkedTitles} active titles</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Summary Badges */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <div className="text-[14px] text-muted-foreground">Site Area</div>
                  <div className="font-semibold text-[14px]">{propertyData.siteArea}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[14px] text-muted-foreground">Total Floor Area</div>
                  <div className="font-semibold text-[14px]">{propertyData.totalFloorArea}</div>
                </div>
                <div className="space-y-1 col-span-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground text-sm">Last Sale: </span>
                    <span className="font-semibold text-sm">{propertyData.lastSaleValue} </span>
                    <span className="text-muted-foreground text-sm">{propertyData.lastSaleDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-muted-foreground">Owner</span>
                    <Badge variant="secondary" className="text-xs">Private</Badge>
                    <Button variant="link" className="p-0 h-auto text-[14px] text-primary">
                      Purchase Register
                    </Button>
                  </div>
                </div>

              </div>
            </div>

            {/* Property Summary Block */}
            <div className="px-6 pb-4">
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[14px]">{propertyData.propertyType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[14px]">{propertyData.beds}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[14px]">{propertyData.baths}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[14px]">{propertyData.receptions}</span>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details" className="text-[14px]">Details</TabsTrigger>
                  <TabsTrigger value="planning" className="text-[14px]">Planning</TabsTrigger>
                  <TabsTrigger value="sales" className="text-[14px]">Sales</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsContent value="details" className="mt-0 space-y-6">
                  {/* Ownership Section */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="ownership">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span className="text-[14px]">Ownership</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        {ownershipData.map((owner, index) => (
                          <div key={index} className="border rounded-lg p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-[14px]">{owner.name}</h4>
                              <Badge variant={owner.type === 'Company' ? 'default' : 'secondary'} className="text-[14px]">
                                {owner.type}
                              </Badge>
                            </div>
                            <p className="text-[14px] text-muted-foreground">{owner.address}</p>
                            <div className="text-[14px]">
                              <span className="text-muted-foreground">Purchased: </span>
                              <span>{owner.buyingDate}</span>
                            </div>
                            <div className="flex gap-2">
                              {owner.type === 'Company' ? (
                                <>
                                  <Button variant="outline" size="sm" className="text-[14px]">
                                    <Search className="w-3 h-3 mr-2" />
                                    Search for closures
                                  </Button>
                                  <Button variant="outline" size="sm" className="text-[14px]">
                                    <Building2 className="w-3 h-3 mr-2" />
                                    Company properties
                                  </Button>
                                </>
                              ) : (
                                <Button variant="outline" size="sm" className="text-[14px]">
                                  <FileText className="w-3 h-3 mr-2" />
                                  Download Title Register
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Separator />

                  {/* Use Class & Addresses Section */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="use-class">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          <span className="text-[14px]">Use Class &amp; Addresses</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-[14px]">Old Class</TableHead>
                              <TableHead className="text-[14px]">New Class</TableHead>
                              <TableHead className="text-[14px]">Description</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {useClassData.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell className="text-[14px]">{item.oldClass}</TableCell>
                                <TableCell className="text-[14px]">{item.newClass}</TableCell>
                                <TableCell className="text-[14px]">{item.description}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        
                        <div className="space-y-2">
                          <h4 className="font-semibold text-[14px]">Addresses</h4>
                          {addressData.map((addr, index) => (
                            <div key={index} className="flex justify-between items-center text-[14px]">
                              <span>{addr.address}</span>
                              <span className="text-muted-foreground">{addr.uprn}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Separator />

                  {/* Building & Land Attributes Section */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="building-attributes">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          <span className="text-[14px]">Building &amp; Land Attributes</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        {buildingData.map((building, index) => (
                          <div key={index} className="border rounded-lg p-4 space-y-3">
                            <h4 className="font-semibold text-[14px]">{building.name}</h4>
                            <div className="grid grid-cols-2 gap-4 text-[14px]">
                              <div>
                                <span className="text-muted-foreground">Building footprint: </span>
                                <span>{building.footprint}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Height above sea level: </span>
                                <span>{building.heightAboveSeaLevel}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Chimney height: </span>
                                <span>{building.chimneyHeight}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Eaves height: </span>
                                <span>{building.eavesHeight}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="link" size="sm" className="p-0 h-auto text-[14px]">
                                <Map className="w-3 h-3 mr-2" />
                                Show boundary on map
                              </Button>
                              <Button variant="outline" size="sm" className="text-[14px]">
                                Detailed view
                              </Button>
                            </div>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Separator />

                  {/* Commercial Uses Section */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="commercial-uses">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          <span className="text-[14px]">Commercial Uses, Sizes &amp; Rates Assessments</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3 text-[14px]">High-Level Summary by Uses</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="text-[14px]">Use Type</TableHead>
                                <TableHead className="text-[14px]">Count</TableHead>
                                <TableHead className="text-[14px]">Total Area</TableHead>
                                <TableHead className="text-[14px]">Avg Rate per ft²</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {commercialHighLevelData.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell className="text-[14px]">{item.useType}</TableCell>
                                  <TableCell className="text-[14px]">{item.count}</TableCell>
                                  <TableCell className="text-[14px]">{item.totalArea}</TableCell>
                                  <TableCell className="text-[14px]">{item.avgRate}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 text-[14px]">Detailed Breakdown by Zones/Spaces</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="text-[14px]">Zone/Space</TableHead>
                                <TableHead className="text-[14px]">Count</TableHead>
                                <TableHead className="text-[14px]">Total Area</TableHead>
                                <TableHead className="text-[14px]">Avg Rate per ft²</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {commercialDetailedData.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell className="text-[14px]">{item.zone}</TableCell>
                                  <TableCell className="text-[14px]">{item.count}</TableCell>
                                  <TableCell className="text-[14px]">{item.totalArea}</TableCell>
                                  <TableCell className="text-[14px]">{item.avgRate}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>

                        <div className="text-[14px] text-muted-foreground">
                          <span>Sources: </span>
                          <Button variant="link" className="p-0 h-auto text-[14px]">
                            VOA, Companies House
                          </Button>
                          <span className="ml-4">Last updated: 15 Jan 2024</span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Separator />

                  {/* EPC Rating Section */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="epc-rating">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          <span className="text-[14px]">EPC Rating</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-[14px]">Building</TableHead>
                              <TableHead className="text-[14px]">Address</TableHead>
                              <TableHead className="text-[14px]">Rating</TableHead>
                              <TableHead className="text-[14px]">Potential</TableHead>
                              <TableHead className="text-[14px]">Valid Until</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {epcData.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell className="text-[14px]">{item.building}</TableCell>
                                <TableCell className="text-[14px]">{item.address}</TableCell>
                                <TableCell>
                                  <Badge className={`${getRatingColor(item.rating)} text-white text-[14px]`}>
                                    {item.rating}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge className={`${getRatingColor(item.potential)} text-white text-[14px]`}>
                                    {item.potential}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-[14px]">{item.validUntil}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        
                        <div className="text-[14px] text-muted-foreground mt-4">
                          <span>Sources: </span>
                          <Button variant="link" className="p-0 h-auto text-[14px]">
                            EPC Register
                          </Button>
                          <span className="ml-4">Last updated: 12 Jan 2024</span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Separator />

                  {/* Population Section */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="population">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span className="text-[14px]">Population</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-[14px]">Radius</TableHead>
                              <TableHead className="text-[14px]">Population</TableHead>
                              <TableHead className="text-[14px]">Households</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {populationData.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell className="text-[14px]">{item.radius}</TableCell>
                                <TableCell className="text-[14px]">{item.population}</TableCell>
                                <TableCell className="text-[14px]">{item.households}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        
                        <div className="text-[14px] text-muted-foreground mt-4">
                          <span>Sources: </span>
                          <Button variant="link" className="p-0 h-auto text-[14px]">
                            ONS Census 2021
                          </Button>
                          <span className="ml-4">Last updated: 10 Jan 2024</span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
                
                <TabsContent value="planning" className="mt-0">
                  <div className="text-center py-8 text-muted-foreground text-[14px]">
                    Planning information will be displayed here
                  </div>
                </TabsContent>
                
                <TabsContent value="sales" className="mt-0">
                  <div className="text-center py-8 text-muted-foreground text-[14px]">
                    Sales information will be displayed here
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}