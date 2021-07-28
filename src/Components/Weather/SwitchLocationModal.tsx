import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Modal,
  ActivityIndicator,
  FlatList,
  Keyboard,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import debounce from 'lodash/debounce';
import Config from 'react-native-config';

import type { FunctionComponent } from 'react';

interface ComponentProps {
  isVisible: boolean;
  closeModal: () => void;
  geocode: (address: string) => any;
}

interface PlaceSuggestion {
  place_id: string;
  description: string;
}

const SwitchLocationModal: FunctionComponent<ComponentProps> = ({
  isVisible,
  closeModal,
  geocode,
}) => {
  const [text, changeText] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<PlaceSuggestion[]>([]);
  const [loading, setLoading] = React.useState(false);

  const makeRequest = debounce(async (val: string) => {
    const uri = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      val,
    )}&types=geocode&language=en&key=${Config.GOOGLE_MAPS_API_KEY}`;
    const response = await fetch(uri).then(resp => resp.json());
    if (response.status === 'OK') {
      setSuggestions(response.predictions);
      setLoading(false);
    }
  });

  const handleTextChange = (val: string) => {
    setLoading(true);
    changeText(val);
    makeRequest(val);
  };

  const setPlace = async (place: string) => {
    changeText(place);
    setSuggestions([]);
    Keyboard.dismiss();
    await geocode(place);
    changeText('');
  };

  const _renderItem = (item: { item: PlaceSuggestion }) => {
    return (
      <Pressable onPress={() => setPlace(item.item.description)}>
        <View style={styles.placeContainer}>
          <Text style={styles.place}>{item.item.description}</Text>
        </View>
      </Pressable>
    );
  };
  const _keyExtractor = (item: any) => item.place_id;
  const _itemSeperator = () => <View style={styles.seperator} />;

  return (
    <Modal visible={isVisible} onRequestClose={closeModal} style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Icon name="chevron-back-outline" size={25} color="whitesmoke" />
          <TextInput
            value={text}
            onChangeText={handleTextChange}
            placeholder="Search"
            placeholderTextColor="whitesmoke"
            style={styles.search}
          />
          <Icon name="mic" size={25} color="whitesmoke" />
        </View>
        {loading ? (
          <ActivityIndicator size="small" color="whitesmoke" />
        ) : (
          <FlatList
            keyExtractor={_keyExtractor}
            ItemSeparatorComponent={_itemSeperator}
            renderItem={_renderItem}
            data={suggestions}
            keyboardShouldPersistTaps="always"
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    backgroundColor: 'black',
    flex: 1,
  },
  modal: {},
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: '#535353',
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 5,
    borderRadius: 30,
  },
  search: {
    width: Dimensions.get('window').width * 0.8,
    color: 'whitesmoke',
    padding: 0,
    paddingLeft: 5,
    fontSize: 16,
  },
  seperator: {
    borderBottomColor: 'whitesmoke',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  places: {
    borderBottomColor: 'whitesmoke',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  placeContainer: {
    margin: 5,
  },
  place: { color: 'whitesmoke' },
});

export default SwitchLocationModal;
