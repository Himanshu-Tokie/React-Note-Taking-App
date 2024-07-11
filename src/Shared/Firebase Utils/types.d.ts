interface Note {
    title: string;
    content: string;
    url: string[];
    time_stamp: ReturnType<typeof serverTimestamp>;
    label?: any; // Add the label property
  }