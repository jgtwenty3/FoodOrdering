import { FlatList, ActivityIndicator,Text } from 'react-native';

import { useProductList } from '@/src/api/products';
import ProductListItem from '../../../components/ProductListItem';

export default function MenuScreen() {
  const {data: products, isLoading, error} = useProductList();

  if (isLoading){
    return <ActivityIndicator/>;
  }
  if (error){
   return  <Text>Failed to fetch Product</Text>
  }
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
