import {StyleSheet, Dimensions} from 'react-native';

//use useWindowDimensions hook or addListener, for handling landscape mode
//not implemented due to task specifications (was not required)
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: 'black',
    fontSize: SCREEN_WIDTH / 12,
    fontWeight: '700',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: SCREEN_HEIGHT < 600 ? 20 : 50,
  },
  facebookButton: {
    width: '40%',
    alignItems: 'center',
    backgroundColor: '#3b5998',
    padding: 10,
    borderRadius: 5,
  },
  facebookText: {
    color: 'white',
  },
  googleButton: {
    width: '40%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d4d4d4',
    padding: 10,
    borderRadius: 5,
  },
  googleText: {
    color: '#595959',
  },
});
