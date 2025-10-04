import { useParams, useNavigate } from 'react-router-dom';
import { mockExpenses } from '@/lib/mockData';
import Navigation from '@/components/Navigation';
import StatusBadge from '@/components/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, DollarSign, FileText, Tag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const ExpenseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const expense = mockExpenses.find(e => e.id === id);

  if (!expense) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <p className="text-muted-foreground">Expense not found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{expense.description}</CardTitle>
                <p className="text-muted-foreground">Expense ID: {expense.id}</p>
              </div>
              <StatusBadge status={expense.status} />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
              <DollarSign className="h-8 w-8 text-primary" />
              <div>
                <p className="text-3xl font-bold text-foreground">
                  {expense.amount.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">{expense.currency}</p>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vendor</p>
                  <p className="text-foreground">{expense.vendor}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p className="text-foreground">{new Date(expense.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Tag className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                  <p className="text-foreground capitalize">{expense.category}</p>
                </div>
              </div>

              {expense.remarks && (
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Remarks</p>
                    <p className="text-foreground">{expense.remarks}</p>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              {expense.submittedAt && (
                <p className="text-sm text-muted-foreground">
                  Submitted: {new Date(expense.submittedAt).toLocaleString()}
                </p>
              )}
              {expense.approvedAt && (
                <p className="text-sm text-muted-foreground">
                  Approved: {new Date(expense.approvedAt).toLocaleString()}
                </p>
              )}
            </div>

            {expense.status === 'draft' && (
              <Button className="w-full" size="lg">
                Submit for Approval
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ExpenseDetail;
