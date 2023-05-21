export const EmptyInbox: React.FC<React.SVGAttributes<{}>> = ({
  width = 75,
  height = 56,
  ...props
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      {...props}
      fill='none'
    >
      <path
        fill='#fff'
        stroke='#DFDFDF'
        d='m57.344 2.277.022.035.028.032 16.108 18.261V34.7H.902V20.607L17.011 2.342l.027-.031.023-.036C17.777 1.121 18.776.5 19.75.5h34.903c.975 0 1.972.62 2.69 1.777Z'
      />
      <path
        fill='#F1F1F1'
        stroke='#DFDFDF'
        d='M53.083 25.49c0-1.185.368-2.249.94-3.006.573-.757 1.328-1.184 2.123-1.184h17.356v28.519c0 1.598-.497 3.035-1.28 4.061-.781 1.026-1.825 1.62-2.94 1.62H5.122c-1.114 0-2.158-.594-2.94-1.62-.782-1.027-1.28-2.464-1.28-4.061v-28.52h17.356c.796 0 1.55.426 2.123 1.182.573.756.94 1.82.94 3.004v.035c0 2.716 1.72 5.141 4.08 5.141h23.603c1.174 0 2.204-.624 2.925-1.562.721-.939 1.154-2.213 1.154-3.598v-.012Z'
      />
    </svg>
  );
};
