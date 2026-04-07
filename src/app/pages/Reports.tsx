import { TrendingUp, Users, IndianRupee, Target, Award, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Progress } from '../components/ui/progress';
import { mockAgents } from '../data/mockData';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

const conversionData = [
  { month: 'Jan', leads: 85, converted: 18, rate: 21 },
  { month: 'Feb', leads: 92, converted: 22, rate: 24 },
  { month: 'Mar', leads: 78, converted: 19, rate: 24 },
  { month: 'Apr', leads: 105, converted: 28, rate: 27 },
];

const sourceData = [
  { name: 'Website', value: 35, color: '#6366f1' },
  { name: 'Facebook Ads', value: 25, color: '#8b5cf6' },
  { name: '99acres', value: 20, color: '#ec4899' },
  { name: 'Walk-in', value: 12, color: '#f97316' },
  { name: 'Referral', value: 8, color: '#10b981' },
];

const revenueData = [
  { month: 'Jan', revenue: 2.4, target: 3.0 },
  { month: 'Feb', revenue: 2.8, target: 3.0 },
  { month: 'Mar', revenue: 3.2, target: 3.5 },
  { month: 'Apr', revenue: 3.8, target: 4.0 },
];

const agentPerformance = mockAgents.map(agent => ({
  name: agent.name.split(' ')[0],
  leads: agent.leadsAssigned,
  deals: agent.dealsWon,
  conversion: ((agent.dealsWon / agent.leadsAssigned) * 100).toFixed(0),
}));

export function Reports() {
  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">Track performance and insights</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Custom Range
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl">27%</p>
              </div>
            </div>
            <Badge className="bg-green-500 text-white">↑ 12% vs last month</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. Response Time</p>
                <p className="text-2xl">2.4h</p>
              </div>
            </div>
            <Badge className="bg-green-500 text-white">↓ 18% improvement</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                <IndianRupee className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. Deal Value</p>
                <p className="text-2xl">₹58L</p>
              </div>
            </div>
            <Badge className="bg-green-500 text-white">↑ 8% vs last month</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Target Achievement</p>
                <p className="text-2xl">95%</p>
              </div>
            </div>
            <Badge className="bg-orange-500 text-white">₹3.8Cr / ₹4.0Cr</Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="leads" fill="#6366f1" name="Total Leads" />
                <Bar dataKey="converted" fill="#10b981" name="Converted" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Sources Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {sourceData.map((source) => (
                <div key={source.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                  <span className="text-sm text-gray-600">{source.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue vs Target */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Revenue vs Target (in Crores)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Actual Revenue" />
              <Line type="monotone" dataKey="target" stroke="#f97316" strokeWidth={3} strokeDasharray="5 5" name="Target" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Agent Performance */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Agent Performance Comparison</CardTitle>
          <Button variant="outline" size="sm">View Details</Button>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={agentPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="leads" fill="#6366f1" name="Leads Assigned" />
              <Bar dataKey="deals" fill="#10b981" name="Deals Won" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Agent Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Agent Leaderboard - This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAgents.map((agent, index) => {
              const conversionRate = ((agent.dealsWon / agent.leadsAssigned) * 100).toFixed(0);
              return (
                <div key={agent.id} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-orange-600' :
                    'bg-gray-300'
                  }`}>
                    {index === 0 ? '🏆' :
                     index === 1 ? '🥈' :
                     index === 2 ? '🥉' :
                     index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-sm text-gray-600">{agent.dealsWon} deals won</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-[var(--brand)]">{agent.revenue}</p>
                        <p className="text-sm text-gray-600">{conversionRate}% conversion</p>
                      </div>
                    </div>
                    <Progress value={parseInt(conversionRate)} className="h-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
