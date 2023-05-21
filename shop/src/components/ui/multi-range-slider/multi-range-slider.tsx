import React, { useCallback, useEffect, useState, useRef } from 'react';
import classnames from 'classnames';

type Props = {
  min: number;
  max: number;
  onChange: (value: { min: number; max: number }) => void;
};

const MultiRangeSlider: React.FC<Props> = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className='relative w-full'>
      <div className='relative w-full py-3'>
        <input
          type='range'
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            event.target.value = value.toString();
          }}
          className={classnames(
            'thumb absolute z-[3] h-0 w-full outline-none',
            {
              'z-[5]': minVal > max - 100,
            },
          )}
        />
        <input
          type='range'
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={(event) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            event.target.value = value.toString();
          }}
          className='thumb absolute z-[4] h-0 w-full outline-none'
        />
        <div className='relative w-full'>
          <div className='track absolute z-[1] h-1 w-full rounded bg-gray-200' />
          <div
            ref={range}
            className='range absolute z-[2] h-1 rounded bg-accent'
          />
        </div>
      </div>

      <div className='mt-4 grid grid-cols-2 gap-3'>
        <div className='flex flex-col items-start rounded border border-gray-200 p-2'>
          <label className='text-sm font-semibold text-gray-400'>Min</label>
          <span className='text-sm font-bold text-heading'>{minVal}</span>
        </div>
        <div className='flex flex-col items-end rounded border border-gray-200 p-2'>
          <label className='text-sm font-semibold text-gray-400'>Max</label>
          <span className='text-sm font-bold text-heading'>{maxVal}</span>
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
