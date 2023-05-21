interface Props {
  title: string;
}

const BadgeGroups = ({ title, children }: React.PropsWithChildren<Props>) => {
  return (
    <div className='flex w-full flex-col items-start'>
      <span className='pb-3 text-sm font-semibold capitalize text-heading'>
        {title}
      </span>
      <div className='flex flex-row flex-wrap'>{children}</div>
    </div>
  );
};

export default BadgeGroups;
