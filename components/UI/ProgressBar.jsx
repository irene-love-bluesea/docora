    import * as React from 'react';
    import { ProgressBar, MD3Colors } from 'react-native-paper';

    const CustomProgressBar = ({value, color, width, multiplier = 1}) => (
  <ProgressBar progress={value * multiplier} color={color} style={{width: width}}/>
);

    export default CustomProgressBar;