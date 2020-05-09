import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Dimensions,
} from 'react-native';

import {Colors} from '../theme/colors';
import {getMovieDetails} from '../../service/apis';

const {height} = Dimensions.get('screen');

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_MOVIE_PRODUCER_POSTER =
  'https://w0.pngwave.com/png/548/247/computer-icons-film-motorcycle-reel-movie-logo-s-png-clip-art.png';

class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
    };
  }

  async componentDidMount() {
    const {id} = this.props.route.params;
    try {
      let data = await getMovieDetails(id);
      this.setState({
        data: data,
      });
    } catch (e) {}
    this.setState({
      loading: false,
    });
  }

  render() {
    const {loading, data} = this.state;

    if (loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator color={Colors.primaryBrand} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ImageBackground
          source={{uri: `${IMAGE_BASE_URL}${data.backdrop_path}`}}
          style={{
            height: height / 3,
          }}>
          <View style={styles.overlay} />
          <View style={styles.poster_view}>
            <View
              style={{
                flex: 2,
              }}>
              <Image
                style={styles.poster_image}
                source={{uri: `${IMAGE_BASE_URL}${data.poster_path}`}}
              />
            </View>
            <View style={styles.poster_details_view}>
              <Text
                lineBreakMode="tail"
                numberOfLines={2}
                style={styles.movie_title}>
                {data.title}
              </Text>
              <Text
                lineBreakMode="tail"
                numberOfLines={2}
                style={styles.movie_date}>
                {data.release_date.split('-').reverse().join('/')}
              </Text>
              <Text
                lineBreakMode="tail"
                numberOfLines={2}
                style={styles.movie_genres}>
                {data.genres.map((x) => x.name).join()}
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.details_view}>
          <Text style={styles.tag_line}>{data.tagline}</Text>
          <Text style={styles.overview}>{data.overview}</Text>
          <Text style={styles.produced_by}>Produced By</Text>
          <FlatList
            style={{}}
            numColumns={2}
            data={data.production_companies}
            keyExtractor={(item, index) => item.id}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View style={styles.producer_view}>
                  <Image
                    style={styles.producer_image}
                    source={{
                      uri: item.logo_path
                        ? `${IMAGE_BASE_URL}${item.logo_path}`
                        : DEFAULT_MOVIE_PRODUCER_POSTER,
                    }}
                  />
                  <Text style={styles.producer_name}>{item.name}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Colors.backgroundColor,
    opacity: 0.8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  poster_view: {
    flexDirection: 'row',
    margin: 12,
  },
  poster_image: {
    width: '100%',
    height: 200,
    borderRadius: 4,
  },
  poster_details_view: {
    flex: 3,
    marginHorizontal: 8,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  movie_title: {
    fontSize: 22,
    fontFamily: 'Lato-Bold',
    color: Colors.textPrimary,
  },
  movie_date: {
    fontSize: 14,
    fontFamily: 'Lato-Bold',
    color: Colors.textSecondary,
    marginTop: 4,
  },
  movie_genres: {
    fontSize: 14,
    fontFamily: 'Lato-Bold',
    color: Colors.textSecondary,
    marginTop: 4,
  },

  details_view: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tag_line: {
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    color: Colors.textSecondary2,
  },
  overview: {
    fontSize: 14,
    fontFamily: 'Lato-Bold',
    color: Colors.textSecondary,
    marginTop: 4,
  },
  produced_by: {
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    color: Colors.textSecondary2,
    marginTop: 12,
  },
  producer_view: {
    flex: 1,
    marginVertical: 6,
    marginHorizontal: 6,
    elevation: 2,
  },
  producer_image: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  producer_name: {
    fontSize: 14,
    fontFamily: 'Lato-Bold',
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
