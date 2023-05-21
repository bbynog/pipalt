const ValidationError = ({ message }: { message: string | undefined }) => {
  if (message) {
    return <p className='my-2 text-xs text-red-500 text-start'>{message}</p>;
  }
  return null;
};

export default ValidationError;
