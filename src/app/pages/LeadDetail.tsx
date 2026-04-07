import { useParams, Link } from 'react-router';
import { ArrowLeft, Phone, MessageSquare, Mail, Calendar, MapPin, DollarSign, User, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { mockLeads, leadStatusColors } from '../data/mockData';

const statusLabels = {
  new: 'New',
  contacted: 'Contacted',
  'site-visit': 'Site Visit',
  negotiation: 'Negotiation',
  booked: 'Booked',
  lost: 'Lost',
};

const activityIcons = {
  call: Phone,
  whatsapp: MessageSquare,
  email: Mail,
  visit: Calendar,
  note: Clock,
};

export function LeadDetail() {
  const { id } = useParams();
  const lead = mockLeads.find(l => l.id === id);

  if (!lead) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">Lead not found</p>
            <Link to="/leads">
              <Button className="mt-4">Back to Leads</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8">
      {/* Header */}
      <div className="mb-6">
        <Link to="/leads">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Leads
          </Button>
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[var(--brand)] to-purple-600 text-white rounded-full flex items-center justify-center text-xl">
              {lead.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-2xl lg:text-3xl">{lead.name}</h1>
                <Badge className={`${leadStatusColors[lead.status]} text-white`}>
                  {statusLabels[lead.status]}
                </Badge>
              </div>
              <p className="text-gray-600">Lead ID: #{lead.id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <MessageSquare className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Mail className="w-4 h-4" />
            </Button>
            <Button className="bg-[var(--brand)] hover:bg-[var(--brand)]/90">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Visit
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  {lead.activities.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No activities yet</p>
                  ) : (
                    <div className="space-y-6">
                      {lead.activities.map((activity, index) => {
                        const Icon = activityIcons[activity.type];
                        return (
                          <div key={activity.id} className="flex gap-4">
                            <div className="relative">
                              <div className={`p-3 rounded-lg ${
                                activity.type === 'call' ? 'bg-blue-50 text-blue-600' :
                                activity.type === 'whatsapp' ? 'bg-green-50 text-green-600' :
                                activity.type === 'email' ? 'bg-purple-50 text-purple-600' :
                                activity.type === 'visit' ? 'bg-orange-50 text-orange-600' :
                                'bg-gray-50 text-gray-600'
                              }`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              {index < lead.activities.length - 1 && (
                                <div className="absolute left-1/2 top-12 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />
                              )}
                            </div>
                            <div className="flex-1 pb-6">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <p className="font-medium capitalize">{activity.type}</p>
                                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 text-sm text-gray-500 mt-2">
                                <span>{activity.agentName}</span>
                                <span>•</span>
                                <span>{activity.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lead Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Full Name</p>
                    <p className="font-medium">{lead.name}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                    <p className="font-medium">{lead.phone}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email Address</p>
                    <p className="font-medium">{lead.email}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Lead Source</p>
                    <Badge variant="secondary">{lead.source}</Badge>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Interested Project</p>
                    <p className="font-medium">{lead.project}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Budget Range</p>
                    <p className="font-medium">{lead.budget}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Created Date</p>
                    <p className="font-medium">{new Date(lead.createdAt).toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Internal Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-sm mb-2">Very interested in 3BHK units with east facing. Prefers ground floor.</p>
                      <p className="text-xs text-gray-500">Added by Priya Sharma • 2 days ago</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm mb-2">Budget can be stretched to ₹52L for the right unit. Home loan pre-approved.</p>
                      <p className="text-xs text-gray-500">Added by Priya Sharma • 4 days ago</p>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Note
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start bg-[var(--brand)] hover:bg-[var(--brand)]/90">
                <Phone className="w-4 h-4 mr-2" />
                Call Lead
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send WhatsApp
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Site Visit
              </Button>
            </CardContent>
          </Card>

          {/* Assigned Agent */}
          <Card>
            <CardHeader>
              <CardTitle>Assigned Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[var(--brand)] text-white rounded-full flex items-center justify-center">
                  PS
                </div>
                <div className="flex-1">
                  <p className="font-medium">{lead.assignedAgent}</p>
                  <p className="text-sm text-gray-500">Senior Sales Agent</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Change Agent
              </Button>
            </CardContent>
          </Card>

          {/* Lead Status */}
          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(statusLabels).map(([status, label]) => (
                <Button
                  key={status}
                  variant={lead.status === status ? "default" : "outline"}
                  className={`w-full justify-start ${
                    lead.status === status ? 'bg-[var(--brand)] hover:bg-[var(--brand)]/90' : ''
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full mr-2 ${leadStatusColors[status as keyof typeof leadStatusColors]}`} />
                  {label}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}
