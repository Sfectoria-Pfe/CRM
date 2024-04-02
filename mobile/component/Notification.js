import React ,{useEffect} from 'react';
import { View, Text } from 'react-native';
import { fetchChefs } from '../store/chefs';
import { useDispatch ,useSelector} from 'react-redux/dist/react-redux';
export default function Notification() {
  const dispatch = useDispatch();
    const chefs = useSelector(state => state?.chefsSlice?.chefs); // Utilisez chef au lieu de chefs
console.log(chefs,"chefs")
    useEffect(() => {
        dispatch(fetchChefs());
    }, [dispatch])
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Notification</Text>
    </View>
  );
}
