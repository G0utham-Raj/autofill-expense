import { useState } from 'react';
import { mockExpenses } from '@/lib/mockData';
import StatsCard from '@/components/StatsCard';
import ExpenseCard from '@/components/ExpenseCard';
import Navigation from '@/components/Navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Clock, CheckCircle, DollarSign } from 'lucide-react';
import { ExpenseStatus } from '@/types/expense';

const Dashboard = () => {
  const [statusFilter, setStatusFilter] = useState<ExpenseStatus | 'all'>('all');

  const filteredExpenses = statusFilter === 'all' 
    ? mockExpenses 
    : mockExpenses.filter(e => e.status === statusFilter);

  const draftCount = mockExpenses.filter(e => e.status === 'draft').length;
  const pendingCount = mockExpenses.filter(e => e.status === 'pending').length;
  const approvedCount = mockExpenses.filter(e => e.status === 'approved').length;
  const totalAmount = mockExpenses
    .filter(e => e.status === 'approved')
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
          <p className="text-muted-foreground">Track and manage your expenses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="To Submit"
            value={draftCount}
            icon={FileText}
            description="Draft expenses"
          />
          <StatsCard
            title="Waiting Approval"
            value={pendingCount}
            icon={Clock}
            description="Pending review"
          />
          <StatsCard
            title="Approved"
            value={approvedCount}
            icon={CheckCircle}
            description="This month"
          />
          <StatsCard
            title="Total Approved"
            value={`$${totalAmount.toFixed(2)}`}
            icon={DollarSign}
            description="This month"
          />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">All Expenses</h3>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ExpenseStatus | 'all')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Expenses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredExpenses.map((expense) => (
            <ExpenseCard key={expense.id} expense={expense} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
