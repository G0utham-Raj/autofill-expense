import { ExpenseStatus } from '@/types/expense';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, XCircle, FileText } from 'lucide-react';

interface StatusBadgeProps {
  status: ExpenseStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const configs = {
    draft: {
      label: 'Draft',
      icon: FileText,
      className: 'bg-muted text-muted-foreground',
    },
    pending: {
      label: 'Pending',
      icon: Clock,
      className: 'bg-warning/10 text-warning border-warning/20',
    },
    approved: {
      label: 'Approved',
      icon: CheckCircle,
      className: 'bg-success/10 text-success border-success/20',
    },
    rejected: {
      label: 'Rejected',
      icon: XCircle,
      className: 'bg-destructive/10 text-destructive border-destructive/20',
    },
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={config.className}>
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
