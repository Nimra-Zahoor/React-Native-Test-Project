import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'blue',
  },
  text: {
    padding: 20,
    fontSize: 38,
    color: 'black',
    fontWeight: '500',
    
  },
  image:{
    width : 100,
    height:100,
    margin: 10,
  },
  background:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  }
});

export default styles;
