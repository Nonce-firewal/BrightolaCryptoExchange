import React from 'react';
import { RefreshCw } from 'lucide-react';
import AnimatedButton from './AnimatedButton';

interface RefreshButtonProps {
  onRefresh: () => void;
  loading?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
}

const RefreshButton: React.FC<RefreshButtonProps> = ({
  onRefresh,
  loading = false,
  className = '',
  size = 'sm',
  variant = 'secondary'
}) => {
  return (
    <AnimatedButton
      variant={variant}
      icon={RefreshCw}
      onClick={onRefresh}
      loading={loading}
      size={size}
      className={className}
    >
      Refresh
    </AnimatedButton>
  );
};

export default RefreshButton;