import { useEffect, useState, useCallback } from 'react';

import { getProductList } from '@/api/product';
import { useApiRequest } from '@/shared/hooks/useApiRequest';

import { PriceType, CategoryType } from '../constants/product';
import { Product } from '../types/Product';

export const useProductList = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [categorySelect, setCategorySelect] = useState<CategoryType>('ALL');
  const [priceSelect, setPriceSelect] = useState<PriceType>('asc');
  const { isLoading, handleRequest } = useApiRequest();

  const handleCategorySelect = (category: CategoryType) => {
    setCategorySelect(category);
  };

  const handlePriceSelect = (price: PriceType) => {
    setPriceSelect(price);
  };

  const fetchProductData = useCallback(async () => {
    try {
      const productData = handleRequest({
        apiCall: () =>
          getProductList({
            page: 0,
            size: 20,
            sort: `price,${priceSelect}`,
            category: categorySelect === 'ALL' ? '' : categorySelect,
          }),
        onSuccess: (data) => {
          setProduct(data);
          return data;
        },
        options: { delay: 2000 },
      });
      return productData;
    } catch (error) {
      return [];
    }
  }, [categorySelect, handleRequest, priceSelect]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  return {
    isLoading,
    product,
    categorySelect,
    priceSelect,
    handleCategorySelect,
    handlePriceSelect,
  };
};
