import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {Colors} from '../theme/colors';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default class MovieCard extends React.Component {
  render() {
    const {error, errorHandler, data, navigation, loading} = this.props;

    if (error) {
      return (
        <View style={styles.loader}>
          <Text style={styles.error_text}>{error}</Text>
          <Text onPress={errorHandler} style={styles.error_button}>
            Retry
          </Text>
        </View>
      );
    }

    if (loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator color={Colors.primaryBrand} />
        </View>
      );
    }

    return (
      <FlatList
        style={{margin: 5}}
        numColumns={2}
        data={data}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Details', {
                  id: item.id,
                });
              }}
              style={styles.card_view}>
              <Image
                style={styles.image}
                source={{uri: `${IMAGE_BASE_URL}${item.poster_path}`}}
              />
              <Text lineBreakMode="tail" numberOfLines={2} style={styles.text}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error_text: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: Colors.appRed,
  },
  error_button: {
    backgroundColor: Colors.appRed,
    paddingHorizontal: 24,
    paddingVertical: 8,
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: Colors.textPrimary,
    marginTop: 12,
    borderRadius: 4,
  },
  card_view: {
    flex: 1,
    marginVertical: 6,
    marginHorizontal: 6,
    elevation: 2,
    justifyContent: 'flex-start',
  },
  image: {
    height: 260,
    width: '100%',
    borderRadius: 2,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Lato-Bold',
    color: Colors.textSecondary2,
    marginTop: 4,
  },
});
