import { render,screen } from "@testing-library/react"
import TodoItem from "./TodoItem"
import Todo from "../../Todo"
import userEvent from '@testing-library/user-event'



const todo:Todo = {id: 1,completed: false,title: "todo title",userId: 2}
const handleDelete = jest.fn()

// beforeEach(() =>{
// 	handleDelete.mockClear()
// })


describe('todo item component',() =>{
	test('render correctly',() =>{
		render(<TodoItem todo={todo} handleDelete={handleDelete}/>)		

		const listItem = screen.getByRole('listitem')
		expect(listItem).toBeInTheDocument()

		const listItemDeleteButton = screen.getByRole('button')
		expect(listItemDeleteButton).toBeInTheDocument()

	})

	test('render delete button called',async () =>{
		const user = userEvent.setup()

		render(<TodoItem todo={todo} handleDelete={handleDelete}/>)
		const listItemDeleteButton = screen.getByRole('button')

		await user.click(listItemDeleteButton)

		// The mock function was called once
		expect(handleDelete.mock.calls).toHaveLength(1)

		// The first argument of the first call to the function was 1
		expect(handleDelete.mock.calls[0][0]).toBe(1)

	})
})