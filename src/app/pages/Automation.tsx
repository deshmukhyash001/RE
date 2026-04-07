import { useState } from 'react';
import { Plus, Zap, Clock, Users, MessageSquare, Mail, Phone, Trash2, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  condition: string;
  action: string;
  enabled: boolean;
  executionCount: number;
}

const mockRules: AutomationRule[] = [
  {
    id: '1',
    name: 'Welcome New Leads',
    trigger: 'New Lead Created',
    condition: 'Source is Website',
    action: 'Send WhatsApp welcome message',
    enabled: true,
    executionCount: 142,
  },
  {
    id: '2',
    name: 'Follow-up Reminder',
    trigger: 'No Activity for 48 hours',
    condition: 'Status is Contacted',
    action: 'Assign to agent and send notification',
    enabled: true,
    executionCount: 89,
  },
  {
    id: '3',
    name: 'Site Visit Confirmation',
    trigger: 'Site Visit Scheduled',
    condition: 'Visit is within 24 hours',
    action: 'Send SMS reminder to lead',
    enabled: true,
    executionCount: 56,
  },
  {
    id: '4',
    name: 'High Budget Lead Alert',
    trigger: 'New Lead Created',
    condition: 'Budget > ₹1 Crore',
    action: 'Notify senior sales manager',
    enabled: false,
    executionCount: 12,
  },
];

export function Automation() {
  const [rules, setRules] = useState(mockRules);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl mb-2">Automation</h1>
          <p className="text-gray-600">Set up automated workflows to save time</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[var(--brand)] hover:bg-[var(--brand)]/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Automation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Automation Rule</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div>
                <Label>Rule Name</Label>
                <Input placeholder="e.g., Welcome New Leads" className="mt-2" />
              </div>

              <div>
                <Label>Trigger</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select trigger event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-lead">New Lead Created</SelectItem>
                    <SelectItem value="status-change">Lead Status Changed</SelectItem>
                    <SelectItem value="no-activity">No Activity for X hours</SelectItem>
                    <SelectItem value="site-visit">Site Visit Scheduled</SelectItem>
                    <SelectItem value="booking">Booking Created</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Condition (Optional)</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="source">Source</SelectItem>
                      <SelectItem value="budget">Budget</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="status">Status</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Value" />
                </div>
              </div>

              <div>
                <Label>Action</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whatsapp">Send WhatsApp Message</SelectItem>
                    <SelectItem value="sms">Send SMS</SelectItem>
                    <SelectItem value="email">Send Email</SelectItem>
                    <SelectItem value="assign">Assign to Agent</SelectItem>
                    <SelectItem value="notify">Send Notification</SelectItem>
                    <SelectItem value="status">Change Status</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Message Template (if applicable)</Label>
                <textarea
                  className="w-full mt-2 min-h-[100px] px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Hi {name}, thank you for your interest in {project}..."
                />
              </div>

              <div className="flex items-center gap-4 pt-4 border-t">
                <Button 
                  className="flex-1 bg-[var(--brand)] hover:bg-[var(--brand)]/90"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Create Automation
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-[var(--brand)]" />
              <div>
                <p className="text-2xl">{rules.length}</p>
                <p className="text-sm text-gray-600">Total Rules</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                ✓
              </div>
              <div>
                <p className="text-2xl">{rules.filter(r => r.enabled).length}</p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-2xl">299</p>
                <p className="text-sm text-gray-600">Executions Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl">85%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Automation Templates */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Popular Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-4">
            <Card className="border-2 border-dashed hover:border-[var(--brand)] cursor-pointer transition-colors">
              <CardContent className="p-4">
                <MessageSquare className="w-8 h-8 text-[var(--brand)] mb-3" />
                <h3 className="font-medium mb-2">Auto Follow-up</h3>
                <p className="text-sm text-gray-600">Automatically follow up with leads after no activity</p>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  Use Template
                </Button>
              </CardContent>
            </Card>
            <Card className="border-2 border-dashed hover:border-[var(--brand)] cursor-pointer transition-colors">
              <CardContent className="p-4">
                <Mail className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-medium mb-2">Welcome Series</h3>
                <p className="text-sm text-gray-600">Send welcome messages to new leads automatically</p>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  Use Template
                </Button>
              </CardContent>
            </Card>
            <Card className="border-2 border-dashed hover:border-[var(--brand)] cursor-pointer transition-colors">
              <CardContent className="p-4">
                <Phone className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-medium mb-2">Lead Assignment</h3>
                <p className="text-sm text-gray-600">Auto-assign leads based on territory or budget</p>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  Use Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Active Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Your Automation Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rules.map((rule) => (
              <Card key={rule.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <h3 className="font-medium">{rule.name}</h3>
                        <Badge variant={rule.enabled ? 'default' : 'secondary'} className={rule.enabled ? 'bg-green-500' : ''}>
                          {rule.enabled ? 'Active' : 'Inactive'}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {rule.executionCount} executions
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-[var(--brand)] flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-gray-500">Trigger:</span>{' '}
                            <span className="font-medium">{rule.trigger}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-4 h-4 flex-shrink-0 mt-0.5">⚡</div>
                          <div>
                            <span className="text-gray-500">Condition:</span>{' '}
                            <span className="font-medium">{rule.condition}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-4 h-4 flex-shrink-0 mt-0.5">✓</div>
                          <div>
                            <span className="text-gray-500">Action:</span>{' '}
                            <span className="font-medium">{rule.action}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <Switch
                        checked={rule.enabled}
                        onCheckedChange={() => toggleRule(rule.id)}
                      />
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
