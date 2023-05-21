interface Props {
  message: string | undefined;
}

const ValidationError = ({ message }: Props) => {
  return (
    <p className='my-2 text-sm text-red-500 ltr:text-left rtl:text-right'>
      {message}
    </p>
  );
};

export default ValidationError;
