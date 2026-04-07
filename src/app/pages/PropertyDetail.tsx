import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, MapPin, Building2, Layers, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { mockProperties, mockUnits, unitStatusColors } from '../data/mockData';

const statusLabels = {
  available: 'Available',
  blocked: 'Blocked',
  booked: 'Booked',
  sold: 'Sold',
};

export function PropertyDetail() {
  const { id } = useParams();
  const property = mockProperties.find(p => p.id === id);
  const [selectedTower, setSelectedTower] = useState('A');
  const [searchQuery, setSearchQuery] = useState('');

  if (!property) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">Property not found</p>
            <Link to="/properties">
              <Button className="mt-4">Back to Properties</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredUnits = mockUnits.filter(unit => 
    unit.tower === selectedTower &&
    (unit.unitNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
     unit.bhk.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8">
      {/* Header */}
      <div className="mb-6">
        <Link to="/properties">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Button>
        </Link>
      </div>

      {/* Property Overview */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <div className="aspect-video relative overflow-hidden">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl lg:text-3xl mb-2">{property.name}</h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>
              </div>
              <Badge>{property.type}</Badge>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-500 mb-1">Towers</p>
                <p className="text-xl">{property.towers}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Units</p>
                <p className="text-xl">{property.totalUnits}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Available</p>
                <p className="text-xl text-green-600">{property.availableUnits}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Price Range</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl text-[var(--brand)]">{property.priceRange}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Unit Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(statusLabels).map(([status, label]) => {
                const count = mockUnits.filter(unit => unit.status === status).length;
                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${unitStatusColors[status as keyof typeof unitStatusColors]}`} />
                      <span className="text-sm">{label}</span>
                    </div>
                    <span className="font-medium">{count}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Units */}
      <Card>
        <CardHeader>
          <CardTitle>Unit Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="A" onValueChange={setSelectedTower}>
            <TabsList className="mb-6">
              <TabsTrigger value="A">Tower A</TabsTrigger>
              <TabsTrigger value="B">Tower B</TabsTrigger>
              <TabsTrigger value="C">Tower C</TabsTrigger>
            </TabsList>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by unit number or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <TabsContent value={selectedTower}>
              {/* Unit Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUnits.map((unit) => (
                  <Card key={unit.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-lg font-medium">{unit.unitNumber}</p>
                          <p className="text-sm text-gray-500">Floor {unit.floor}</p>
                        </div>
                        <Badge className={`${unitStatusColors[unit.status]} text-white`}>
                          {statusLabels[unit.status]}
                        </Badge>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Type</span>
                          <span className="font-medium">{unit.bhk}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Area</span>
                          <span className="font-medium">{unit.area}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Price</span>
                          <span className="font-medium text-[var(--brand)]">{unit.price}</span>
                        </div>
                      </div>
                      <Button 
                        variant={unit.status === 'available' ? 'default' : 'outline'} 
                        className={`w-full ${unit.status === 'available' ? 'bg-[var(--brand)] hover:bg-[var(--brand)]/90' : ''}`}
                        disabled={unit.status === 'sold'}
                      >
                        {unit.status === 'available' && 'Book Now'}
                        {unit.status === 'blocked' && 'View Details'}
                        {unit.status === 'booked' && 'View Booking'}
                        {unit.status === 'sold' && 'Sold Out'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredUnits.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No units found in Tower {selectedTower}</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Visual Grid */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg mb-4">Floor Plan View - Tower {selectedTower}</h3>
            <div className="grid grid-cols-6 lg:grid-cols-10 gap-2">
              {mockUnits.filter(u => u.tower === selectedTower).map((unit) => (
                <div
                  key={unit.id}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs text-white font-medium cursor-pointer hover:opacity-80 transition-opacity ${unitStatusColors[unit.status]}`}
                  title={`${unit.unitNumber} - ${statusLabels[unit.status]}`}
                >
                  {unit.unitNumber.split('-')[1]}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-6 justify-center">
              {Object.entries(statusLabels).map(([status, label]) => (
                <div key={status} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${unitStatusColors[status as keyof typeof unitStatusColors]}`} />
                  <span className="text-sm text-gray-600">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
