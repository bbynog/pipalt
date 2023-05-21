import cn from 'classnames';

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
  className,
  ...rest
}) => {
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
