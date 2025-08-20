# BottomView (Action Sheet)

A theme-aware bottom sheet component built on top of `react-native-actions-sheet`. It follows the same UI patterns as the existing UI elements and supports a controlled API for showing/hiding, custom content, and actions.

## Quick Start

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { BottomView, Button, Text } from '@shared';

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Button title="Open" onPress={() => setOpen(true)} />

      <BottomView
        visible={open}
        onRequestClose={() => setOpen(false)}
        title="Start Wound"
        primaryAction={{ label: 'Update', onPress: () => setOpen(false) }}
        secondaryAction={{ label: 'Cancel', onPress: () => setOpen(false) }}
      >
        <Text>Upload the Image for Wound Detection estimation</Text>
      </BottomView>
    </View>
  );
}
```

## Props

- visible: boolean
- onRequestClose: () => void
- title?: string
- children?: React.ReactNode
- dismissOnOverlayPress?: boolean (default true)
- style?: StyleProp<ViewStyle>
- contentStyle?: StyleProp<ViewStyle>
- overlayStyle?: StyleProp<ViewStyle>
- showHandle?: boolean (default true)
- showClose?: boolean (default true)
- primaryAction?: { label: string; onPress: () => void; disabled?: boolean; style?: StyleProp<ViewStyle> }
- secondaryAction?: { label: string; onPress: () => void; disabled?: boolean; style?: StyleProp<ViewStyle> }
