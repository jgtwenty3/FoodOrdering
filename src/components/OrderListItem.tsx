import { StyleSheet, Text, View, Image, Pressable, } from 'react-native';
import Colors from '../constants/Colors';
import { Order } from '../types';
import dayjs from 'dayjs';
import { Link, useSegments } from 'expo-router';
import relativeTime from 'dayjs/plugin/relativeTime';


dayjs.extend(relativeTime);
type OrderListItemProps = {
  order: Order;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();

  return (
    <Link href = {`/${segments[0]}/orders/${order.id}`} asChild>
    <Pressable style={styles.container}>
      <View>
      <Text style={styles.title}>{order.id}</Text>
      <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
      </View>
    
      
      <Text style={styles.status}>${order.status}</Text>

    </Pressable>
    </Link>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: '50%',
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  status: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
  time:{

  },
});