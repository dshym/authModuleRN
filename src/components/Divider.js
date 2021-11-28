import React from 'react';
import {View, Text} from 'react-native';

import {styles} from './DividerStyles';

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

export default Divider;
