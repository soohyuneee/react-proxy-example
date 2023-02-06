import React, {useState} from "react";
import "./App.css";
import Header from "./components/Header";
import BookTable from "./components/BookTable";
import TodoTable from "./components/TodoTable";
import DisplayBoard from "./components/DisplayBoard";
import CreateBook from "./components/CreateBook";
import CreateTodo from "./components/CreateTodo";
import {getAllBooks, createBook} from "./services/BookService";
import {getAllTodos, createTodos} from "./services/TodoService";
import Footer from "./components/Footer";

function App() {
	const [bookShelf, setBookShelf] = useState({});
	const [todo, setTodo] = useState({});
	const [books, setBooks] = useState([]);
	const [todos, setTodos] = useState([]);
	const [numberOfBooks, setNumberBooks] = useState(0);
	const [numberOfTodos, setNumberTodos] = useState(0);

	const handleSubmit = () => {
		createBook(bookShelf).then(() => {
			setNumberBooks(numberOfBooks + 1);
		});
	};

	const handleTodoSubmit = () => {
		createTodos(todo).then(() => {
			setNumberTodos(numberOfTodos + 1);
		});
	};

	const getAllBook = () => {
		getAllBooks().then((data) => {
			setBooks(data);
			setNumberBooks(data.length);
		});
	};

	const getAllTodo = () => {
		getAllTodos().then((data) => {
			setTodos(data);
			setNumberTodos(data.length);
		});
	};

	const handleOnChangeForm = (e) => {
		let inputData = bookShelf;
		if (e.target.name === "book") {
			bookShelf.book = e.target.value;
		} else if (e.target.name === "category") {
			bookShelf.category = e.target.value;
		} else if (e.target.name === "author") {
			bookShelf.author = e.target.value;
		}
		setBookShelf(inputData);
	};

	const handleOnChangeTodoForm = (e) => {
		let inputData = todo;
		if (e.target.name === "todo") {
			todo.todo = e.target.value;
		} else if (e.target.name === "category") {
			todo.category = e.target.value;
		} else if (e.target.name === "check") {
			todo.check = e.target.value;
		}
		setTodo(inputData);
	};

	return (
		<div className="main-wrapper">
			<div className="main">
				<Header />
				<div className="creat-form">
					<CreateBook bookShelf={bookShelf} onChangeForm={handleOnChangeForm} handleSubmit={handleSubmit} />
					<CreateTodo todo={todo} onChangeForm={handleOnChangeTodoForm} handleSubmit={handleTodoSubmit} />
				</div>
				<DisplayBoard numberOfBooks={numberOfBooks} getAllBook={getAllBook} numberOfTodos={numberOfTodos} getAllTodo={getAllTodo} />
				<BookTable books={books} />
				<TodoTable todos={todos} />
				<Footer />
			</div>
		</div>
	);
}

export default App;
