import { useState } from 'react';
import { Search, Plus, FileText, Calendar, IndianRupee, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { mockBookings } from '../data/mockData';

const statusColors = {
  pending: 'bg-yellow-500',
  partial: 'bg-orange-500',
  completed: 'bg-green-500',
};

const statusLabels = {
  pending: 'Pending',
  partial: 'Partial Payment',
  completed: 'Completed',
};

export function Bookings() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = mockBookings.filter((booking) =>
    booking.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.unitNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.project.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl mb-2">Bookings</h1>
          <p className="text-gray-600">Manage bookings and payment tracking</p>
        </div>
        <Button className="bg-[var(--brand)] hover:bg-[var(--brand)]/90">
          <Plus className="w-4 h-4 mr-2" />
          New Booking
        </Button>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search bookings by customer, unit, or project..."
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
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-[var(--brand)]" />
              <div>
                <p className="text-2xl">{mockBookings.length}</p>
                <p className="text-sm text-gray-600">Total Bookings</p>
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
                <p className="text-2xl">{mockBookings.filter(b => b.status === 'completed').length}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                ⏳
              </div>
              <div>
                <p className="text-2xl">{mockBookings.filter(b => b.status === 'partial').length}</p>
                <p className="text-sm text-gray-600">Partial</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <IndianRupee className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl">₹5.8Cr</p>
                <p className="text-sm text-gray-600">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => {
          const totalAmountNum = parseFloat(booking.totalAmount.replace(/[₹,]/g, ''));
          const paidAmountNum = parseFloat(booking.paidAmount.replace(/[₹,]/g, ''));
          const paymentProgress = (paidAmountNum / totalAmountNum) * 100;

          return (
            <Card key={booking.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-lg font-medium">{booking.leadName}</h3>
                          <Badge className={`${statusColors[booking.status]} text-white`}>
                            {statusLabels[booking.status]}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                          <span className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            Unit {booking.unitNumber}
                          </span>
                          <span>•</span>
                          <span>{booking.project}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Booking Date</p>
                        <p className="text-sm font-medium">
                          {new Date(booking.bookingDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                        <p className="text-sm font-medium">{booking.totalAmount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Paid Amount</p>
                        <p className="text-sm font-medium text-green-600">{booking.paidAmount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Balance</p>
                        <p className="text-sm font-medium text-orange-600">
                          ₹{(totalAmountNum - paidAmountNum).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Payment Progress</span>
                        <span className="text-sm font-medium">{paymentProgress.toFixed(0)}%</span>
                      </div>
                      <Progress value={paymentProgress} className="h-2" />
                    </div>

                    {booking.nextPaymentDate && (
                      <div className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-orange-900">
                            Next Payment Due: {new Date(booking.nextPaymentDate).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                          <p className="text-sm text-orange-800 mt-1">
                            Amount: {booking.nextPaymentAmount}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex lg:flex-col gap-2">
                    <Button variant="outline" className="flex-1 lg:flex-none">
                      View Details
                    </Button>
                    <Button variant="outline" className="flex-1 lg:flex-none">
                      <IndianRupee className="w-4 h-4 mr-2" />
                      Record Payment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
