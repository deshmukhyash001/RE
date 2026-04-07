import { Link } from 'react-router';
import { 
  Users, 
  TrendingUp, 
  FileText, 
  IndianRupee,
  Phone,
  MessageSquare,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { mockLeads, mockAgents, leadStatusColors } from '../data/mockData';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const stats = [
  { label: 'Total Leads', value: '248', change: '+12%', trend: 'up', icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { label: 'Active Deals', value: '42', change: '+8%', trend: 'up', icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-50' },
  { label: 'Bookings', value: '18', change: '+15%', trend: 'up', icon: FileText, color: 'text-purple-600', bgColor: 'bg-purple-50' },
  { label: 'Revenue', value: '₹8.2Cr', change: '+22%', trend: 'up', icon: IndianRupee, color: 'text-orange-600', bgColor: 'bg-orange-50' },
];

const pipelineData = [
  { stage: 'New', count: 45, color: '#3b82f6' },
  { stage: 'Contacted', count: 68, color: '#8b5cf6' },
  { stage: 'Site Visit', count: 52, color: '#eab308' },
  { stage: 'Negotiation', count: 38, color: '#f97316' },
  { stage: 'Booked', count: 45, color: '#10b981' },
];

const monthlyData = [
  { month: 'Jan', leads: 45, bookings: 12 },
  { month: 'Feb', leads: 52, bookings: 15 },
  { month: 'Mar', leads: 48, bookings: 18 },
  { month: 'Apr', leads: 62, bookings: 14 },
];

const recentActivities = [
  { id: 1, type: 'call', lead: 'Rajesh Kumar', agent: 'Priya Sharma', time: '2 hours ago', project: 'Skyline Heights' },
  { id: 2, type: 'whatsapp', lead: 'Sneha Patel', agent: 'Amit Singh', time: '3 hours ago', project: 'Green Valley' },
  { id: 3, type: 'visit', lead: 'Arjun Reddy', agent: 'Kavita Nair', time: '5 hours ago', project: 'Urban Heights' },
  { id: 4, type: 'call', lead: 'Meera Desai', agent: 'Rohit Verma', time: '6 hours ago', project: 'Royal Plaza' },
];

export function Dashboard() {
  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className={`${stat.bgColor} ${stat.color} p-2 rounded-lg`}>
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-3 h-3 mr-1 inline text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 mr-1 inline text-red-600" />
                    )}
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-xl lg:text-2xl mb-1">{stat.value}</div>
                <div className="text-xs lg:text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Lead Pipeline */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Lead Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="stage" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {pipelineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/leads">
              <Button className="w-full justify-start bg-[var(--brand)] hover:bg-[var(--brand)]/90">
                <Users className="w-4 h-4 mr-2" />
                Add New Lead
              </Button>
            </Link>
            <Link to="/properties">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Site Visit
              </Button>
            </Link>
            <Link to="/communication">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Follow-up
              </Button>
            </Link>
            <Link to="/bookings">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Create Booking
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="leads" stroke="#6366f1" strokeWidth={2} />
                <Line type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#6366f1]" />
                <span className="text-sm text-gray-600">Leads</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#10b981]" />
                <span className="text-sm text-gray-600">Bookings</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activities</CardTitle>
            <Link to="/leads">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'call' ? 'bg-blue-50 text-blue-600' :
                    activity.type === 'whatsapp' ? 'bg-green-50 text-green-600' :
                    'bg-purple-50 text-purple-600'
                  }`}>
                    {activity.type === 'call' ? <Phone className="w-4 h-4" /> :
                     activity.type === 'whatsapp' ? <MessageSquare className="w-4 h-4" /> :
                     <Calendar className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.agent}</span> contacted{' '}
                      <span className="font-medium">{activity.lead}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.project}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Top Performing Agents</CardTitle>
          <Link to="/reports">
            <Button variant="ghost" size="sm">View Report</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAgents.slice(0, 4).map((agent, index) => (
              <div key={agent.id} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[var(--brand)] text-white flex items-center justify-center text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">{agent.name}</p>
                    <p className="text-sm text-gray-600">{agent.revenue}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{agent.leadsAssigned} leads</span>
                    <span>•</span>
                    <span>{agent.dealsWon} deals won</span>
                  </div>
                  <Progress 
                    value={(agent.dealsWon / agent.leadsAssigned) * 100} 
                    className="mt-2 h-2" 
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
