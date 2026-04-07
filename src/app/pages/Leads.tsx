import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Filter, Plus, Phone, MessageSquare, Calendar, MoreVertical } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { mockLeads, leadStatusColors } from '../data/mockData';

const statusLabels = {
  new: 'New',
  contacted: 'Contacted',
  'site-visit': 'Site Visit',
  negotiation: 'Negotiation',
  booked: 'Booked',
  lost: 'Lost',
};

export function Leads() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
  });

  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl mb-2">Leads</h1>
          <p className="text-gray-600">Manage and track all your leads</p>
        </div>
        <Button className="bg-[var(--brand)] hover:bg-[var(--brand)]/90">
          <Plus className="w-4 h-4 mr-2" />
          Add New Lead
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search leads by name, phone, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="lg:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="site-visit">Site Visit</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="booked">Booked</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="lg:w-48">
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="Website">Website</SelectItem>
                <SelectItem value="Facebook Ads">Facebook Ads</SelectItem>
                <SelectItem value="99acres">99acres</SelectItem>
                <SelectItem value="Walk-in">Walk-in</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        {Object.entries(statusLabels).map(([status, label]) => {
          const count = mockLeads.filter(lead => lead.status === status).length;
          return (
            <Card key={status} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${leadStatusColors[status as keyof typeof leadStatusColors]}`} />
                  <span className="text-xs lg:text-sm text-gray-600">{label}</span>
                </div>
                <div className="text-xl lg:text-2xl">{count}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Leads List */}
      <div className="space-y-3">
        {filteredLeads.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No leads found matching your filters.</p>
            </CardContent>
          </Card>
        ) : (
          filteredLeads.map((lead) => (
            <Card key={lead.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <Link to={`/leads/${lead.id}`} className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[var(--brand)] to-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-medium">{lead.name}</h3>
                          <Badge className={`${leadStatusColors[lead.status]} text-white text-xs`}>
                            {statusLabels[lead.status]}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{lead.phone} • {lead.email}</p>
                          <p className="flex items-center gap-2 flex-wrap">
                            <span className="inline-flex items-center gap-1">
                              📍 {lead.project}
                            </span>
                            <span>•</span>
                            <span>💰 {lead.budget}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 ml-0 lg:ml-15">
                      <span>Source: {lead.source}</span>
                      <span>•</span>
                      <span>Agent: {lead.assignedAgent}</span>
                      <span>•</span>
                      <span>{lead.lastActivity}</span>
                    </div>
                  </Link>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Calendar className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                        <DropdownMenuItem>Assign Agent</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Lost</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete Lead</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
