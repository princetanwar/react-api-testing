import TodoList from "./TodoList";
import userEvent from "@testing-library/user-event";
import { act, prettyDOM, render, screen } from "@testing-library/react";

import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/todos", (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: "first",
          completed: false,
        },
        {
          userId: 1,
          id: 2,
          title: "second",
          completed: false,
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("todo list component", () => {
  test("list render correctly", async () => {
    render(<TodoList />);

    const searchElement = screen.getByRole("textbox");
    expect(searchElement).toBeInTheDocument();

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    //   await waitFor(() => {
    //     const listItems = screen.getAllByRole("listitem");

    //     expect(listItems).toHaveLength(2);
    //   });

    //     findBy work async
    const listItems = await screen.findAllByRole("listitem");

    expect(listItems).toHaveLength(2);
  });

  test("search working correctly", async () => {
    userEvent.setup();
    render(<TodoList />);

    const searchElement = screen.getByRole("textbox");
    expect(searchElement).toHaveTextContent("");

    const listItems = await screen.findAllByRole("listitem");
    expect(listItems).toHaveLength(2);

    await act(async () => {
      await userEvent.type(searchElement, "first");
    });

    expect(screen.getByRole("textbox")).toHaveValue("first");

    const listItemsAfterFilter = await screen.findAllByRole("listitem");

    expect(listItemsAfterFilter).toHaveLength(1);
  });
});
