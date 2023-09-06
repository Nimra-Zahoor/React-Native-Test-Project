import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
   
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  error:{
    color:'red',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#7286D3',
    marginBottom: 40,
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

    backgroundColor: '#7286D3',
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
     backgroundColor:'red',
     flex: 1,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10, 
  },
  radioButton: {
    marginRight: 10, 
    color: 'grey',
  },
  radioContainer: {
   
    marginBottom: 10,
    borderBlockColor: 'grey',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    paddingHorizontal: 10, 
    color: 'grey',
  },
  uploadbutton:{
    borderWidth: 2,
    backgroundColor: '#B3B3B3',
    width: '90%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 25,
    color: '#7286D3',
    borderColor: '#7286D3', 
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    width: "100%",
  },
  dateButton:{
    flex: 1,
    borderRadius: 5,
    backgroundColor:'green',
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 40,
    marginVertical: 40,

    backgroundColor: '#7286D3',

  },
});

