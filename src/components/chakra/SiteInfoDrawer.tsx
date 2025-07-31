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
import { 
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Flex,
  Text,
  Badge,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider
} from '@chakra-ui/react';

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

interface SiteInfoDrawerProps {
  site: Site | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SiteInfoDrawer({ site, isOpen, onClose }: SiteInfoDrawerProps) {
  const [activeTab, setActiveTab] = useState(0);

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

  const getRatingColor = (rating: string) => {
    const letter = rating.charAt(0);
    switch (letter) {
      case 'A': return 'green.600';
      case 'B': return 'green.500';
      case 'C': return 'yellow.500';
      case 'D': return 'orange.500';
      case 'E': return 'red.500';
      default: return 'gray.500';
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
      <DrawerOverlay />
      <DrawerContent maxW="600px" p={0}>
        <DrawerHeader p={0}>
          {/* Sticky Header */}
          <Box position="sticky" top={0} zIndex={10} bg="white" borderBottom="1px solid" borderColor="gray.200">
            <Box p={6} pb={4}>
              {/* Title Row */}
              <Flex justify="space-between" align="flex-start" mb={4}>
                <Box flex={1}>
                  <Flex align="center" gap={3} mb={2}>
                    <Text fontSize="18px" fontWeight="bold" color="gray.700">{propertyData.title}</Text>
                    <Badge bg="green.100" color="green.800" fontSize="xs">
                      {propertyData.status}
                    </Badge>
                  </Flex>
                  
                  <Flex align="center" gap={3} mb={3} fontSize="14px">
                    <Text color="gray.500">{propertyData.subAddress}</Text>
                    <Badge variant="outline" fontSize="14px">
                      {propertyData.tenure}
                    </Badge>
                  </Flex>
                  
                  <Flex align="center" gap={3} mb={3}>
                    <Badge variant="outline" fontSize="14px">
                      {propertyData.titleNumber}
                    </Badge>
                    <Flex align="center" gap={1} fontSize="14px" color="blue.600">
                      <ExternalLink size={12} />
                      <Text>linked to {propertyData.linkedTitles} active titles</Text>
                    </Flex>
                  </Flex>
                </Box>

                {/* Action Buttons */}
                <Flex align="center" gap={2}>
                  <Button variant="ghost" size="sm">
                    <Download size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Copy size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Maximize2 size={16} />
                  </Button>
                  <DrawerCloseButton position="static" />
                </Flex>
              </Flex>

              {/* Summary Information */}
              <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={4} mb={4}>
                <Box>
                  <Text fontSize="14px" color="gray.500">Site Area</Text>
                  <Text fontWeight="semibold" fontSize="14px">{propertyData.siteArea}</Text>
                </Box>
                <Box>
                  <Text fontSize="14px" color="gray.500">Total Floor Area</Text>
                  <Text fontWeight="semibold" fontSize="14px">{propertyData.totalFloorArea}</Text>
                </Box>
                <Box gridColumn="span 2">
                  <Text fontSize="sm">
                    <Text as="span" color="gray.500" fontSize="sm">Last Sale: </Text>
                    <Text as="span" fontWeight="semibold" fontSize="sm">{propertyData.lastSaleValue} </Text>
                    <Text as="span" color="gray.500" fontSize="sm">{propertyData.lastSaleDate}</Text>
                  </Text>
                  <Flex align="center" gap={2}>
                    <Text fontSize="14px" color="gray.500">Owner</Text>
                    <Badge bg="gray.100" fontSize="xs">Private</Badge>
                    <Button variant="link" p={0} h="auto" fontSize="14px" color="blue.600">
                      Purchase Register
                    </Button>
                  </Flex>
                </Box>
              </Box>
            </Box>

            {/* Property Summary Block */}
            <Box px={6} pb={4}>
              <Flex align="center" gap={6} mb={4}>
                <Flex align="center" gap={2}>
                  <Building size={16} color="gray.500" />
                  <Text fontSize="14px">{propertyData.propertyType}</Text>
                </Flex>
                <Flex align="center" gap={2}>
                  <Bed size={16} color="gray.500" />
                  <Text fontSize="14px">{propertyData.beds}</Text>
                </Flex>
                <Flex align="center" gap={2}>
                  <Bath size={16} color="gray.500" />
                  <Text fontSize="14px">{propertyData.baths}</Text>
                </Flex>
                <Flex align="center" gap={2}>
                  <Car size={16} color="gray.500" />
                  <Text fontSize="14px">{propertyData.receptions}</Text>
                </Flex>
              </Flex>

              <Tabs index={activeTab} onChange={setActiveTab}>
                <TabList>
                  <Tab fontSize="14px">Details</Tab>
                  <Tab fontSize="14px">Planning</Tab>
                  <Tab fontSize="14px">Sales</Tab>
                </TabList>
              </Tabs>
            </Box>
          </Box>
        </DrawerHeader>

        {/* Scrollable Content */}
        <DrawerBody flex={1} overflowY="auto" p={6}>
          <Tabs index={activeTab} onChange={setActiveTab}>
            <TabPanels>
              <TabPanel p={0}>
                <Box>
                  {/* Ownership Section */}
                  <Accordion allowToggle>
                    <AccordionItem>
                      <AccordionButton textAlign="left">
                        <Flex align="center" gap={2} flex={1}>
                          <Users size={16} />
                          <Text fontSize="14px">Ownership</Text>
                        </Flex>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <Box>
                          {ownershipData.map((owner, index) => (
                            <Box key={index} border="1px solid" borderColor="gray.200" borderRadius="lg" p={4} mb={4}>
                              <Flex justify="space-between" align="center" mb={3}>
                                <Text fontWeight="semibold" fontSize="14px">{owner.name}</Text>
                                <Badge 
                                  bg={owner.type === 'Company' ? 'blue.600' : 'gray.200'} 
                                  color={owner.type === 'Company' ? 'white' : 'gray.700'} 
                                  fontSize="14px"
                                >
                                  {owner.type}
                                </Badge>
                              </Flex>
                              <Text fontSize="14px" color="gray.500" mb={3}>{owner.address}</Text>
                              <Box fontSize="14px" mb={3}>
                                <Text as="span" color="gray.500">Purchased: </Text>
                                <Text as="span">{owner.buyingDate}</Text>
                              </Box>
                              <Flex gap={2}>
                                {owner.type === 'Company' ? (
                                  <>
                                    <Button variant="outline" size="sm" fontSize="14px" leftIcon={<Search size={12} />}>
                                      Search for closures
                                    </Button>
                                    <Button variant="outline" size="sm" fontSize="14px" leftIcon={<Building2 size={12} />}>
                                      Company properties
                                    </Button>
                                  </>
                                ) : (
                                  <Button variant="outline" size="sm" fontSize="14px" leftIcon={<FileText size={12} />}>
                                    Download Title Register
                                  </Button>
                                )}
                              </Flex>
                            </Box>
                          ))}
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  <Divider my={6} />

                  {/* Use Class & Addresses Section */}
                  <Accordion allowToggle>
                    <AccordionItem>
                      <AccordionButton textAlign="left">
                        <Flex align="center" gap={2} flex={1}>
                          <Building size={16} />
                          <Text fontSize="14px">Use Class & Addresses</Text>
                        </Flex>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <Box>
                          <Table size="sm">
                            <Thead>
                              <Tr>
                                <Th fontSize="14px">Old Class</Th>
                                <Th fontSize="14px">New Class</Th>
                                <Th fontSize="14px">Description</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {useClassData.map((item, index) => (
                                <Tr key={index}>
                                  <Td fontSize="14px">{item.oldClass}</Td>
                                  <Td fontSize="14px">{item.newClass}</Td>
                                  <Td fontSize="14px">{item.description}</Td>
                                </Tr>
                              ))}
                            </Tbody>
                          </Table>
                          
                          <Box mt={4}>
                            <Text fontWeight="semibold" fontSize="14px" mb={2}>Addresses</Text>
                            {addressData.map((addr, index) => (
                              <Flex key={index} justify="space-between" align="center" fontSize="14px" mb={1}>
                                <Text>{addr.address}</Text>
                                <Text color="gray.500">{addr.uprn}</Text>
                              </Flex>
                            ))}
                          </Box>
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Box>
              </TabPanel>
              
              <TabPanel p={0}>
                <Box textAlign="center" py={8} color="gray.500">
                  <Text>Planning information coming soon...</Text>
                </Box>
              </TabPanel>
              
              <TabPanel p={0}>
                <Box textAlign="center" py={8} color="gray.500">
                  <Text>Sales information coming soon...</Text>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}