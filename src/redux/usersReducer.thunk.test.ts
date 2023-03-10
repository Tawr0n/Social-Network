import {actions, follow, unfollow} from "./usersReducer";
import {followAPI} from "../api/followAPI";
import {APIResponseType, ResultCodesEnum} from "../api/api";

jest.mock("../api/followAPI")
const followAPIMock = followAPI as jest.Mocked<typeof followAPI>
const result: APIResponseType = {
    data: {},
    resultCode: ResultCodesEnum.Success,
    messages: ['success']
};

const dispatchMock = jest.fn()
const getStateMock = jest.fn()
afterEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
})


test('follow thunk should complete successfully', async () => {
    followAPIMock.follow.mockReturnValue(Promise.resolve(result))
    const thunk = follow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.followingInProgressToggle(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followToggle(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.followingInProgressToggle(false, 1))

})
test('unfollow thunk should complete successfully', async () => {
    followAPIMock.unfollow.mockReturnValue(Promise.resolve(result))
    const thunk = unfollow(2)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.followingInProgressToggle(true, 2))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followToggle(2))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.followingInProgressToggle(false, 2))

})
