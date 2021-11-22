import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Divider = props => {
  return (
    <View style={styles.divider}>
      <View style={styles.dividerLine} />
      <View>
        <Text style={styles.dividerText}>{props.children}</Text>
      </View>
      <View style={styles.dividerLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dividerLine: {
    width: '20%',
    height: 1,
    backgroundColor: '#d4d4d4',
  },
  dividerText: {
    width: 50,
    textAlign: 'center',
  },
});

export default Divider;
