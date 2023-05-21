import cn from 'classnames';
import { LabelHTMLAttributes } from 'react';

export interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

const Label: React.FC<Props> = ({ className = 'mb-3', ...rest }) => {
  return (
    <label
      className={cn(
        'mb-3 block text-sm font-semibold leading-none text-body-dark',
        className,
      )}
      {...rest}
    />
  );
};

export default Label;
