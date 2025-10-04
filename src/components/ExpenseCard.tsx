import { Expense } from '@/types/expense';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from './StatusBadge';
import { Calendar, MapPin, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ExpenseCardProps {
  expense: Expense;
}

const ExpenseCard = ({ expense }: ExpenseCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">{expense.description}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {expense.vendor}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(expense.date).toLocaleDateString()}
              </span>
            </div>
          </div>
          <StatusBadge status={expense.status} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold text-foreground">
              {expense.amount.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground">{expense.currency}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/expense/${expense.id}`)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;
