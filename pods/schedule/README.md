# Schedule Pod

This pod provides all schedule-related screens and components for the SmartPlatform project. It is designed as a **self-contained, reusable module** that only imports UI components and utilities from the shared library.

---

## ✨ Features

- **Schedule Screen:** Main schedule view with calendar integration.
- **Week View:** Weekly schedule display and management.
- **Month View:** Monthly calendar view with event handling.
- **Custom Hooks:** Specialized hooks for schedule and month management.

---

## 📦 Folder Structure

```
pods/
└── schedule/
    ├── components/         # Reusable schedule components
    │   ├── monthView.tsx   # Monthly calendar view
    │   └── weekView.tsx    # Weekly schedule view
    ├── hooks/              # Custom hooks
    │   ├── useMonth.ts     # Month management logic
    │   └── useSchedule.ts  # Schedule management logic
    ├── screens/            # Schedule screens
    │   └── schedule.tsx    # Main schedule screen
    ├── meta.ts             # Pod metadata
    └── index.ts            # Pod exports (components, screens, etc.)
```

---

## 🔗 Demo

[View Demo of the Schedule Pod](#) (https://smartdatainc-my.sharepoint.com/:v:/g/personal/nandinisharma_smartdatainc_net/EdFOzalqp8ZCtLPrJOzC-p4BN6UzBd-ys48gBI0LPS8uAA?e=6hZXpi)

---

## 🧩 Usage

- The Schedule pod **only imports components from the shared UI library** (`shared/ui`) and does not depend on any other pods or app-level code.
- To use the Schedule pod, simply import its components or screens from `pods/schedule` in your application.

### Integration Example

```tsx
// In your TabNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScheduleScreen } from 'pods/schedule';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Schedule" 
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <CalendarIcon color={color} />
          )
        }}
      />
      {/* Other tab screens */}
    </Tab.Navigator>
  );
}
```

---

## 🤝 Contributing

- To contribute, generate a new branch with the naming convention:  
  `refactor/podname` (e.g., `refactor/schedule`)
- Commit your changes using the standard message format:  
  `refactor(PodName): <description>`  
  Example:  
  `refactor(Schedule): improve month view rendering`
- Ensure your code follows the existing structure and only imports from the shared UI library and generate the merge request.

---

## 🛠️ Maintained By

**SmartData**  
https://www.smartdatainc.com/

---

## 👩‍💻 Author

**Nandini Sharma**  
[www.linkedin.com/in/nandini-sharma-00404623a](https://www.linkedin.com/in/nandini-sharma-00404623a)

---