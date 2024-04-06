import{Text, FlatList, ActivityIndicator} from "react-native";
import OrderListItem from "@/src/components/OrderListItem";
import { useAdminOrderList } from "@/src/api/orders";
import { supabase } from "@/src/lib/supabase";
import { useEffect} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useInsertOrderSubscription } from "@/src/api/orders/subscriptions";

export default function OrdersScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });

  useInsertOrderSubscription();

  const queryClient = useQueryClient();

  useEffect(() => {
    const ordersSubscription = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          console.log('Change received!', payload);
          queryClient.invalidateQueries(['orders']);
          
        }
      )
      .subscribe();
    return () => {
      ordersSubscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}