
test('make sub title', () => {
    expect(makeSubTitle('<p>asdfdgs</p>')).toBe("asdfdgs")
});




const makeSubTitle = (content) => {
    let data = '';
    data = content.substring(content.indexOf('p>')+2, content.indexOf('</p'))

    return data;
}