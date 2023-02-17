import profileReducer, {addPost, deletePost} from "./profileReducer";


test('length of posts should be increased by one', () => {
    // 1. test data
    let action = addPost('Ukraine')
    let state = {
        posts: [
            {id: 1, message: 'Слизерин', likesCount: 41},
            {id: 2, message: 'Рейвенклов', likesCount: 59},
        ]
    }
    // 2.action
    let newState = profileReducer(state, action)

    // 3.expectation
    expect(newState.posts.length).toBe(3);
});
test('message of a new post should be correct', () => {
    // 1. test data
    let action = addPost('Ukraine')
    let state = {
        posts: [
            {id: 1, message: 'Слизерин', likesCount: 41},
            {id: 2, message: 'Рейвенклов', likesCount: 59},
        ]
    }
    // 2.action
    let newState = profileReducer(state, action)

    // 3.expectation
    expect(newState.posts[2].message).toBe('Ukraine');
});
test('length of posts should be reduced by one', () => {
    // 1. test data
    let action = deletePost(1)
    let state = {
        posts: [
            {id: 1, message: 'Слизерин', likesCount: 41},
            {id: 2, message: 'Рейвенклов', likesCount: 59},
        ]
    }
    // 2.action
    let newState = profileReducer(state, action)

    // 3.expectation
    expect(newState.posts.length).toBe(state.posts.length - 1);
});
