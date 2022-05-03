import React from 'react';

// setTextboxes is an empty function by default
const TextContext = React.createContext({
    textboxes: [],
    setContexts: () => {},
});

export default TextContext;