import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
   
    width: '80%', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7C9D96',
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {

    backgroundColor: '#116A7B',
    width: '90%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText:{
    color:'grey',
    marginBottom:90,

  },
  register :{
    color:'#116A7B',

  },
  radioContainer: {
    width:'100%',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10, 
  },
  radioButton: {
    marginRight: 10, 
  },
});

export default styles;
