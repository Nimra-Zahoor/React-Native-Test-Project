import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 38,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  background: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
});

export default styles;
