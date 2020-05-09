import React from 'react';
import {View, StyleSheet} from 'react-native';

import {getUpcomingMovies} from '../../service/apis';
import MovieCard from '../components/movieCard';

class UpcomingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      results: [],
    };
  }

  fetchMovies = async () => {
    this.setState({
      loading: true,
    });
    try {
      let data = await getUpcomingMovies();
      this.setState({
        results: data.results,
      });
    } catch (e) {
      this.setState({
        error: e.message,
      });
    }
    this.setState({
      loading: false,
    });
  };

  componentDidMount() {
    this.fetchMovies();
  }

  render() {
    const {loading, results, error} = this.state;

    return (
      <View style={styles.container}>
        <MovieCard
          error={error}
          errorHandler={this.fetchMovies}
          loading={loading}
          data={results}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

export default UpcomingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
