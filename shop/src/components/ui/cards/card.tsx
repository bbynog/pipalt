import cn from 'classnames';

const Card: React.FC<React.AllHTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn('rounded bg-light p-5 shadow md:p-8', className)}
      {...props}
    />
  );
};

export default Card;
