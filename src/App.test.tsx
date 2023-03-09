import AppContainerWrapper from './App';
import {create} from "react-test-renderer";
import ProfileStatus from "./components/Profile/ProfileInfo/ProfileStatus/ProfileStatus";
import {createRoot} from "react-dom/client";

describe("ProfileStatus component", () => {
    test("Status from props should be in the local state", () => {
        const component = create(<ProfileStatus status="Ukraine <3" updateStatus={x => x}/>);
        const instance = component.getInstance();
        // @ts-ignore
        expect(instance.state.status).toBe("Ukraine <3");
    });
    test("After rendering, <span> should be displayed", async () => {
        const component = create(<ProfileStatus status="Ukraine <3" updateStatus={x => x}/>);
        const instance = component.root;
        const span = await instance.findByType("span");
        expect(span).not.toBeNull()
    });
    test("After rendering, <input> shouldn't be displayed", () => {
        const component = create(<ProfileStatus status="Ukraine <3" updateStatus={x => x}/>);
        const instance = component.root;

        expect(() => {
            // eslint-disable-next-line testing-library/await-async-query
            instance.findByType("input")
        }).toThrowError()
    });
    test("After rendering, <span> should contain correct status", async () => {
        const component = create(<ProfileStatus status="Ukraine <3" updateStatus={x => x}/>);
        const instance = component.root;
        const span = await instance.findByType("span");
        expect(span.props.children).toBe("Ukraine <3");
    });
    test("<input> should be displayed instead of <span>", async () => {
        const component = create(<ProfileStatus status="Ukraine <3" updateStatus={x => x}/>);
        const instance = component.root;
        const span = await instance.findByType("span");
        span.props.onDoubleClick()
        const input = await instance.findByType("input");
        expect(input.props.value).toBe("Ukraine <3")
    });
    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="Ukraine <3" updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        // @ts-ignore
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1)
    })
});


test('renders without crashing', () => {
    const container = document.createElement('div')
    const root = createRoot(container);
    root.render(<AppContainerWrapper/>)
    root.unmount()
});


/*import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/
