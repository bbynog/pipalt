import usePrice from '@/lib/use-price';
import isEmpty from 'lodash/isEmpty';

export default function VariationPrice({
  selectedVariation,
  minPrice,
  maxPrice,
}: any) {
  const { price, basePrice } = usePrice(
    selectedVariation && {
      amount: Number(
        selectedVariation.sale_price
          ? selectedVariation.sale_price
          : selectedVariation.price,
      ),
      baseAmount: Number(selectedVariation.price),
    },
  );
  const { price: min_price } = usePrice({
    amount: Number(minPrice),
  });
  const { price: max_price } = usePrice({
    amount: Number(maxPrice),
  });
  return (
    <span className='flex items-center'>
      <ins className='text-2xl font-semibold text-accent no-underline md:text-3xl'>
        {!isEmpty(selectedVariation)
          ? `${price}`
          : `${min_price} - ${max_price}`}
      </ins>
      {basePrice && (
        <del className='text-sm font-normal text-muted ltr:ml-2 rtl:mr-2 md:text-base'>
          {basePrice}
        </del>
      )}
    </span>
  );
}
