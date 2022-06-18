import { checkPropTypes } from "prop-types";

export const mockDeck = {
    id:"62a48da7d4bc59a6a9e4b218",
    user:"62a3e29355b141644ea07f31",
    author:"test author",
    subject:"test subject",
    title:"test title",
    likes:6,
    published:true,
    cards:[{question:"test question",answer:"test answer"},{question:"second test question",answer:"second test answer"}],
    createdAt:{"$date":{"$numberLong":"1654951335406"}},
    updatedAt:{"$date":{"$numberLong":"1655066831282"}},"__v":{"$numberInt":"0"}
}

export const mockUser = {
    _id: '62a34c61e825cd5a558ea303',
    name: 'test user',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY…TkwfQ.s3aUPnleVwBCxVZNm74RNpV0RF_KdfJn9g5-lLpFnM8'
}

export const findByTestAtrr = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
};

export const checkProps = (component, expectedProps) => {
    const propsErr = checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
    return propsErr
}
