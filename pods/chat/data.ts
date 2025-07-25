export const data = [
  {
    id: 1,
    name: 'John Doe',
    message: 'Hey, how are you doing? Would you like to catch up for coffee?',
    isMessage: true,
    time: '12:00',
  },
  {
    id: 2,
    name: 'Alice Smith',
    message: 'The presentation went really well! Thanks for your help.',
    isMessage: true,
    time: '12:10',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    message: 'Can we schedule a meeting to discuss the new project?',
    isMessage: false,
    time: '15:00',
  },
  {
    id: 4,
    name: 'Emma Davis',
    message: 'I`ve reviewed the documents you sent. Everything looks good!',
    isMessage: true,
    time: '13:00',
  },
  {
    id: 5,
    name: 'Michael Wilson',
    message: 'Don`t forget about the team lunch tomorrow at 1 PM',
    isMessage: false,
    time: '16:00',
  },
];

export const messageData = [
  {
    _id: '1',
    text: 'Hello! How are you?',
    createdAt: new Date(),
    user: {
      _id: 'other-user-id',
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
  },
  {
    _id: '2',
    text: "I'm doing great, thanks for asking! How about you?",
    createdAt: new Date(),
    user: {
      _id: 'current-user-id',
      name: 'You',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
  },
  {
    _id: '3',
    text: "That's awesome! I'm having a good day too. What are your plans for the weekend?",
    createdAt: new Date(),
    user: {
      _id: 'other-user-id',
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
  },
  {
    _id: '4',
    text: 'I might go hiking if the weather is nice. How about you?',
    createdAt: new Date(),
    user: {
      _id: 'current-user-id',
      name: 'You',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
  },
  {
    _id: '5',
    text: 'That sounds like a great plan! I might just relax at home and catch up on some reading.',
    createdAt: new Date(),
    user: {
      _id: 'other-user-id',
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
  },
  {
    _id: '6',
    text: 'Reading is always a good choice. Any book recommendations?',
    createdAt: new Date(),
    user: {
      _id: 'other-user-id',
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
  },
  {
    _id: '7',
    text: 'I just finished a great mystery novel. I can send you the details if you want.',
    createdAt: new Date(),
    user: {
      _id: 'current-user-id',
      name: 'You',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
  },
  {
    _id: '8',
    text: 'Sure, I would love that! I always enjoy a good mystery.',
    createdAt: new Date(),
    user: {
      _id: 'other-user-id',
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
  },
  {
    _id: '9',
    text: 'Great! I will send you the title and author later today.',
    createdAt: new Date(),
    user: {
      _id: 'current-user-id',
      name: 'You',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
  },
];
