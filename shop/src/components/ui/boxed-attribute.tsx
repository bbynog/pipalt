import cn from 'classnames';

type AttributeProps = {
  title?: string;
  value?: string;
  active?: boolean;
  className?: string;
  color?: string;
  [key: string]: unknown;
};

const BoxedAttribute: React.FC<AttributeProps> = ({
  title,
  value,
  active,
  className,
  color,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex h-full cursor-pointer flex-col items-center justify-center rounded border border-gray-200 bg-gray-50 py-2 px-5 font-semibold text-body',
        {
          '!border-2 !border-accent !text-accent': active,
        },
      )}
      {...props}
    >
      <span>{title}</span>
      <span>{value}</span>
    </div>
  );
};

export default BoxedAttribute;
