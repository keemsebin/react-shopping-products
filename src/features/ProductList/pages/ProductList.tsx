import { css } from '@emotion/react';

import { AppLayout } from '@/shared/components/AppLayout';
import { Flex } from '@/shared/components/Flex';
import { Header } from '@/shared/components/Header';
import { Loading } from '@/shared/components/Loading';
import { Text } from '@/shared/components/Text';

import { Select } from '../../../shared/components/Select/index';
import { ProductItem } from '../components/ProductItem';
import { ShoppingBag } from '../components/ShoppingBag';
import { CATEGORY, CategoryType, PRICE, PriceType } from '../constants/product';
import { ProductListContainer } from '../container/ProductListContainer';
import { useShopping } from '../hooks/useShopping';

export const ProductListPage = () => {
  const {
    cartData,
    filteredData,
    isLoading,
    toggleCartItem,
    categorySelect,
    priceSelect,
    handleCategorySelect,
    handlePriceSelect,
  } = useShopping();

  return (
    <>
      <AppLayout>
        <Header
          left={
            <Text
              type="Heading"
              weight="semibold"
              color="white"
              css={css`
                cursor: pointer;
              `}
            >
              SHOP
            </Text>
          }
          right={<ShoppingBag count={cartData.length} />}
        />
        <Flex
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          gap="0px"
          width="100%"
        >
          <Text
            type="Heading"
            css={css`
              padding: 15px 25px 10px 25px;
            `}
          >
            상품목록
          </Text>

          <Flex
            width="100%"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap="0px"
            padding="10px 25px"
          >
            <Select maxWidth={110} selectedOptions={CATEGORY[categorySelect]}>
              {Object.entries(CATEGORY).map(([key, value], idx) => (
                <Select.Option
                  key={idx}
                  option={value}
                  onSelectOption={() => handleCategorySelect(key as CategoryType)}
                >
                  {key}
                </Select.Option>
              ))}
            </Select>
            <Select maxWidth={125} selectedOptions={PRICE[priceSelect]}>
              {Object.entries(PRICE).map(([key, value], idx) => (
                <Select.Option
                  key={idx}
                  option={value}
                  onSelectOption={() => handlePriceSelect(key as PriceType)}
                >
                  {key}
                </Select.Option>
              ))}
            </Select>
          </Flex>
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            gap="0px"
            css={css`
              flex: 1;
            `}
          >
            {isLoading ? (
              <Flex
                direction="column"
                gap="0px"
                justifyContent="center"
                alignItems="center"
                css={css`
                  width: 100%;
                  height: 600px;
                `}
              >
                <Loading size="xl" />
              </Flex>
            ) : filteredData.length > 0 ? (
              <ProductListContainer>
                {filteredData.map((item) => (
                  <ProductItem
                    key={item.id}
                    isChecked={item.isChecked}
                    name={item.name}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    onCartUpdate={() => toggleCartItem(item.id)}
                  />
                ))}
              </ProductListContainer>
            ) : (
              <Text
                type="Body"
                css={css`
                  padding: 20px;
                  justify-self: center;
                  align-self: center;
                `}
              >
                데이터가 존재하지 않습니다.
              </Text>
            )}
          </Flex>
        </Flex>
      </AppLayout>
    </>
  );
};
