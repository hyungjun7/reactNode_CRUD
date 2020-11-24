//게시판 분기 처리, SQL을 한 번 더 사용할까 생각도 했지만 함수로 구현하는 것이 적합할듯 하다
const gu = (category) => {
    let category_number = 0;
    switch(category) {
        case "nodejs": category_number = 1; break;
        case "java": category_number = 2; break;
        case "react": category_number = 3; break;
        case "spring": category_number = 6; break;
        case "js": category_number = 7; break;
        case "ts": category_number = 8; break;
        case "jsp": category_number = 9; break;
        case "gunpla": category_number = 10; break;
        case "photo": category_number = 11; break;
        case "trip": category_number = 12; break;
        case "etc": category_number = 13; break;
        case "database": category_number = 14; break;
    }
    return category_number;
}

module.exports = gu;