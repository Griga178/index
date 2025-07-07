const e = React.createElement;
const { useState, useEffect } = React;

function formatDate(date) {
  return new Date(date).toLocaleString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function Note({ id, title, text, createdAt, updatedAt, onChange, onDelete }) {

  return e(
    'li',
    { className: 'note' },
    // Заголовок — input
    e('input', {
      type: 'text',
      className: 'note-title',
      value: title,
      placeholder: 'Заголовок заметки',
      onChange: e => onChange(id, { title: e.target.value }),
    }),
    // Текст — textarea
    e('textarea', {
      value: text,
      placeholder: 'Введите текст заметки...',
      onChange: e => onChange(id, { text: e.target.value }),
    }),
    // Блок с датами
    e(
      'div',
      { className: 'note-dates' },
      e('small', null, `Создано: ${formatDate(createdAt)}`),
      e('br'),
      e('small', null, `Обновлено: ${formatDate(updatedAt)}`)
    ),
    // Кнопка удаления
    e(
      'button',
      {
        onClick: () => onDelete(id),
        title: 'Удалить заметку',
      },
      '×'
    )
  );
}

function NotesApp() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  function addNote() {
    // Проверяем, есть ли заметка с пустым заголовком и текстом
    const hasEmptyNote = notes.some(note => note.title.trim() === '' && note.text.trim() === '');
    if (hasEmptyNote) {
      alert('Пожалуйста, заполните предыдущую заметку перед добавлением новой');
      return;
    }

    const now = Date.now();
    setNotes(prev => [
      ...prev,
      {
        id: now,
        title: '',
        text: '',
        createdAt: now,
        updatedAt: now,
      }
    ]);
  }

  function updateNote(id, updatedFields) {
    setNotes(prev =>
      prev.map(note =>
        note.id === id
          ? {
              ...note,
              ...updatedFields,
              updatedAt: Date.now(),
            }
          : note
      )
    );
  }

  function deleteNote(id) {
    setNotes(prev => prev.filter(note => note.id !== id));
  }

  return e(
    'div',
    { className: 'container' },
    e('h1', null, 'Редактируемые заметки'),
    e(
      'button',
      { className: 'add-note-btn', onClick: addNote },
      'Добавить заметку'
    ),
    e(
      'ul',
      { className: 'notes-list' },
      notes.map(note =>
        e(Note, {
          key: note.id,
          id: note.id,
          title: note.title,
          text: note.text,
          createdAt: note.createdAt,
          updatedAt: note.updatedAt,
          onChange: updateNote,
          onDelete: deleteNote,
        })
      )
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e(NotesApp));
