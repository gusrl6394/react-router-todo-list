import React from 'react';
import { Router, Route, Routes, useLocation } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { ToDoListProvider } from 'Contexts';
import { Detail } from './index';
import {Add} from "../Add";

describe('<Detail />', () => {
    it('renders component correctly', () => {
        const history = createMemoryHistory();
        history.push('/detail/0');
        localStorage.setItem('ToDoList', '["ToDo 1"]');

        const { container } = render(
            <ToDoListProvider>
                <Router location={history.location} navigator={history}>
                    <Routes>
                        <Route path="/detail/:id" element={<Detail /> } />
                    </Routes>
                </Router>
            </ToDoListProvider>,
        );

        const toDoItem = screen.getByText('ToDo 1');
        expect(toDoItem).toBeInTheDocument();

        const button = screen.getByText('삭제');
        expect(button).toBeInTheDocument();

        // expect(container).toMatchSnapshot();
    });

    it('deletes ToDo data', () => {
        const history = createMemoryHistory();
        history.push('/');
        history.push('/detail/0');
        localStorage.setItem('ToDoList', '["ToDo 1"]');

        const TestComponent = () => {
            const { pathname } = useLocation();
            return <div>{pathname}</div>;
        };

        const { container } = render(
            <ToDoListProvider>
                <Router location={history.location} navigator={history}>
                    <Routes>
                        <Route path="/detail/:id" element={<Detail /> } />
                    </Routes>
                </Router>
            </ToDoListProvider>,
        );

        const url = history.location.pathname.indexOf('/detail/0');
        expect(url).toBeGreaterThanOrEqual(0);

        const toDoItem = screen.getByText('ToDo 1');
        expect(toDoItem).toBeInTheDocument();
        const button = screen.getByText('삭제');
        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        expect(history.location.pathname).toBe('/');
    });
});
