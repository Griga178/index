// t2.js

// Пример 1 с  useState
const { useState } = React;

function ExampleUseState() {
  const [count, setCount] = useState(0);

  return React.createElement(
    'div',
    null,
    React.createElement('h1', null, 'Счётчик с useState'),
    React.createElement('p', null, `Значение: ${count}`),
    React.createElement(
      'button',
      { onClick: () => setCount(count + 1) },
      'Увеличить'
    )
  );
};

ReactDOM.createRoot(document.getElementById('useStateBlock')).render(
  React.createElement(ExampleUseState)
);

// Пример 2 с  useReducer
const { useReducer } = React;

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return React.createElement(
    'div',
    null,
    React.createElement('h1', null, 'Счётчик с useReducer'),
    React.createElement('p', null, `Текущее значение: ${state.count}`),
    React.createElement(
      'button',
      { onClick: () => dispatch({ type: 'increment' }) },
      '+'
    ),
    React.createElement(
      'button',
      { onClick: () => dispatch({ type: 'decrement' }) },
      '-'
    ),
    React.createElement(
      'button',
      { onClick: () => dispatch({ type: 'reset' }) },
      'Сброс'
    )
  );
}

const useReducerBlock = ReactDOM.createRoot(document.getElementById('useReducerBlock'));
useReducerBlock.render(React.createElement(Counter));

// Пример 3 с  useEffect
const { useEffect, createElement } = React;

function Timer() {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    console.log("Компонент смонтирован");
    if (!running) return;

    const intervalId = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      console.log("Компонент размонтирован");
    }
  }, [running]);

  function formatTime(totalSeconds) {
    if (typeof totalSeconds !== 'number' || totalSeconds < 0) {
      return '00:00';
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num) => num.toString().padStart(2, '0');

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    } else {
      return `${pad(minutes)}:${pad(seconds)}`;
    }
  }

  const toggleRunning = () => setRunning(r => !r);
  const reset = () => setCount(0);

  return createElement('div', null,
    createElement('div', {}, formatTime(count)),
    createElement('button', { onClick: toggleRunning}, running ? 'Пауза' : 'Пуск'),
    createElement('button', { onClick: reset }, 'Сброс'),
  );
}
// Монтируем React в элемент с id="useEffectBlock"
const useEffectBlock = ReactDOM.createRoot(document.getElementById('useEffectBlock'));
useEffectBlock.render(React.createElement(Timer));

// Пример 4 с  useEffect
const { useRef } = React;

function MyComponent() {
  const inputRef = useRef(null);

  function focusInput() {
    if (inputRef.current) {
      inputRef.current.focus(); // ставим фокус на input
    }
  }

  return React.createElement(
    'div',
    null,
    React.createElement('input', { type: 'text', ref: inputRef }),
    React.createElement(
      'button',
      { onClick: focusInput },
      'Фокус на input'
    )
  );
}

const useRefBlock = ReactDOM.createRoot(document.getElementById('useRefBlock'));
useRefBlock.render(React.createElement(MyComponent));

// Пример 5 с useContext

const { createContext, useContext } = React;
const useContextBlock = ReactDOM.createRoot(document.getElementById('useContextBlock'));

// Создаем Context с дефолтным значением
const ThemeContext = createContext('light');

function ThemedButton() {
  // Получаем значение из контекста
  const theme = useContext(ThemeContext);

  return createElement(
    'button',
    {
      style: {
        background: theme === 'dark' ? '#333' : '#ccc',
        color: theme === 'dark' ? '#fff' : '#000',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer'
      }
    },
    `Тема: ${theme}`
  );
}

function Toolbar() {
  return createElement('div', null, createElement(ThemedButton));
}

function App() {
  const [theme, setTheme] = useState('light');

  return createElement(
    ThemeContext.Provider,
    { value: theme },
    createElement(
      'div',
      null,
      createElement(
        'button',
        {
          onClick: () => setTheme(theme === 'light' ? 'dark' : 'light'),
          style: { marginBottom: 20 }
        },
        'Переключить тему'
      ),
      createElement(Toolbar)
    )
  );
}

useContextBlock.render(createElement(App));
