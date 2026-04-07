import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Plus, Building2, MapPin, Home } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { mockProperties } from '../data/mockData';

export function Properties() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = mockProperties.filter((property) =>
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl mb-2">Properties</h1>
          <p className="text-gray-600">Manage your property inventory</p>
        </div>
        <Button className="bg-[var(--brand)] hover:bg-[var(--brand)]/90">
          <Plus className="w-4 h-4 mr-2" />
          Add New Property
        </Button>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search properties by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="w-8 h-8 text-[var(--brand)]" />
              <div>
                <p className="text-2xl">{mockProperties.length}</p>
                <p className="text-sm text-gray-600">Total Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Home className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl">{mockProperties.reduce((sum, p) => sum + p.totalUnits, 0)}</p>
                <p className="text-sm text-gray-600">Total Units</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                ✓
              </div>
              <div>
                <p className="text-2xl">{mockProperties.reduce((sum, p) => sum + p.availableUnits, 0)}</p>
                <p className="text-sm text-gray-600">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                ₹
              </div>
              <div>
                <p className="text-2xl">{mockProperties.reduce((sum, p) => sum + (p.totalUnits - p.availableUnits), 0)}</p>
                <p className="text-sm text-gray-600">Sold/Booked</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Properties Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredProperties.map((property) => {
          const soldPercentage = ((property.totalUnits - property.availableUnits) / property.totalUnits) * 100;
          
          return (
            <Link key={property.id} to={`/properties/${property.id}`}>
              <Card className="hover:shadow-lg transition-shadow overflow-hidden h-full">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-white text-gray-900">
                    {property.type}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl mb-2">{property.name}</h3>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Price Range</p>
                      <p className="font-medium text-[var(--brand)]">{property.priceRange}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Towers</p>
                      <p className="font-medium">{property.towers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Units</p>
                      <p className="font-medium">{property.totalUnits}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Available</p>
                      <p className="font-medium text-green-600">{property.availableUnits}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Occupancy</span>
                      <span className="text-sm font-medium">{soldPercentage.toFixed(0)}%</span>
                    </div>
                    <Progress value={soldPercentage} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
