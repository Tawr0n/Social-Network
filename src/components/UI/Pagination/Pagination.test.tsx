import {create} from "react-test-renderer";
import Pagination from "./Pagination";

describe("Pagination component", () => {
    test('Pages count is 7, but should be displayed only 5', async () => {
        const component = create(<Pagination totalItemsCount={7} pageSize={1}
                                             portionSize={5} activePage={1} onPageClick={(x) => x}/>)
        const root = component.root
        const spans = await root.findAllByType('span')
        expect(spans.length).toBe(5)
    })
    test('Pages count is 10 and current page is 9, so should be displayed 2 array buttons', async () => {
        const component = create(<Pagination totalItemsCount={10} pageSize={1} activePage={9}
                                             portionSize={5} onPageClick={(x) => x}/>)
        const root = component.root
        const buttons = await root.findAllByType('button')
        expect(buttons.length).toBe(2)
    })
})
