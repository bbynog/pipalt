import classNames from 'classnames';

interface PhoneNumberProps {
  number: any;
  checked?: boolean;
}

const ContactCard: React.FC<PhoneNumberProps> = ({ checked, number }) => {
  return (
    <div
      className={classNames(
        'group relative h-full cursor-pointer rounded border p-4 hover:border-accent',
        {
          'border-accent bg-light shadow-sm': checked,
          'border-transparent bg-gray-100': !checked,
        },
      )}
    >
      <p className='text-sm font-semibold capitalize text-heading'>{number}</p>
    </div>
  );
};

export default ContactCard;
