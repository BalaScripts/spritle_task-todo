# To-Do List with Holy Grail Layout

## Description

This is a **React-based To-Do List** application that follows the **Holy Grail Layout** structure. Users can efficiently manage tasks with features such as adding, completing, deleting, and reordering tasks. The app ensures an intuitive experience with drag-and-drop functionality, persistent deleted items, and a responsive design.

## Features

### 🏗 Layout (Holy Grail)
- **Header** at the top.
- **Main Content** area containing the To-Do List (scrollable when tasks overflow).
- **Fixed Sidebars**:
  - **Left Sidebar**: Reserved for future enhancements.
  - **Right Sidebar**: Displays "Deleted Items" when tasks are removed.
- **Footer**: Hidden until the user scrolls to the bottom of the page.

### ✅ To-Do List Functionalities
- **Add Tasks**: Create new to-do items.
- **Complete Tasks**:
  - Checked tasks move to the bottom.
  - Strikethrough styling applied.
- **Delete Tasks**:
  - Moves to the "Deleted Items" section in the right sidebar.
  - Muted (greyed-out) appearance.
- **Reordering**:
  - **Drag & Drop** (`@hello-pangea/dnd`).

### 🎨 UI Enhancements
- **Material UI & FontAwesome** icons.
- **Bootstrap & Tailwind CSS** for styling.

## Technologies Used

- **React**
- **Vite**
- **Material UI**
- **Bootstrap**
- **Tailwind CSS**
- **FontAwesome**
- **Framer Motion**
- **Drag & Drop (@hello-pangea/dnd)**
- **React Hot Toast**

---

## Getting Started

To run this project locally, follow these steps:

### 📥 Clone the Repository
```sh
git clone https://github.com/kenkarate/spritle_task-todo.git
cd spritle_task-todo
```

### 📌 Install Dependencies
```sh
npm install
```

### 🏃 Run the Development Server
```sh
npm run dev
```
Then open **`http://localhost:5173`** in your browser.

### 🏗 Build for Production
```sh
npm run build
```

### 🚀 Deploy to GitHub Pages
```sh
npm run deploy
```

---

## Usage

- **Create a Task**: Enter task details and click "Add Task."
- **Mark as Completed**: Click the checkbox to move tasks to the bottom.
- **Delete a Task**: Click the delete button to move it to "Deleted Items."
- **Reorder Tasks**: Use **Drag & Drop** or **Up/Down buttons**.

---

## Live Demo

🔗 [View the live project]([https://kenkarate.github.io/spritle_task-todo](https://balascripts.github.io/spritle_task-todo/))

---

## Folder Structure

```
src/
├── assets/         // Images & icons
├── components/     // Reusable UI components
├── styles/         // Custom styles
└── pages/          // Main application pages
```

---

## Future Enhancements

- **Persistent Storage via LocalStorage**.

---

## License

This project is licensed under the **MIT License**.

---

## Contributions

Contributions are welcome!  
Please **fork** the repository and submit a **pull request** with improvements.

---

## Contact

For any queries or suggestions, please reach out via GitHub Issues.  
Happy coding! 🚀

