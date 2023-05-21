import { useMemo } from 'react';
import { getVariations } from './get-variations';
import { isVariationSelected } from './is-variation-selected';
import VariationGroups from './variation-groups';
import VariationPrice from './variation-price';
import isEqual from 'lodash/isEqual';
import { AttributesProvider, useAttributes } from './attributes.context';
import { useProductQuery } from '@/graphql/products.graphql';
import { AddToCart } from '@/components/cart/add-to-cart/add-to-cart';
import { useRouter } from 'next/router';

interface Props {
  product: any;
}

const Variation = ({ product }: Props) => {
  const { attributes } = useAttributes();
  const variations = useMemo(
    () => getVariations(product?.variations),
    [product?.variations],
  );
  const isSelected = isVariationSelected(variations, attributes);
  let selectedVariation: any = {};
  if (isSelected) {
    selectedVariation = product?.variation_options?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort(),
      ),
    );
  }
  return (
    <div className='w-[95vw] max-w-md rounded-md bg-white p-8'>
      <h3 className='mb-2 text-center text-2xl font-semibold text-heading'>
        {product?.name}
      </h3>
      <div className='mb-8 flex items-center justify-center'>
        <VariationPrice
          selectedVariation={selectedVariation}
          minPrice={product.min_price}
          maxPrice={product.max_price}
        />
      </div>
      <div className='mb-8'>
        <VariationGroups variations={variations} />
      </div>
      <AddToCart
        data={product}
        variant='big'
        variation={selectedVariation}
        disabled={selectedVariation?.is_disable || !isSelected}
      />
    </div>
  );
};

const ProductVariation = ({ productSlug }: { productSlug: string }) => {
  const { locale } = useRouter();
  const { data, loading } = useProductQuery({
    variables: {
      slug: productSlug,
      language: locale,
    },
  });
  if (loading || !data?.product) return <div>Loading</div>;
  return (
    <AttributesProvider>
      <Variation product={data?.product} />
    </AttributesProvider>
  );
};

export default ProductVariation;
