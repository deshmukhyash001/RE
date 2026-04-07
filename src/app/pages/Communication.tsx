import { useState } from 'react';
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';
import { mockLeads } from '../data/mockData';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: 'agent' | 'customer';
  status?: 'sent' | 'delivered' | 'read';
}

const mockMessages: Message[] = [
  { id: '1', text: 'Hi! I saw your listing for Skyline Heights. Is the 2BHK still available?', timestamp: '10:30 AM', sender: 'customer', status: 'read' },
  { id: '2', text: 'Hello! Yes, we have several 2BHK units available. Would you like to schedule a site visit?', timestamp: '10:32 AM', sender: 'agent', status: 'read' },
  { id: '3', text: 'That would be great! What are the timings available?', timestamp: '10:35 AM', sender: 'customer', status: 'read' },
  { id: '4', text: 'We can arrange a visit this Saturday at 11 AM or Sunday at 3 PM. Which works better for you?', timestamp: '10:36 AM', sender: 'agent', status: 'read' },
  { id: '5', text: 'Saturday 11 AM works perfectly. Can you share the payment plan details?', timestamp: '10:40 AM', sender: 'customer', status: 'read' },
  { id: '6', text: 'Perfect! I\'m sharing the payment plan document now. You can pay 20% as booking amount and rest in easy installments.', timestamp: '10:42 AM', sender: 'agent', status: 'delivered' },
];

const quickReplies = [
  'Schedule a site visit',
  'Send project brochure',
  'Share payment plan',
  'Call me back in 30 mins',
  'Thank you for your interest',
];

export function Communication() {
  const [selectedLead, setSelectedLead] = useState(mockLeads[0]);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeads = mockLeads.filter(lead =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Handle send message logic
      setMessageText('');
    }
  };

  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl mb-2">Communication</h1>
        <p className="text-gray-600">WhatsApp-style lead communication</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-4 h-[calc(100vh-240px)] lg:h-[calc(100vh-200px)]">
        {/* Contacts List */}
        <Card className="lg:col-span-4 xl:col-span-3">
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <ScrollArea className="h-[calc(100vh-400px)] lg:h-[calc(100vh-320px)]">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`p-4 border-b border-gray-200 cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedLead.id === lead.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[var(--brand)] to-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium truncate">{lead.name}</p>
                        <span className="text-xs text-gray-500">{lead.lastActivity}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{lead.project}</p>
                      {lead.id === mockLeads[0].id && (
                        <Badge variant="secondary" className="mt-1 text-xs">2 unread</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-8 xl:col-span-9 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--brand)] to-purple-600 text-white rounded-full flex items-center justify-center">
                {selectedLead.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium">{selectedLead.name}</p>
                <p className="text-sm text-gray-500">{selectedLead.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.sender === 'agent'
                        ? 'bg-[var(--brand)] text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs ${
                        message.sender === 'agent' ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </span>
                      {message.sender === 'agent' && message.status && (
                        <span className="text-xs text-white/70">
                          {message.status === 'sent' && '✓'}
                          {message.status === 'delivered' && '✓✓'}
                          {message.status === 'read' && '✓✓ Read'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Quick Replies */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500 mb-2">Quick Replies:</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {quickReplies.map((reply, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs whitespace-nowrap bg-white"
                  onClick={() => setMessageText(reply)}
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                className="flex-1"
              />
              <Button variant="ghost" size="icon">
                <Smile className="w-5 h-5" />
              </Button>
              <Button 
                size="icon" 
                className="bg-[var(--brand)] hover:bg-[var(--brand)]/90"
                onClick={handleSendMessage}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
